export type TaskStatus = 'not_started' | 'in_progress' | 'completed';
export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
}

