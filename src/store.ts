import { create } from "zustand";

interface AppState {
  contentType: "destination" | "vacationDetail" | "vacation";
  responseLoading: boolean;
  changeContent: (
    contentType: "destination" | "vacationDetail" | "vacation"
  ) => void;
  setResponseLoading: (state: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  contentType: "vacation",
  responseLoading: false,
  changeContent: (contentType: "destination" | "vacationDetail" | "vacation") =>
    set(() => ({ contentType })),
  setResponseLoading: (status: boolean) =>
    set(() => ({ responseLoading: status })),
}));
