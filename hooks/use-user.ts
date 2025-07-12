import { dataStore, User } from "@/lib/data";

export function useUser() {
  let user: User | any = dataStore.user;

  if (typeof localStorage !== "undefined") {
    const u = localStorage.getItem("mb_user");
    if (!u?.includes("undefined")) user = JSON.parse(u!);
    return user;
  }
  return user;
}
