import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'apikeys.json');

export default async function handler(req, res) {
  const { uid, key } = req.query;

  if (!key) return res.status(400).json({ success: false, message: "Invalid API Key" });

  let apikeys = {};
  if (fs.existsSync(filePath)) {
    apikeys = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  if (!apikeys[key]) return res.status(403).json({ success: false, message: "Invalid API Key" });
  if (apikeys[key].limit <= 0) return res.status(403).json({ success: false, message: "API Key limit exceeded" });

  try {
    const response = await fetch(`https://danger-region-check.vercel.app/region?uid=${uid}&key=DANGERxREGION`);
    const data = await response.json();

    if (data.status === "error") {
      return res.status(404).json({ success: false, message: "Invalid UID or Player not found", status: "error" });
    }

    apikeys[key].limit -= 1;
    fs.writeFileSync(filePath, JSON.stringify(apikeys, null, 2));

    res.status(200).json({ ...data, remaining: apikeys[key].limit, success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
                                                            }
