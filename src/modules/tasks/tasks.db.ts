import { Task } from "./tasks.type";
import { withDatabase } from "../../db";

const SQL_QUERIES = {
    GET_ALL: 'SELECT * FROM tasks',
    INSERT: 'INSERT INTO tasks (title, completed) VALUES (?, ?)',
    UPDATE: `
        UPDATE tasks 
        SET title = COALESCE(?, title), 
            completed = COALESCE(?, completed) 
        WHERE id = ?`,
    DELETE: 'DELETE FROM tasks WHERE id = ?'
} as const;

class TaskDB {

    async getAll(): Promise<Task[]> {
        return withDatabase(db => db.all<Task[]>(SQL_QUERIES.GET_ALL));
    }

    async create(task: Omit<Task, 'id'>): Promise<Task> {
        return withDatabase(async db => {
            const result = await db.run(SQL_QUERIES.INSERT, [
                task.title,
                Number(task.completed)
            ]);
            return {
                id: result.lastID!,
                ...task
            };
        });
    }

    async update(id: number, updates: Partial<Omit<Task, 'id'>>): Promise<boolean> {
        return withDatabase(async db => {
            const result = await db.run(SQL_QUERIES.UPDATE, [
                updates.title,
                updates.completed !== undefined ? Number(updates.completed) : undefined,
                id
            ]);
            return result.changes! > 0;
        });
    }

    async delete(id: number): Promise<boolean> {
        return withDatabase(async db => {
            const result = await db.run(SQL_QUERIES.DELETE, [id]);
            return (result.changes ?? 0) > 0;
        });
    }
}

export const taskDB = new TaskDB();