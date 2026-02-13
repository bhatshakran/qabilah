import Reader from "@/app/_components/reader";
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await fetch(`${process.env.BASE_URL}/api/documents/${slug}`);

  const data = await res.json();

  return (
    <main className="min-h-screen bg-zinc-950 flex justify-center">
      <Reader readerDocument={data} />
    </main>
  );
}
