import Reader from "../../_components/reader";
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await fetch(`${process.env.BASE_URL}/api/articles/${slug}`);

  const data = await res.json();

  return (
    <main className="min-h-screen bg-zinc-950 flex justify-center">
      <Reader article={data} />
    </main>
  );
}
