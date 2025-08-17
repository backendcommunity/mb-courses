import { dataStore, User } from "@/lib/data";
import { localDB } from "@/lib/localDB";

export function useUser() {
  let user: User | any = dataStore.user;

  try {
    const u = localDB.get("user", "");
    if (!u?.includes("undefined")) user = JSON.parse(u!);
    return user;
  } catch (error) {
    return user;
  }
}
