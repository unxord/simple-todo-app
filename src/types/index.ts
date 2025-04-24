export interface ITask {
    id: string;
    text: string;
    completed: boolean;
    dueDate?: string | null;
  }

export type FilterValue = 'all' | 'active' | 'completed';