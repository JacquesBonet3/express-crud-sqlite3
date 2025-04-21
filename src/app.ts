import express, { Application } from 'express';
import {TaskModule} from "./modules/tasks";

export const createApp = (): Application => {
    const app = express();
    app.use(express.json());
    app.use(TaskModule.basePath, TaskModule.router);
    return app;
};