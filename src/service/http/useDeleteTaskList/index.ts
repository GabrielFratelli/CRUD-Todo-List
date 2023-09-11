import { useCallback } from "react";
import { RemoteService } from "../RemoteService";
import { ResultProps, Variables } from "./types";
import { useDeleteTaskAtom } from "@/hooks/useDeleteTask";

const useDeleteTaskList = () => {
  const { deleteTaskAtom, setDeleteTaskAtom } = useDeleteTaskAtom();
  const deleteTask = useCallback(async ({ idTask }: Variables) => {
    try {
      const variables = {
        idTask,
      };

      setDeleteTaskAtom({
        data: undefined,
        called: false,
        loading: true,
        error: "",
      });

      // a const responde é a conexão com API
      const response = await RemoteService.request<ResultProps>({
        method: "DELETE",
        resource: `tasks/${variables.idTask}`,
      });

      setDeleteTaskAtom({
        data: response.data,
        called: true,
        loading: false,
      });
    } catch (err) {
      const error = err as any;
      setDeleteTaskAtom({
        called: true,
        loading: false,
        error: error.message,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data, called, loading, error } = deleteTaskAtom;

  return {
    deleteTask,
    data,
    called,
    loading,
    error,
  };
};

export default useDeleteTaskList;
