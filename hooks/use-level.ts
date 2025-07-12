import { dataStore, Level } from "@/lib/data";
import { useUser } from "./use-user";

export function useLevel() {
  const user = useUser();

  const levels: Level[] = dataStore.levels;

  function findMBToNextLevel() {
    const userLevel = user?.level;
    const nextLevelIndex = levels.findIndex((l) => l.id === userLevel);
    const nextLevel = levels[nextLevelIndex + 1];
    return nextLevel?.point! - user.points;
  }

  //   const name = levels[user.level].name;
  const level = levels[user.level];

  const mbToNextLevel = findMBToNextLevel();
  return { levels, mbToNextLevel, level };
}
