import { Task } from '../types/task';
const TASKS_KEY = 'kanban_tasks';
export const getTasks = (): Task[] => {
    const tasks = localStorage.getItem(TASKS_KEY);
    return tasks ? JSON.parse(tasks) : [];
}
export const saveTasks = (tasks: Task[]): void => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};
export const getTaskById = (taskId: string): Task | null => {
    const tasks = getTasks();
    return tasks.find(task => task.id === taskId) ?? null;
};
export const updateTask = (updatedTask: Task): void => {
    const tasks = getTasks();
    const taskIndex = tasks.findIndex(task => task.id === updatedTask.id);

    if (taskIndex !== -1) {
        tasks[taskIndex] = updatedTask;
        saveTasks(tasks);
    }
};

export const deleteTask = (taskId: string): void => {
    const tasks = getTasks();
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    saveTasks(updatedTasks);
};

export const createTask = (newTask: Task): void => {
    const tasks = getTasks();
    saveTasks([...tasks, newTask]);
};
