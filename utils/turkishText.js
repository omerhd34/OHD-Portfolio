export function turkishUppercase(text) {
 return text.toLocaleUpperCase("tr-TR");
}

export function localeUppercase(text, language = "TR") {
 return language === "TR" ? turkishUppercase(text) : text.toUpperCase();
}
