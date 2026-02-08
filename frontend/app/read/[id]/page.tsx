import Reader from '../../_components/reader';
import { promises as fs } from 'fs';
import path from 'path';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 1. Locate the JSON file based on the ID
  const filePath = path.join(process.cwd(), 'public', 'content', `${id}.json`);

  // 2. Read the file
  const fileContent = await fs.readFile(filePath, 'utf8');
  const articleData = JSON.parse(fileContent);

  // 3. Render the Reader component with the dynamic data
  return (
    <main className="min-h-screen bg-zinc-950 flex justify-center">
      <Reader article={articleData} />
    </main>
  );
}
