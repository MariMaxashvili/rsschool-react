import { create } from "zustand";
import type { PokemonDetail } from "../types";

interface PokemonStore {
  selectedItems: PokemonDetail[];
  selectItem: (pokemon: PokemonDetail) => void;
  unselectItem: (id: number) => void;
  unselectAll: () => void;
}

export const usePokemonStore = create<PokemonStore>((set) => ({
  selectedItems: [],

  selectItem: (pokemon) =>
    set((state) => ({
      selectedItems: [...state.selectedItems, pokemon],
    })),

  unselectItem: (id) =>
    set((state) => ({
      selectedItems: state.selectedItems.filter((p) => p.id !== id),
    })),

  unselectAll: () => set({ selectedItems: [] }),
}));
