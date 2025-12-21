import { useState } from 'react';
import { Task } from '../models/Task';

export const useTaskController = () => {
  // local state for storing tasks (in memory)
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (title: string) => {
    // cleaning title input
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    // id 
    const generateId = () => Date.now().toString() + Math.random().toString(36).substring(2, 9);

    const newTask: Task = {
      id: generateId(),
      title: trimmedTitle,
      isCompleted: false,
      createdAt: Date.now(),
    };

    // setting tasks state (in an immutable way) with the new task
    setTasks((currentTasks) => [newTask, ...currentTasks]);
  };

  const deleteTask = (taskId: string) => {
    setTasks((currentTasks) => 
      currentTasks.filter((task) => task.id !== taskId)
    );
  };

  const updateTask = (taskId: string, newTitle: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, title: newTitle.trim() }
          : task
      )
    );
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, isCompleted: !task.isCompleted }
          : task
      )
    );
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
  };
};