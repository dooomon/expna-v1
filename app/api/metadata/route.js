import path from 'path';
import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  const filePath = path.join(process.cwd(), 'public', 'metadata', `${id}.json`);
  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    const metadata = JSON.parse(fileContents);

    // Prepend the base URL to the image path
    //const baseUrl = `${req.nextUrl.protocol}://${req.nextUrl.host}`;
    //metadata.image = `${baseUrl}${metadata.image}`;

    return NextResponse.json(metadata);
  } catch (err) {
    return NextResponse.json({ error: "Metadata not found" }, { status: 404 });
  }
}
