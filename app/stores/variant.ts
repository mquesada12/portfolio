import { defineStore } from "pinia";

export type PortfolioVariant = "frontend" | "backend" | "fullstack";

interface VariantState {
  active: PortfolioVariant;
}

export const useVariantStore = defineStore("variant", {
  state: (): VariantState => ({
    active: "fullstack",
  }),

  getters: {
    isFrontend: (state) => state.active === "frontend",
    isBackend: (state) => state.active === "backend",
    isFullStack: (state) => state.active === "fullstack",
    getVariant: (state) => state.active,
  },

  actions: {
    setVariant(variant: PortfolioVariant) {
      this.active = variant;
    },
  },
});