import connectToDatabase from "@/app/lib/connection";
import Vocabulary from "@/app/models/vocabulary";
import { VocabularyDTO } from "@/types/vocabulary";
import { cache } from "react";

export const getVocabulary = cache(
  async (): Promise<{
    data: VocabularyDTO[];
    pagination: {
      total: number;
    };
  }> => {
    await connectToDatabase();

    const data = await Vocabulary.find(
      {},
      {
        rank: 1,
        translation: 1,
        transliteration: 1,
        arabic: 1,
        english: 1,
        type: 1,
        level: 1,
        examples: 1,
        root: 1,
      },
    )
      .sort({ rank: 1 })
      .limit(100)
      .lean();
    const safeData = JSON.parse(JSON.stringify(data));
    const total = await Vocabulary.countDocuments();

    return {
      data: safeData,
      pagination: {
        total,
      },
    };
  },
);
