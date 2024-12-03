import {NextFunction, Request, Response} from 'express';
import {deleteTaskById, getTasks, saveTask, updateTaskById} from "./tasks.service";

export const getAllTasks = async (req: Request, res: Response) => {
    const tasks = await getTasks();
    res.json(tasks);
};

export const createTask = async (req: Request, res: Response) => {
    const { title, completed } = req.body;
    const newTask = await saveTask({ title, completed: completed || false });
    res.status(201).json(newTask);
};

export const updateTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10);
        const { title, completed } = req.body;

        const success = await updateTaskById(id, { title, completed });

        if (!success) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }

        res.json({ message: 'Task updated successfully' });
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid ID' });
            return;
        }

        const success = await deleteTaskById(id);

        if (!success) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        next(error);
    }
};