export interface ITask {
    id: string;
    text: string;
    completed: boolean;
  }

export type FilterValue = 'all' | 'active' | 'completed';