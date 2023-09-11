"use client";
import { useState, useEffect } from "react";
import useGetTaskList from "@/service/http/useGetTaskList"; // Importa um hook personalizado para obter dados de tarefas
import styles from "./page.module.css";
import axios from "axios";
import useDeleteTaskList from "@/service/http/useDeleteTaskList";
import useCreateTaskList from "@/service/http/useCreateTaskList";

export default function Home() {
  const [newTaskName, setNewTaskName] = useState(""); // Estado para armazenar o nome da nova tarefa
  const { data, called, loading, error, getTask } = useGetTaskList(); // Utiliza o hook personalizado para obter dados de tarefas
  const { deleteTask, called: deleteCalled } = useDeleteTaskList(); // Utiliza o hook personalizado para deletar dados de tarefas
  const { createTask, called: createCalled } = useCreateTaskList(); // Utiliza o hook personalizado para criar dados de tarefas

  useEffect(() => {
    getTask(); // Chama a função para obter os dados de tarefas ao montar o componente
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteCalled, createCalled]);

  if (loading) {
    return (
      <p style={{ textAlign: "center", fontSize: "22px" }}>Carregando...</p>
    ); // Renderiza uma mensagem de carregamento se os dados estiverem sendo carregados
  }

  if (error) {
    return (
      <p style={{ textAlign: "center", fontSize: "22px" }}>
        Ocorreu um erro ao carregar os dados.
      </p>
    ); // Renderiza uma mensagem de erro se ocorrer um erro ao carregar os dados
  }

  const handleAddTask = async () => {
    // Verificar se o nome da nova tarefa está vazio ou contém apenas espaços em branco
    if (!newTaskName.trim()) {
      alert("Ops! campo vazio.");
      setNewTaskName(""); // Limpa o input se estiver vazio ou contiver apenas espaços em branco
      return; // Sai da função se o nome da tarefa estiver vazio
    }

    try {
      // Enviar a nova tarefa para a API usando o método POST
      await axios.post("http://localhost:5000/tasks", {
        value: newTaskName,
      });

      setNewTaskName(""); // Atualizar o estado para exibir a nova tarefa
      getTask(); // Recarregar a lista de tarefas após adicionar uma nova tarefa
    } catch (error) {
      alert("Ops! erro ao adicionar tarefa."); // Mostra um erro se houver um problema ao adicionar uma tarefa
    }
  };

  const handleCompleted = async (id: number) => {
    try {
      const updatedTask = data?.find((task) => task.id === id); // Nesta linha serve para verificar se data não é undefined. Se data não for undefined, a função find é chamada para procurar a tarefa correspondente pelo id nas tarefas.

      if (updatedTask) {
        const updatedResult = !updatedTask.result; // Inverte o valor de result para concluído ou incompleto

        // Atualiza a tarefa no servidor com o novo valor de result
        await axios.put(`http://localhost:5000/tasks/${id}`, {
          ...updatedTask,
          result: updatedResult,
        });

        getTask(); // Recarrega a lista de tarefas após a atualização
      }
    } catch (error) {
      alert("Ops! erro ao concluir tarefa."); // Mostra um erro se houver um problema ao adicionar uma tarefa
    }
  };

  const handleRemoveTask = async (id: number) => {
    try {
      deleteTask({ idTask: id });
    } catch (error) {
      alert("Ops! erro ao remover tarefa."); // Mostra um erro se houver um problema ao remover uma tarefa
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>List Tasks</h1>
      <div className={styles.addTask}>
        <input
          className={styles.newTask}
          type="text"
          placeholder="Adicione uma nova tarefa"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)} // Atualiza o estado do nome da nova tarefa conforme o usuário digita
        />

        <button className={styles.buttonAdd} onClick={handleAddTask}>
          +
        </button>
      </div>
      <div className={styles.todoList}>
        {data?.map((task) => (
          <div key={task.id} className={styles.boxList}>
            <label
              className={`${styles.task} ${
                task.result && styles.taskCompleted
              }`}
              onClick={() => handleCompleted(task.id)}
            >
              {task.value}
            </label>
            <button
              className={styles.buttonRemove}
              onClick={() => handleRemoveTask(task.id)} // Chama a função para remover a tarefa quando o botão é clicado
            >
              -
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
