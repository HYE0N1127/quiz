export const decodeHtml = (encoded: string): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(encoded, "text/html");
  return doc.documentElement.textContent;
};
