let users = {}; // same memory

export default function handler(req, res) {
  const { username, secret } = req.query;

  if (!username || !users[username]) return res.status(403).json({ success: false, message: "Unauthorized" });

  // private generate secret
  if (secret !== "TUMHARA_SECRET") return res.status(403).json({ success: false, message: "Unauthorized" });

  const newKey = Math.random().toString(36).substring(2, 12);
  users[username].keys.push({ key: newKey, limit: 50 });

  res.status(200).json({ success: true, apiKey: newKey, limit: 50, credits: "t.me/zorvaxo" });
}