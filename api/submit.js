export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { url, sender } = req.body;
  if (!url) return res.status(400).json({ error: 'Missing url' });

  const payload = JSON.stringify({ url, sender: sender || null, timestamp: Date.now() });

  try {
    await fetch(`${process.env.KV_REST_API_URL}/set/current-gif/${encodeURIComponent(payload)}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` }
    });
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: 'Storage error' });
  }
}
