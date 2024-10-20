import { createHash } from "crypto";
import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import { join } from "path";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
  }

  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const uploadsDir = join(process.cwd(), "../data", "uploads");

  const md5sum = createHash("md5").update(fileBuffer).digest("hex");
  const fileExtension = file.name.split(".").pop();
  const filePath = join(uploadsDir, `${md5sum}.${fileExtension}`);

  await fs.mkdir(uploadsDir, { recursive: true });
  await fs.writeFile(filePath, fileBuffer);

  return NextResponse.json({ message: "File uploaded successfully" });
}
