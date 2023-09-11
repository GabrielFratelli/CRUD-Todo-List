import { useCallback } from "react";
import { RemoteService } from "../RemoteService";
import { ResultProps, Variables } from "./types";
import { useCreateTaskAtom } from "@/hooks/useCreateTask";

const useCreateTaskList = () => {
  const { createTaskAtom, setCreateTaskAtom } = useCreateTaskAtom();
  const createTask = useCallback(async ({ id, value, result }: Variables) => {
    try {
      setCreateTaskAtom({
        data: undefined,
        called: false,
        loading: true,
        error: "",
      });

      // a const response é a conexão com API
      const response = await RemoteService.request<ResultProps>({
        method: "POST",
        resource: "tasks",
        body: {
          id: id,
          value: value,
          result: result,
        },
      });

      setCreateTaskAtom({
        data: response.data,
        called: true,
        loading: false,
      });
    } catch (err) {
      const error = err as any;
      setCreateTaskAtom({
        called: true,
        loading: false,
        error: error.message,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data, called, loading, error } = createTaskAtom;

  return {
    createTask,
    data,
    called,
    loading,
    error,
  };
};

export default useCreateTaskList;
