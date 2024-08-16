import { uploadFileToArweave } from "../../../lib/arweave";
import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Assuming you're receiving the file as form data
    const formData = await req.formData();
    const file = formData.get("file");

    // Load the Arweave key file (in a real-world scenario, this should be securely stored)
    const keyPath = path.resolve(process.cwd(), "arweave-key.json");
    const key = JSON.parse(fs.readFileSync(keyPath, "utf-8"));

    // Upload the file to Arweave
    const transactionId = await uploadFileToArweave(file, key);

    return NextResponse.json({ transactionId });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
