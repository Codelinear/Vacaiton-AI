import { create } from "zustand";

interface AppState {
  contentType: "destination" | "vacationDetail" | "vacation";
  changeContent: (
    contentType: "destination" | "vacationDetail" | "vacation"
  ) => void;
}

export const useStore = create<AppState>((set) => ({
  contentType: "destination",
  changeContent: (contentType: "destination" | "vacationDetail" | "vacation") =>
    set(() => ({ contentType })),
}));
