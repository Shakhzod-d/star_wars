import { create } from "zustand";
import { ICharacter } from "../types/StarWarsTypes";

interface StoreState {
  character: ICharacter | null;
  setCharacter: (characters: ICharacter) => void;
}

const useStore = create<StoreState>((set) => ({
  character: null,
  setCharacter: (character) => set({ character }),
}));

export default useStore;
