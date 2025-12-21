import { useState } from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../models/Task';

export const useTaskController = () => {
  // local state for storing tasks (in memory)
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (title: string) => {
    // cleaning title input
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    const newTask: Task = {
      id: uuidv4(),
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

  // change task completion status
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
    deleteTask,
    toggleTaskCompletion,
  };
};