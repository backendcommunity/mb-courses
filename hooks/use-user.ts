import { dataStore, User } from "@/lib/data";

export function useUser() {
  const user: User | any = dataStore.user;
  return user;
}
