import { useAtom } from "jotai";
import { getTaskList } from "@/state/getTaskList";

export function useGetTaskAtom() {
  const [taskAtom, setTaskAtom] = useAtom(getTaskList);
  return {
    taskAtom,
    setTaskAtom,
  };
}
