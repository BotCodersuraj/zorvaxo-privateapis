let users = {}; // memory-based

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ success:false, message:"Method not allowed" });

  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ success:false, message:"Username & password required" });

  if (users[username]) return res.status(400).json({ success:false, message:"Username already exists" });

  users[username] = { password, keys: [] };
  res.status(200).json({ success:true, message:"User registered successfully" });
}