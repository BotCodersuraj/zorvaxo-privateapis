export default function handler(req, res) {
  // Secret key check
  const secret = req.query.secret;

  if (secret !== "ZORVAXO_API_GENRATOR") {
    return res.status(403).json({ success: false, message: "❌ Unauthorized" });
  }

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