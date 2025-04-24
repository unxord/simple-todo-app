export interface ITask {
    id: string;
    text: string;
    completed: boolean;
    dueDate?: string | null;
    priority?: PriorityLevel;
  }

export type FilterValue = 'all' | 'active' | 'completed';

export type PriorityLevel = 'low' | 'medium' | 'high';