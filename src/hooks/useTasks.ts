import { useState, useEffect, useCallback } from 'react';
import { ITask } from '../types';

const LOCAL_STORAGE_KEY = 'react-todo-list-tasks';

export function useTasks() {
  const [tasks, setTasks] = useState<ITask[]>(() => {
    try {
      const items = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      return items ? (JSON.parse(items) as ITask[]) : [];
    } catch (error) {
      console.error('Error reading tasks from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
    }
  }, [tasks]);

  const addTask = useCallback((text: string) => {
    if (!text.trim()) {
      return;
    }
    const newTask: ITask = {
      id: Date.now().toString(),
      text: text,
      completed: false,
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  }, []);

  const toggleTaskCompletion = useCallback((id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, []);

  return {
    tasks,
    addTask,
    toggleTaskCompletion,
    deleteTask,
  };
}