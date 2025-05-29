import { useState, useEffect, useCallback } from 'react';
import { ITask, PriorityLevel, FilterValue } from '../types';

import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

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

  const addTask = useCallback((text: string, dueDate: string | null = null, priority: PriorityLevel = 'medium') => {
    if (!text.trim()) {
      return;
    }
    const newTask: ITask = {
      id: Date.now().toString(),
      text: text,
      completed: false,
      dueDate: dueDate,
      priority: priority,
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

  const setTaskPriority = useCallback((id: string, priority: PriorityLevel) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, priority: priority } : task
      )
    );
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setTasks((currentTasks) => {
        const oldIndex = currentTasks.findIndex((task) => task.id === active.id);
        const newIndex = currentTasks.findIndex((task) => task.id === over.id);

        if (oldIndex === -1 || newIndex === -1) {
          return currentTasks;
        }

        return arrayMove(currentTasks, oldIndex, newIndex);
      });
    }
  }, []);

  const deleteAllTasksInFilter = useCallback((filter: FilterValue) => {
    setTasks((prevTasks) => {
      switch (filter) {
        case 'active':
          return prevTasks.filter(task => task.completed);
        case 'completed':
          return prevTasks.filter(task => !task.completed);
        default:
          return [];
      }
    });
  }, []);

  return {
    tasks,
    addTask,
    toggleTaskCompletion,
    deleteTask,
    editTask,
    setTaskDueDate,
    setTaskPriority,
    handleDragEnd,
    deleteAllTasksInFilter,
  };
}