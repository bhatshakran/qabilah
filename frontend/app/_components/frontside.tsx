import type { CurrentWord } from '../flashcard';

const FrontSide = ({ currentWord }: { currentWord: CurrentWord }) => {
  const cleanArabicForSpeech = (text: string) => {
    // 1. Remove slashes and replace with a comma (which tells the engine to pause)
    const cleaned = text.replace(/\//g, '،');

    // 2. The "End Vowel" Fix:
    // Native engines often ignore final harakat.
    // Adding a 'tatweel' (ـ) or a tiny pause after the word can sometimes force it.
    // But the most effective way is ensuring the string ends with the vowel and a space.
    return cleaned.trim() + ' ';
  };
  const speak = (text: string) => {
    window.speechSynthesis.cancel();

    // Use the cleaning function
    const processedText = cleanArabicForSpeech(text);

    const utterance = new SpeechSynthesisUtterance(processedText);
    const voices = window.speechSynthesis.getVoices();

    // CRITICAL: Some voices are 'Natural' and some are 'Legacy'.
    // Look for "Google" or "Microsoft" Arabic voices as they usually handle tashkeel better.
    const arVoice =
      voices.find((v) => v.lang.includes('ar') && v.name.includes('Google')) ||
      voices.find((v) => v.lang.includes('ar')) ||
      voices[0];

    utterance.voice = arVoice;
    utterance.lang = 'ar-SA';

    // SLOW IT DOWN: 0.7 or 0.8 is the sweet spot for hearing final vowels
    utterance.rate = 0.75;

    window.speechSynthesis.speak(utterance);
  };
  return (
    <div className="absolute inset-0 bg-zinc-900 border border-zinc-800 rounded-3xl flex flex-col items-center justify-center p-6 backface-hidden shadow-2xl">
      <button
        onClick={(e) => {
          e.stopPropagation();
          speak(currentWord.arabic);
        }}
        className="absolute top-6 right-6 p-3 rounded-full bg-zinc-800 hover:bg-zinc-700 text-amber-500 transition-colors shadow-lg group"
        title="Listen"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 group-active:scale-90 transition-transform"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.287a6 6 0 0 1 0 7.426M12 6.253v13c0 .851-1.015 1.303-1.644.73l-4.544-4.127a.75.75 0 0 0-.506-.203H4.875A1.125 1.125 0 0 1 3.75 14.532V9.468a1.125 1.125 0 0 1 1.125-1.125h.43a.75.75 0 0 0 .507-.203l4.544-4.127c.629-.573 1.644-.121 1.644.73Z"
          />
        </svg>
      </button>
      <span className="text-zinc-500 text-sm mb-4">Arabic</span>
      <h1
        dir="rtl"
        className="text-7xl font-bold mb-4 font-amiri text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
      >
        {currentWord.arabic}
      </h1>

      <p className="text-zinc-500 text-lg font-medium italic tracking-wide lowercase">
        {currentWord.transliteration || '...'}
      </p>
      <p className="text-zinc-500 text-sm mt-4">Press Space to Reveal</p>
    </div>
  );
};

export default FrontSide;
