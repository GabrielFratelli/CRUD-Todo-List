import { ResultProps } from "@/service/http/useDeleteTaskList/types";
import { atom } from "jotai";

interface taskAtom {
  data?: ResultProps;
  called: boolean;
  loading: boolean;
  error?: string;
}

export const deleteTaskList = atom<taskAtom>({
  data: undefined,
  called: false,
  loading: false,
  error: "",
});
