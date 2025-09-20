// pages/api/generate.js
export default function handler(req, res) {
  // GET request use karo instead of POST
  if (req.method === "GET") {
    const newKey = Math.random().toString(36).substring(2, 12);
    res.status(200).json({
      success: true,
      apiKey: newKey,
      limit: 50,
      credits: "t.me/zorvaxo",
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}