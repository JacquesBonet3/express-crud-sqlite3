import express, { Application } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import {TaskModule} from "./resources/tasks";
import {authErrorMiddleware, authMiddleware} from "./middlewares/authorization.middleware";

export const createApp = (): Application => {
    const app = express();

    // Security middleware
    app.use(helmet());
    app.use(rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        limit: 100 // limit each IP to 100 requests per windowMs
    }));

    app.use(express.json());

    app.use(
        authMiddleware.unless({path: ['/login']})
    );

    app.use( authErrorMiddleware);

    app.use(TaskModule.basePath, TaskModule.router);

    return app;
};