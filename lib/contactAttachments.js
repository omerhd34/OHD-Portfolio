export const MAX_ATTACHMENTS = 5;
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
export const MAX_TOTAL_SIZE_BYTES = 15 * 1024 * 1024;

export const ALLOWED_MIME_TYPES = new Set([
 "application/pdf",
 "application/msword",
 "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
 "image/jpeg",
 "image/png",
 "image/gif",
 "image/webp",
]);

export const ALLOWED_EXTENSIONS = new Set([
 ".pdf",
 ".doc",
 ".docx",
 ".jpg",
 ".jpeg",
 ".png",
 ".gif",
 ".webp",
]);

export function formatFileSize(bytes) {
 if (bytes < 1024) return `${bytes} B`;
 if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
 return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function isAllowedFile(file) {
 const name = file.name?.toLowerCase() ?? "";
 const ext = name.includes(".") ? name.slice(name.lastIndexOf(".")) : "";
 const mimeOk = file.type && ALLOWED_MIME_TYPES.has(file.type);
 const extOk = ext && ALLOWED_EXTENSIONS.has(ext);
 return mimeOk || extOk;
}

export function validateFiles(files, lang = "TR") {
 if (!files.length) return { ok: true, files: [] };

 if (files.length > MAX_ATTACHMENTS) {
  return {
   ok: false,
   error:
    lang === "EN"
     ? `You can attach up to ${MAX_ATTACHMENTS} files.`
     : `En fazla ${MAX_ATTACHMENTS} dosya ekleyebilirsiniz.`,
  };
 }

 let totalSize = 0;
 for (const file of files) {
  if (!isAllowedFile(file)) {
   return {
    ok: false,
    error:
     lang === "EN"
      ? "Only PDF, Word (.doc, .docx), and image files are allowed."
      : "Yalnızca PDF, Word (.doc, .docx) ve resim dosyaları yüklenebilir.",
   };
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
   return {
    ok: false,
    error:
     lang === "EN"
      ? `Each file must be at most ${formatFileSize(MAX_FILE_SIZE_BYTES)}.`
      : `Her dosya en fazla ${formatFileSize(MAX_FILE_SIZE_BYTES)} olabilir.`,
   };
  }
  totalSize += file.size;
 }

 if (totalSize > MAX_TOTAL_SIZE_BYTES) {
  return {
   ok: false,
   error:
    lang === "EN"
     ? `Total attachment size must not exceed ${formatFileSize(MAX_TOTAL_SIZE_BYTES)}.`
     : `Toplam dosya boyutu ${formatFileSize(MAX_TOTAL_SIZE_BYTES)} geçemez.`,
  };
 }

 return { ok: true, files };
}

export function sanitizeFilename(name) {
 return String(name ?? "dosya")
  .replace(/[^\w.\-ğüşıöçĞÜŞİÖÇ\s]/gi, "_")
  .replace(/\s+/g, "_")
  .slice(0, 120);
}
