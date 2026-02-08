import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an Arabic language expert. Translate the provided text. 
          Return ONLY a JSON object with these keys: 
          "translation": (string), 
          "transliteration": (string),`,
        },
        {
          role: "user",
          content: `Translate this: "${text}".`,
        },
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(
      chatCompletion.choices[0].message.content || "{}",
    );
    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
