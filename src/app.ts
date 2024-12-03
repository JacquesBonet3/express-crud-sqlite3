import express, { Application } from 'express';
import {tasksRoutes} from "./modules/tasks/tasks.routes";

export const createApp = (): Application => {
    const app = express();
    app.use(express.json());
    app.use('/tasks', tasksRoutes);
    return app;
};