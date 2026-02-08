import FlashcardApp from './flashcard';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black">
      <main className="w-full flex items-center flex-col p-4 md:max-w-2xl">
        <FlashcardApp />
      </main>
    </div>
  );
}
