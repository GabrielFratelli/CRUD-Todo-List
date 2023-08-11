import { useAtom } from "jotai";
import { taskList } from "@/state/taskList";

export function useTaskAtom() {
  const [taskAtom, setTaskAtom] = useAtom(taskList);
  return {
    taskAtom,
    setTaskAtom,
  };
}
