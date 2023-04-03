export const getFirstWordFromString = (str: string) => {
  const word = str.trim();
  if (!word.length) return '';
  const codePoint = word.codePointAt(0);
  if (!codePoint) return '';
  return String.fromCodePoint(codePoint).toUpperCase();
}

export const getMessageFromOpenAI = async (apiKey: string, content: string, resCount: number) => {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey || ''}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      n: resCount || 1,
      messages: [{ role: 'user', content }],
    }),
  });
  return res;
}