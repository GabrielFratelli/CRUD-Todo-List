import { createTaskList } from "@/state/createTaskList";
import { useAtom } from "jotai";

export function useCreateTaskAtom() {
  const [createTaskAtom, setCreateTaskAtom] = useAtom(createTaskList);
  return {
    createTaskAtom,
    setCreateTaskAtom,
  };
}
