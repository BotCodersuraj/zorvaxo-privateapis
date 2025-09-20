let users = {}; // same memory

export default async function handler(req, res) {
  const { username, key, uid } = req.query;

  if (!username || !key || !uid) return res.status(400).json({ success: false, message: "Username, key, and UID required" });

  const user = users[username];
  if (!user) return res.status(403).json({ success: false, message: "Unauthorized" });

  const keyObj = user.keys.find(k => k.key === key);
  if (!keyObj) return res.status(403).json({ success: false, message: "Invalid API Key" });
  if (keyObj.limit <= 0) return res.status(403).json({ success: false, message: "API Key limit exceeded" });

  try {
    const response = await fetch(`https://danger-region-check.vercel.app/region?uid=${uid}&key=DANGERxREGION`);
    const data = await response.json();

    keyObj.limit -= 1;

    res.status(200).json({ ...data, remaining: keyObj.limit, credits: "t.me/zorvaxo", success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
}