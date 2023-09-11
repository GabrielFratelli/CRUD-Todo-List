import { useAtom } from "jotai";
import { deleteTaskList } from "@/state/deleteTaskList";

export function useDeleteTaskAtom() {
  const [deleteTaskAtom, setDeleteTaskAtom] = useAtom(deleteTaskList);
  return {
    deleteTaskAtom,
    setDeleteTaskAtom,
  };
}
