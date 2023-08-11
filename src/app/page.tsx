"use client";
import { useState, useEffect } from "react";
import useGetTodo from "@/service/http/useGetTodo"; // Importa um hook personalizado para obter dados de tarefas
import styles from "./page.module.css";
import axios from "axios";

export default function Home() {
  const [newTaskName, setNewTaskName] = useState(""); // Estado para armazenar o nome da nova tarefa
  const { data, called, loading, error, getTodo } = useGetTodo(); // Utiliza o hook personalizado para obter dados de tarefas

  useEffect(() => {
    getTodo(); // Chama a função para obter os dados de tarefas ao montar o componente
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <p>Carregando...</p>; // Renderiza uma mensagem de carregamento se os dados estiverem sendo carregados
  }

  if (error) {
    return <p>Ocorreu um erro ao carregar os dados.</p>; // Renderiza uma mensagem de erro se ocorrer um erro ao carregar os dados
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

      // Atualizar o estado para exibir a nova tarefa
      setNewTaskName("");
      getTodo(); // Recarregar a lista de tarefas após adicionar uma nova tarefa
    } catch (error) {
      <p>Erro ao adicionar a tarefa</p>; // Mostra um erro se houver um problema ao adicionar uma tarefa
    }
  };

  const handleCompleted = async (id: number) => {
    try {
      const updatedTask = data?.find((task) => task.id === id); // Nesta linha serve para verificar se data não é undefined. Se data não for undefined, a função find é chamada para procurar a tarefa correspondente pelo id nas tarefas.

      if (updatedTask) {
        // Inverte o valor de result para concluído ou incompleto
        const updatedResult = !updatedTask.result;

        // Atualiza a tarefa no servidor com o novo valor de result
        await axios.put(`http://localhost:5000/tasks/${id}`, {
          ...updatedTask,
          result: updatedResult,
        });

        // Recarrega a lista de tarefas após a atualização
        getTodo();
      }
    } catch (error) {
      <p>Erro ao concluir a tarefa</p>; // Mostra um erro se houver um problema ao adicionar uma tarefa
    }
  };

  const handleRemoveTask = async (id: number) => {
    try {
      // Deletar a tarefa da API usando o método DELETE
      await axios.delete(`http://localhost:5000/tasks/${id}`);

      // Recarregar a lista de tarefas após remover uma tarefa
      getTodo();
    } catch (error) {
      <p>Erro ao remover a tarefa</p>; // Mostra um erro se houver um problema ao remover uma tarefa
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
