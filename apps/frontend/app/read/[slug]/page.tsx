import connectToDatabase from "@/app/lib/connection";
import Reader from "../../_components/reader";
import { notFound } from "next/navigation";
import Article from "@/app/models/article";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  await connectToDatabase();
  // Fetching the article and converting to a plain object
  const articleDoc = await Article.findOne({ slug }).lean();
  if (!articleDoc) {
    notFound();
  }

  // Next.js cannot pass Mongoose ObjectIDs to Client Components.
  // We stringify and parse to ensure it's a clean JSON object
  // exactly matching your JSON structure.
  const articleData = JSON.parse(JSON.stringify(articleDoc));

  return (
    <main className="min-h-screen bg-zinc-950 flex justify-center">
      {/* Your Reader component now gets the exact JSON it expects */}
      <Reader article={articleData} />
    </main>
  );
}
