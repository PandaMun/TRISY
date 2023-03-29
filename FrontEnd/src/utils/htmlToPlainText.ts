export const htmlToPlainText = (content: string) => {
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(content, 'text/html');
  const result = htmlDoc.body.textContent;
  return result;
};
