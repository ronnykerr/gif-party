export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');

  try {
    const response = await fetch(`${process.env.KV_REST_API_URL}/get/current-gif`, {
      headers: { Authorization: `Bearer ${process.env.KV_REST_API_READ_ONLY_TOKEN}` }
    });
    const data = await response.json();
    if (!data.result) return res.status(200).json(null);
    return res.status(200).json(JSON.parse(decodeURIComponent(data.result)));
  } catch (e) {
    return res.status(200).json(null);
  }
}
