import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import connectToDatabase from "@/app/lib/connection";
import Dictionary from "@/app/models/dictionary";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    const cleanWord = text.trim();

    await connectToDatabase();

    // 1. CHECK THE DICTIONARY FIRST
    const cachedEntry = await Dictionary.findOne({ word: cleanWord });

    if (cachedEntry) {
      // Optional: Increment usage count in the background
      cachedEntry.usageCount += 1;
      cachedEntry.lastUsed = new Date();
      await cachedEntry.save();

      return NextResponse.json({
        translation: cachedEntry.translation,
        source: "dictionary", // Helpful for debugging
      });
    }

    // 2. IF NOT FOUND, CALL AI
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an Arabic dictionary. Return ONLY JSON with 'translation' and 'transliteration' keys.",
        },
        { role: "user", content: `Translate: ${cleanWord}` },
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
    });

    const aiResult = JSON.parse(
      chatCompletion.choices[0].message.content || "{}",
    );

    // 3. SAVE TO DICTIONARY FOR FUTURE USERS
    if (aiResult.translation) {
      await Dictionary.create({
        word: cleanWord,
        transliteration: aiResult.transliteration,
        translation: aiResult.translation,
      });
    }

    return NextResponse.json({ ...aiResult });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
