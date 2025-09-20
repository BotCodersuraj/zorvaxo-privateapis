let apikeys = {}; // memory storage for keys

export default async function handler(req, res) {
  const { uid, key } = req.query;

  if (!key || !uid) {
    return res.status(400).json({ success: false, message: "UID aur API key chahiye" });
  }

  // check key exist
  if (!apikeys[key]) {
    // first time, memory me add karo
    apikeys[key] = { limit: 50 };
  }

  if (apikeys[key].limit <= 0) {
    return res.status(403).json({ success: false, message: "API Key limit exceeded" });
  }

  try {
    const response = await fetch(`https://danger-region-check.vercel.app/region?uid=${uid}&key=DANGERxREGION`);
    const data = await response.json();

    // reduce limit
    apikeys[key].limit -= 1;

    res.status(200).json({
      ...data,
      remaining: apikeys[key].limit,
      success: true,
      credits: "t.me/zorvaxo",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
}