import { atom } from "jotai";

interface taskProps {
  id: number;
  value: string;
  result: boolean;
}

interface taskAtom {
  data?: taskProps[];
  called: boolean;
  loading: boolean;
  error?: string;
}

export const taskList = atom<taskAtom>({
  data: undefined,
  called: false,
  loading: false,
  error: "",
});
