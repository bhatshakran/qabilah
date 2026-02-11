import connectToDatabase from "@/app/lib/connection";
import Article from "@/app/models/article";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    await connectToDatabase();
    const { slug } = await params;

    // Fetching the article
    // .lean() converts it to a plain JS object, so we don't need JSON.parse/stringify hack
    const articleDoc = await Article.findOne({ slug }).lean();

    if (!articleDoc) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // NextResponse.json() automatically handles serialization
    const response = NextResponse.json(articleDoc, { status: 200 });
    // response.headers.set(
    //   "Cache-Control",
    //   "public, s-maxage=60, stale-while-revalidate=120",
    // );
    return response;
  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
