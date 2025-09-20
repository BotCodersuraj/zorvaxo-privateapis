let apikeys = {}; // memory only

export default async function handler(req, res) {
  const { uid, key } = req.query;

  if (!key || !apikeys[key])
    return res.status(403).json({ success: false, message: "Invalid API Key" });

  if (apikeys[key].limit <= 0)
    return res.status(403).json({ success: false, message: "API Key limit exceeded" });

  try {
    const response = await fetch(`https://danger-region-check.vercel.app/region?uid=${uid}&key=DANGERxREGION`);
    const data = await response.json();

    apikeys[key].limit -= 1; // reduce limit

    res.status(200).json({ ...data, remaining: apikeys[key].limit, success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
}