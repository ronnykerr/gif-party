export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');

  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Missing query' });

  const KLIPY_KEY = 'y68fOwjhbOtVf2v2QCGpAXRFlmYrQa5FiYNfwwT4BBUXtxr7yYJ7JHERt6IhFeBa';

  try {
    const response = await fetch(
      `https://api.klipy.com/api/v1/${KLIPY_KEY}/gifs/search?q=${encodeURIComponent(q)}&limit=20`
    );
    const data = await response.json();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: 'Search failed', detail: e.message });
  }
}
