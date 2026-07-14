export interface AffizyWindow {
  Affizy?: {
    getReferral?: () => string;
  };
}

export function isAffizyReady(win: AffizyWindow): boolean {
  return typeof win.Affizy?.getReferral === "function";
}

export function readReferralCode(win: AffizyWindow): string {
  return isAffizyReady(win) ? win.Affizy!.getReferral!() || "" : "";
}
