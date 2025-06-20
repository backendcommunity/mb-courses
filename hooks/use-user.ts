import { dataStore } from "@/lib/data";

export function useUser() {
  const user = dataStore.user;
  return user;
}
