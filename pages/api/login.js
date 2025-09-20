let users = {}; // same memory

export default function handler(req,res){
  if(req.method !== "POST") return res.status(405).json({ success:false, message:"Method not allowed" });

  const { username, password } = req.body;
  if(!username || !password) return res.status(400).json({ success:false, message:"Username & password required" });

  if(!users[username] || users[username].password !== password)
    return res.status(401).json({ success:false, message:"Invalid credentials" });

  res.status(200).json({ success:true, username });
}