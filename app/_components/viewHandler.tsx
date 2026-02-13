import { useVocabularyStore } from "@/stores/vocabularyStore";
import Map from "@/app/_components/map";
import LibraryView from "@/app/_components/library_view";
import Result from "@/app/_components/result";
import Flashcard from "@/app/_components/flashcard";

const ViewHandler = () => {
  // 1. Get everything from the store (Atomic Selectors for performance)
  const view = useVocabularyStore((s) => s.view);
  const queue = useVocabularyStore((s) => s.queue);
  const selectedLevel = useVocabularyStore((s) => s.selectedLevel);
  const wordsData = useVocabularyStore((s) => s.wordsData);
  const masteredIds = useVocabularyStore((s) => s.masteredIds);

  // 2. Get derived stats
  const getDerivedStats = useVocabularyStore((s) => s.getDerivedStats);
  const { totalLevels, isLevelComplete } = getDerivedStats();

  // 3. Conditional Rendering with early returns
  // view === "cards" logic
  if (view == "cards" && queue.length === 0) {
    return (
      <Result
        isLevelComplete={isLevelComplete}
        currentLevel={selectedLevel}
        totalLevels={totalLevels}
      />
    );
  }
  if (view === "map") {
    return <Map />;
  }

  if (view === "library") {
    return <LibraryView masteredIds={masteredIds} wordsData={wordsData} />;
  }

  return <Flashcard />;
};

export default ViewHandler;
