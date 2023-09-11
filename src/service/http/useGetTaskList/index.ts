import { useGetTaskAtom } from "@/hooks/useGetTask";
import { useCallback } from "react";
import { RemoteService } from "../RemoteService";
import { ResultProps } from "./types";

const useGetTaskList = () => {
  const { taskAtom, setTaskAtom } = useGetTaskAtom();
  const getTask = useCallback(async () => {
    try {
      setTaskAtom({
        called: false,
        loading: true,
      });
      // a const response é a conexão com API
      const response = await RemoteService.request<ResultProps[]>({
        method: "GET",
        resource: "tasks",
      });

      const tasksData = response.data?.map((data) => {
        return {
          id: data.id,
          value: data.value,
          result: data.result,
        };
      });

      setTaskAtom({
        data: tasksData,
        called: true,
        loading: false,
      });
    } catch (err) {
      const error = err as any;
      setTaskAtom({
        called: true,
        loading: false,
        error: error.message,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data, called, loading, error } = taskAtom;

  return {
    getTask,
    data,
    called,
    loading,
    error,
  };
};

export default useGetTaskList;
