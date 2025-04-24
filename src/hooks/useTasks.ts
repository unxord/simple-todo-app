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

  const addTask = useCallback((text: string, dueDate: string | null = null) => {
    if (!text.trim()) {
      return;
    }
    const newTask: ITask = {
      id: Date.now().toString(),
      text: text,
      completed: false,
      dueDate: dueDate,
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

  const editTask = useCallback((id: string, newText: string) => {
    if (!newText.trim()) return;
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, text: newText.trim() } : task
      )
    );
  }, []);

  const setTaskDueDate = useCallback((id: string, dueDate: string | null) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, dueDate: dueDate } : task
      )
    );
  }, []);

  return {
    tasks,
    addTask,
    toggleTaskCompletion,
    deleteTask,
    editTask,
    setTaskDueDate,
  };
}