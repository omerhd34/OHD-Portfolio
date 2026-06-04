import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
 sanitizeFilename,
 validateFiles,
} from "../../../lib/contactAttachments.js";

const SITE_URL = "omerhalisdemir.com.tr";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMAIL_WIDTH = 600;

/** E-posta istemcilerinde uzun metin taşmasını önler */
const WRAP_STYLE =
 "word-wrap:break-word;word-break:break-word;overflow-wrap:break-word;max-width:100%;";

function breakLongWords(text, chunkSize = 32) {
 return String(text).replace(/\S{33,}/g, (chunk) => {
  const parts = [];
  for (let i = 0; i < chunk.length; i += chunkSize) {
   parts.push(chunk.slice(i, i + chunkSize));
  }
  return parts.join("\u200b");
 });
}

function escapeHtml(value) {
 if (value == null || value === "") return "";
 return String(value)
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#039;");
}

function sanitizeHeaderValue(value, maxLength = 80) {
 return String(value ?? "")
  .replace(/[\r\n]/g, " ")
  .trim()
  .slice(0, maxLength);
}

function formatMessageHtml(message, fallback = "Belirtilmemiş") {
 const text = breakLongWords((message ?? "").trim() || fallback);
 return escapeHtml(text).replace(/\n/g, "<br>");
}

function messageBlockHtml(messageHtml) {
 return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="table-layout:fixed;width:100%;">
  <tr>
   <td bgcolor="#f9fafb" style="background-color:#f9fafb;padding:20px;border-radius:10px;border-left:4px solid #66bb6a;font-size:15px;color:#374151;line-height:1.7;${WRAP_STYLE}">${messageHtml}</td>
  </tr>
 </table>`;
}

function emailHead(title) {
 return `<!DOCTYPE html>
<html lang="tr" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light">
  <title>${escapeHtml(title)}</title>
  <style type="text/css">
    body, table, td { ${WRAP_STYLE} }
    .email-root { width: 100% !important; max-width: ${EMAIL_WIDTH}px !important; }
    .email-body-cell { background-color: #ffffff !important; color: #374151 !important; }
    @media (prefers-color-scheme: dark) {
      .email-body-cell, .email-card { background-color: #ffffff !important; color: #374151 !important; }
      .email-summary { background-color: #f1f8f4 !important; }
      .email-message { background-color: #f9fafb !important; color: #374151 !important; }
    }
  </style>
</head>`;
}

function valueCell(content, extraStyle = "") {
 return `<td style="padding:8px 0;${WRAP_STYLE}${extraStyle}">${content}</td>`;
}

function attachmentsSectionHtml(attachmentNames = []) {
 if (!attachmentNames.length) return "";
 const items = attachmentNames
  .map(
   (name) =>
    `<li style="margin:4px 0;font-size:14px;color:#1b5e20;${WRAP_STYLE}">${escapeHtml(name)}</li>`
  )
  .join("");
 return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:16px;table-layout:fixed;width:100%;">
  <tr>
   <td bgcolor="#f1f8f4" style="padding:14px 18px;background-color:#f1f8f4;border-radius:10px;border:1px solid #c8e6c9;${WRAP_STYLE}">
    <p style="margin:0 0 8px;font-size:11px;font-weight:700;text-transform:uppercase;color:#2e7d32;">Ek Dosyalar (${attachmentNames.length})</p>
    <ul style="margin:0;padding-left:18px;">${items}</ul>
    <p style="margin:10px 0 0;font-size:12px;color:#6b7280;">Dosyalar bu e-postaya eklenmiştir.</p>
   </td>
  </tr>
 </table>`;
}

async function parseUploadedFiles(formData) {
 const entries = formData.getAll("attachments");
 return entries.filter((entry) => entry instanceof File && entry.size > 0);
}

async function toMailAttachments(files) {
 const attachments = [];
 for (const file of files) {
  const buffer = Buffer.from(await file.arrayBuffer());
  attachments.push({
   filename: sanitizeFilename(file.name),
   content: buffer,
   contentType: file.type || undefined,
  });
 }
 return attachments;
}

function attachmentsPlainText(attachmentNames = []) {
 if (!attachmentNames.length) return "";
 return `\nEK DOSYALAR\n──────────\n${attachmentNames.map((n) => `• ${n}`).join("\n")}\n(Dosyalar e-postaya eklenmiştir.)\n`;
}

function formatTimestamp() {
 return new Date().toLocaleString("tr-TR", {
  dateStyle: "full",
  timeStyle: "short",
  timeZone: "Europe/Istanbul",
 });
}

function buildQuoteEmailHtml({
 name,
 email,
 phone,
 serviceLabel,
 packageLabel,
 tierLabel,
 message,
 attachmentNames = [],
}) {
 const safeName = escapeHtml(breakLongWords(name));
 const safeEmail = escapeHtml(breakLongWords(email));
 const safePhone = escapeHtml(breakLongWords(phone));
 const safeService = escapeHtml(breakLongWords(serviceLabel));
 const safePackage = escapeHtml(breakLongWords(packageLabel));
 const safeTier = escapeHtml(tierLabel);
 const messageHtml = formatMessageHtml(message);

 return `${emailHead("Yeni Teklif Talebi")}
<body style="margin:0;padding:0;background-color:#e8f5e9;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;${WRAP_STYLE}">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" bgcolor="#e8f5e9" style="background-color:#e8f5e9;padding:24px 12px;${WRAP_STYLE}">
    <tr>
      <td align="center" style="${WRAP_STYLE}">
        <table role="presentation" class="email-root" width="${EMAIL_WIDTH}" cellspacing="0" cellpadding="0" bgcolor="#ffffff" style="width:${EMAIL_WIDTH}px;max-width:${EMAIL_WIDTH}px;table-layout:fixed;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 24px rgba(27,94,32,0.12);">
          <tr>
            <td style="background:linear-gradient(135deg,#1b5e20 0%,#388e3c 50%,#66bb6a 100%);padding:36px 32px;text-align:center;">
              <p style="margin:0 0 8px;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:rgba(232,245,233,0.85);">Portföy · İletişim</p>
              <h1 style="margin:0;font-size:26px;font-weight:700;color:#e8f5e9;line-height:1.3;">Yeni Teklif Talebi</h1>
              <p style="margin:12px 0 0;font-size:14px;color:rgba(232,245,233,0.9);">24 saat içinde yanıt planlanmalı</p>
            </td>
          </tr>
          <tr>
            <td class="email-body-cell" bgcolor="#ffffff" style="padding:28px 24px;background-color:#ffffff;${WRAP_STYLE}">
              <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.6;${WRAP_STYLE}">Aşağıda seçilen hizmet ve paket detayları ile birlikte iletişim bilgileri yer almaktadır.</p>
              <table role="presentation" class="email-summary" width="100%" cellspacing="0" cellpadding="0" bgcolor="#f1f8f4" style="margin-bottom:24px;table-layout:fixed;width:100%;background-color:#f1f8f4;border-radius:12px;border:1px solid #c8e6c9;">
                <tr>
                  <td style="padding:18px;${WRAP_STYLE}">
                    <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#2e7d32;">Teklif Özeti</p>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="table-layout:fixed;width:100%;">
                      <tr>
                        ${valueCell(`<span style="font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;">Hizmet</span><br><span style="font-size:15px;font-weight:600;color:#1b5e20;${WRAP_STYLE}">${safeService}</span>`, "border-bottom:1px solid #e0e0e0;")}
                      </tr>
                      <tr>
                        ${valueCell(`<span style="font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;">Paket Türü</span><br><span style="font-size:15px;font-weight:600;color:#1b5e20;${WRAP_STYLE}">${safePackage}</span>`, "border-bottom:1px solid #e0e0e0;")}
                      </tr>
                      <tr>
                        ${valueCell(`<span style="font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;">Paket Seviyesi</span><br><span style="display:inline-block;margin-top:4px;padding:4px 12px;font-size:13px;font-weight:700;color:#e8f5e9;background-color:#2e7d32;border-radius:20px;">${safeTier}</span>`)}
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:20px;table-layout:fixed;width:100%;">
                <tr>
                  ${valueCell(`<span style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;">İsim & Soyisim</span><br><span style="font-size:16px;color:#111827;font-weight:500;${WRAP_STYLE}">${safeName}</span>`, "padding:12px 0;border-bottom:1px solid #f0f0f0;")}
                </tr>
                <tr>
                  ${valueCell(`<span style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;">E-posta</span><br><a href="mailto:${safeEmail}" style="font-size:16px;color:#2e7d32;text-decoration:none;font-weight:600;${WRAP_STYLE}">${safeEmail}</a>`, "padding:12px 0;border-bottom:1px solid #f0f0f0;")}
                </tr>
                ${phone
   ? `<tr>${valueCell(`<span style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;">Telefon</span><br><span style="font-size:16px;color:#111827;${WRAP_STYLE}">${safePhone}</span>`, "padding:12px 0;border-bottom:1px solid #f0f0f0;")}</tr>`
   : ""
  }
              </table>
              <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Ek İstekler</p>
              ${messageBlockHtml(messageHtml)}
              ${attachmentsSectionHtml(attachmentNames)}
            </td>
          </tr>
          <tr>
            <td bgcolor="#f1f8f4" style="padding:20px 24px;background-color:#f1f8f4;border-top:1px solid #c8e6c9;text-align:center;${WRAP_STYLE}">
              <p style="margin:0 0 8px;font-size:13px;color:#6b7280;${WRAP_STYLE}">Bu talep <strong style="color:#2e7d32;">${SITE_URL}</strong> teklif formundan gönderildi.</p>
              <p style="margin:0;font-size:12px;color:#9ca3af;${WRAP_STYLE}">${formatTimestamp()} · Yanıtlamak için bu e-postaya doğrudan cevap verebilirsiniz.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildGeneralEmailHtml({
 name,
 email,
 phone,
 subject,
 message,
 attachmentNames = [],
}) {
 const safeName = escapeHtml(breakLongWords(name));
 const safeEmail = escapeHtml(breakLongWords(email));
 const safePhone = escapeHtml(breakLongWords(phone));
 const safeSubject = escapeHtml(breakLongWords(subject));
 const messageHtml = formatMessageHtml(message, "");

 return `${emailHead("Yeni İletişim Mesajı")}
<body style="margin:0;padding:0;background-color:#e8f5e9;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;${WRAP_STYLE}">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" bgcolor="#e8f5e9" style="background-color:#e8f5e9;padding:24px 12px;${WRAP_STYLE}">
    <tr>
      <td align="center" style="${WRAP_STYLE}">
        <table role="presentation" class="email-root" width="${EMAIL_WIDTH}" cellspacing="0" cellpadding="0" bgcolor="#ffffff" style="width:${EMAIL_WIDTH}px;max-width:${EMAIL_WIDTH}px;table-layout:fixed;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 24px rgba(27,94,32,0.12);">
          <tr>
            <td style="background:linear-gradient(135deg,#1b5e20 0%,#388e3c 50%,#66bb6a 100%);padding:36px 32px;text-align:center;">
              <p style="margin:0 0 8px;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:rgba(232,245,233,0.85);">Portföy · İletişim</p>
              <h1 style="margin:0;font-size:26px;font-weight:700;color:#e8f5e9;line-height:1.3;">Yeni İletişim Mesajı</h1>
            </td>
          </tr>
          <tr>
            <td class="email-body-cell" bgcolor="#ffffff" style="padding:28px 24px;background-color:#ffffff;${WRAP_STYLE}">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:20px;table-layout:fixed;width:100%;">
                <tr>
                  ${valueCell(`<span style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;">İsim & Soyisim</span><br><span style="font-size:16px;color:#111827;font-weight:500;${WRAP_STYLE}">${safeName}</span>`, "padding:12px 0;border-bottom:1px solid #f0f0f0;")}
                </tr>
                <tr>
                  ${valueCell(`<span style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;">E-posta</span><br><a href="mailto:${safeEmail}" style="font-size:16px;color:#2e7d32;text-decoration:none;font-weight:600;${WRAP_STYLE}">${safeEmail}</a>`, "padding:12px 0;border-bottom:1px solid #f0f0f0;")}
                </tr>
                ${phone
   ? `<tr>${valueCell(`<span style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;">Telefon</span><br><span style="font-size:16px;color:#111827;${WRAP_STYLE}">${safePhone}</span>`, "padding:12px 0;border-bottom:1px solid #f0f0f0;")}</tr>`
   : ""
  }
                <tr>
                  ${valueCell(`<span style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;">Konu</span><br><span style="font-size:16px;font-weight:600;color:#1b5e20;${WRAP_STYLE}">${safeSubject}</span>`, "padding:12px 0;border-bottom:1px solid #f0f0f0;")}
                </tr>
              </table>
              <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Mesaj</p>
              ${messageBlockHtml(messageHtml)}
              ${attachmentsSectionHtml(attachmentNames)}
            </td>
          </tr>
          <tr>
            <td bgcolor="#f1f8f4" style="padding:20px 24px;background-color:#f1f8f4;border-top:1px solid #c8e6c9;text-align:center;${WRAP_STYLE}">
              <p style="margin:0 0 8px;font-size:13px;color:#6b7280;${WRAP_STYLE}">Bu mesaj <strong style="color:#2e7d32;">${SITE_URL}</strong> iletişim formundan gönderildi.</p>
              <p style="margin:0;font-size:12px;color:#9ca3af;${WRAP_STYLE}">${formatTimestamp()}</p>
              <p>· Yanıtlamak için bu e-postaya doğrudan cevap verebilirsiniz.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildQuotePlainText({
 name,
 email,
 phone,
 serviceLabel,
 packageLabel,
 tierLabel,
 message,
 attachmentNames = [],
}) {
 return `YENİ TEKLİF TALEBİ
${"=".repeat(40)}

TEKLİF ÖZETİ
────────────
Hizmet         : ${serviceLabel}
Paket Türü     : ${packageLabel}
Paket Seviyesi : ${tierLabel}

İLETİŞİM
────────
İsim & Soyisim : ${name}
E-posta        : ${email}
Telefon        : ${phone || "Belirtilmemiş"}

EK İSTEKLER
───────────
${(message || "").trim() || "Belirtilmemiş"}
${attachmentsPlainText(attachmentNames)}
────────────────────────────────────────
Gönderim: ${SITE_URL} · ${formatTimestamp()}
`;
}

function buildGeneralPlainText({
 name,
 email,
 phone,
 subject,
 message,
 attachmentNames = [],
}) {
 return `YENİ İLETİŞİM MESAJI
${"=".repeat(40)}

İsim & Soyisim : ${name}
E-posta        : ${email}
Telefon        : ${phone || "Belirtilmemiş"}
Konu           : ${subject}

MESAJ
─────
${(message || "").trim()}
${attachmentsPlainText(attachmentNames)}
────────────────────────────────────────
Gönderim: ${SITE_URL} · ${formatTimestamp()}
`;
}

function formField(formData, key) {
 const value = formData.get(key);
 return typeof value === "string" ? value.trim() : "";
}

export async function POST(request) {
 try {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data")) {
   return NextResponse.json(
    { success: false, error: "Geçersiz istek formatı." },
    { status: 400 }
   );
  }

  const formData = await request.formData();
  const trimmedName = formField(formData, "name");
  const trimmedEmail = formField(formData, "email");
  const trimmedSubject = formField(formData, "subject");
  const trimmedPhone = formField(formData, "phone");
  const trimmedMessage = formField(formData, "message");
  const subjectType = formField(formData, "subjectType");
  const serviceLabel = formField(formData, "serviceLabel");
  const packageLabel = formField(formData, "packageLabel");
  const tierLabel = formField(formData, "tierLabel");

  const uploadedFiles = await parseUploadedFiles(formData);
  const fileValidation = validateFiles(uploadedFiles);
  if (!fileValidation.ok) {
   return NextResponse.json(
    { success: false, error: fileValidation.error },
    { status: 400 }
   );
  }
  const validFiles = fileValidation.files;
  const attachmentNames = validFiles.map((f) => sanitizeFilename(f.name));

  if (!trimmedName || !trimmedEmail || !trimmedSubject) {
   return NextResponse.json(
    { success: false, error: "Ad, e-posta ve konu zorunludur." },
    { status: 400 }
   );
  }

  if (!EMAIL_REGEX.test(trimmedEmail)) {
   return NextResponse.json(
    { success: false, error: "Geçerli bir e-posta adresi girin." },
    { status: 400 }
   );
  }

  const isQuote =
   subjectType === "quote" ||
   (subjectType !== "other" && serviceLabel && packageLabel && tierLabel);

  if (isQuote && (!serviceLabel || !packageLabel || !tierLabel)) {
   return NextResponse.json(
    { success: false, error: "Teklif detayları eksik." },
    { status: 400 }
   );
  }

  if (!isQuote && !trimmedMessage) {
   return NextResponse.json(
    { success: false, error: "Mesaj alanı zorunludur." },
    { status: 400 }
   );
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_TO) {
   return NextResponse.json(
    { success: false, error: "E-posta yapılandırması eksik." },
    { status: 500 }
   );
  }

  const emailSubject = isQuote
   ? `Teklif: ${sanitizeHeaderValue(trimmedSubject, 120)}`
   : `İletişim: ${sanitizeHeaderValue(trimmedSubject, 120)}`;

  const transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
   port: 587,
   secure: false,
   auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
   },
   tls: {
    rejectUnauthorized: false,
   },
  });

  const contactData = {
   name: trimmedName,
   email: trimmedEmail,
   phone: trimmedPhone,
   subject: trimmedSubject,
   message: trimmedMessage,
   serviceLabel,
   packageLabel,
   tierLabel,
   attachmentNames,
  };

  const mailAttachments = await toMailAttachments(validFiles);

  const mailOptions = {
   from: {
    name: sanitizeHeaderValue(`Portföy · ${trimmedName}`, 60),
    address: process.env.EMAIL_USER,
   },
   to: process.env.EMAIL_TO,
   replyTo: trimmedEmail,
   subject: emailSubject,
   html: isQuote
    ? buildQuoteEmailHtml(contactData)
    : buildGeneralEmailHtml(contactData),
   text: isQuote
    ? buildQuotePlainText(contactData)
    : buildGeneralPlainText(contactData),
   attachments: mailAttachments,
  };

  const info = await transporter.sendMail(mailOptions);

  return NextResponse.json(
   {
    success: true,
    message: "E-posta başarıyla gönderildi.",
    messageId: info.messageId,
   },
   { status: 200 }
  );
 } catch (error) {
  console.error("[contact]", error);
  return NextResponse.json(
   {
    success: false,
    message: "E-posta gönderilirken bir hata oluştu.",
    error: error instanceof Error ? error.message : "Bilinmeyen hata",
   },
   { status: 500 }
  );
 }
}
