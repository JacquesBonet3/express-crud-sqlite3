import {Task} from "./tasks.interface";
import {initializeDatabase} from "../../config/database.config";
import { Database } from 'sqlite';


const SQL_GET_ALL_TASKS = 'SELECT * FROM tasks';
const SQL_INSERT_TASK = 'INSERT INTO tasks (title, completed) VALUES (?, ?)';
const SQL_UPDATE_TASK = `
  UPDATE tasks 
  SET title = COALESCE(?, title), 
      completed = COALESCE(?, completed) 
  WHERE id = ?`;

export const getTasks = async (): Promise<Task[]> => {
    const db: Database = await initializeDatabase();

    try {
        const tasks: Task[] = await db.all<Task[]>(SQL_GET_ALL_TASKS);
        return tasks;
    } finally {
        await db.close();
    }
};

export const saveTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
    const db: Database = await initializeDatabase();

    try {
        const result = await db.run(SQL_INSERT_TASK, [
            task.title,
            task.completed ? 1 : 0,
        ]);

        return {
            id: result.lastID as number,
            title: task.title,
            completed: task.completed,
        };
    } finally {
        await db.close();
    }
};

export const updateTaskById = async (
    id: number,
    task: Partial<Omit<Task, 'id'>>
): Promise<boolean> => {
    const db = await initializeDatabase();

    try {
        const result = await db.run(SQL_UPDATE_TASK, [
            task.title,
            task.completed !== undefined ? (task.completed ? 1 : 0) : undefined,
            id,
        ]);

        return result.changes! > 0;
    } finally {
        await db.close();
    }
};

export const deleteTaskById = async (id: number): Promise<boolean> => {
    const db: Database = await initializeDatabase();

    try {
        const result = await db.run('DELETE FROM tasks WHERE id = ?', [id]);
        return (result.changes ?? 0) > 0;
    } finally {
        await db.close();
    }
};