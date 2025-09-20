import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const filePath = path.join(process.cwd(), 'apikeys.json');

export default function handler(req, res) {
  if (req.method === 'POST') {
    let apikeys = {};
    if (fs.existsSync(filePath)) {
      apikeys = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }

    const newKey = uuidv4();
    apikeys[newKey] = { limit: 50 };

    fs.writeFileSync(filePath, JSON.stringify(apikeys, null, 2));

    res.status(200).json({
      success: true,
      apiKey: newKey,
      limit: 50,
      credits: "t.me/zorvaxo"
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
