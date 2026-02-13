export interface Example {
  ar: string;
  en: string;
}

export interface VocabularyDTO {
  rank: number;
  arabic: string;
  english: string;
  transliteration?: string;
  type: "ism" | "fi'l" | "harf" | "phrase";
  level: "easy" | "medium" | "hard";
  root?: string | null;
  examples: Example[];

  // Because you enabled timestamps
  createdAt: string; // will be serialized as ISO string
  updatedAt: string;
}
