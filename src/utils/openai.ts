export const generateWebsite = async (prompt: string): Promise<string> => {
  const res = await fetch('http://localhost:5000/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) throw new Error('Generation failed');
  const data = await res.json();
  return data.html;
};
