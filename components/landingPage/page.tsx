import FeatureGrid from "@/components/featureGrid/page";
import ArticlePreview from "@/components/landingPage/articlePreview";
import Hero from "@/components/landingPage/hero";
import Article from "@/app/models/document";
import connectToDatabase from "@/app/lib/connection";
import Footer from "@/components/landingPage/footer";
import Header from "@/components/header";

const LandingPage = async () => {
  await connectToDatabase();
  // Fetch the latest 3 articles for the "Live" feel
  const latestArticles = await Article.find({})
    .sort({ date: -1 })
    .limit(3)
    .lean();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-amber-500/30">
      <Header />
      {/* 1. The Hook */}
      <Hero />

      {/* 2. The Interactive Bento Grid (Snapshots) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">
          Built for the Modern{" "}
          <span className="text-amber-500 italic">Qabilah</span>
        </h2>
        <FeatureGrid />
      </section>

      {/* 3. Real Content Snapshot */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold">Latest in the Library</h2>
              <p className="text-zinc-500">
                Dive into fresh texts from across the Arab world.
              </p>
            </div>
            <a
              href="/library"
              className="text-amber-500 font-bold hover:underline"
            >
              View All Articles →
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {latestArticles.map((art) => (
              <ArticlePreview
                key={art._id}
                article={JSON.parse(JSON.stringify(art))}
              />
            ))}
          </div>
        </div>
        <Footer />
      </section>
    </div>
  );
};

export default LandingPage;
