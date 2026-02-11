// hooks/useUserProgress.ts
import useSWR from "swr";

export function useUserProgress(userId?: string) {
  const { data, mutate } = useSWR<{
    streak_count: number;
    mastered_words: number[];
    last_study_date: string;
  }>(userId ? `/api/user/progress?userId=${userId}` : null, (url: string) =>
    fetch(url).then((res) => res.json()),
  );

  const syncMastery = async (wordId: number) => {
    if (!userId || !data) return;

    // 1. Optimistic Update: Update UI immediately
    const optimisticData = {
      ...data,
      mastered_words: [...data.mastered_words, wordId],
      // We don't update streak optimistically here to avoid complex date logic on client
    };

    // 'false' tells SWR not to revalidate against the server yet
    mutate(optimisticData, false);

    // 2. Real Update: Send to MongoDB
    const response = await fetch("/api/user/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, wordId }),
    });

    // 3. Revalidate: Get the actual final state from server
    mutate();
  };

  return { progress: data, syncMastery };
}
