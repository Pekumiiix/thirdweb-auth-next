import { uploadFileToArweave } from "../../../lib/arweave";
import path from "path";
import fs from "fs";

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    try {
      const { file } = req.files; // Assume you're using a file upload middleware like formidable

      // Load the Arweave key file (in a real-world scenario, this should be securely stored)
      const keyPath = path.resolve(process.cwd(), "arweave-key.json");
      const key = JSON.parse(fs.readFileSync(keyPath, "utf-8"));

      // Upload the file to Arweave
      const transactionId = await uploadFileToArweave(file, key);

      res.status(200).json({ transactionId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
