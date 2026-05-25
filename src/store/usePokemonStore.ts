import { create } from "zustand";
import type { PokemonDetail } from "../types";

interface PokemonStore {
  selectedItems: PokemonDetail[];
  selectItem: (pokemon: PokemonDetail) => void;
  unselectItem: (name: string) => void;
  unselectAll: () => void;
}

export const usePokemonStore = create<PokemonStore>((set) => ({
  selectedItems: [],

  selectItem: (pokemon) =>
    set((state) => ({
      selectedItems: [...state.selectedItems, pokemon],
    })),

  unselectItem: (name) =>
    set((state) => ({
      selectedItems: state.selectedItems.filter((p) => p.name !== name),
    })),

  unselectAll: () => set({ selectedItems: [] }),
}));
