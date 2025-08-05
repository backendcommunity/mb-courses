import { dataStore, User } from "@/lib/data";
import { localDB } from "@/lib/localDB";

export function useUser() {
  let user: User | any = dataStore.user;

  const u = localDB.get("user", "");
  if (!u?.includes("undefined")) user = JSON.parse(u!);
  return user;

  return user;
}
