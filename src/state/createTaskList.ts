import { ResultProps } from "@/service/http/useCreateTaskList/types";
import { atom } from "jotai";

interface taskAtom {
  data?: ResultProps;
  called: boolean;
  loading: boolean;
  error?: string;
}

export const createTaskList = atom<taskAtom>({
  data: undefined,
  called: false,
  loading: false,
  error: "",
});
