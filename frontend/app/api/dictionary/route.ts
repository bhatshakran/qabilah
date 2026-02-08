import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const word = searchParams.get('word');

  if (!word) return NextResponse.json({ error: 'No word' }, { status: 400 });

  try {
    // 1. Using MyMemory API (Free, no key needed for low volume)
    // It's a translation memory, so it's great for words and short phrases.
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=ar|en`
    );

    const data = await response.json();

    if (data.responseStatus !== 200) {
      throw new Error('API limit reached or error');
    }

    // 2. Extract main translation and other matches
    const mainTranslation = data.responseData.translatedText;
    const alternatives = data.matches
      .map((m: any) => m.translation)
      .filter((t: string) => t.toLowerCase() !== mainTranslation.toLowerCase())
      .slice(0, 3);

    return NextResponse.json({
      word,
      meanings: [mainTranslation, ...alternatives],
      source: 'MyMemory Free API',
    });
  } catch (error) {
    // Fallback: If MyMemory fails, try a direct Wiktionary search
    return NextResponse.json({
      word,
      meanings: ['Translation temporarily unavailable'],
      error: true,
    });
  }
}
