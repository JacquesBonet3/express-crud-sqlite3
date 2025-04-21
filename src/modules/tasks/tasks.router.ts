import {Router} from "express";
import {taskController} from "./tasks.controller";
import {validateDto} from "../../middlewares/validation.middleware";
import {CreateTaskDto} from "./dto/create.dto";
import {UpdateTaskDto} from "./dto/update.dto";

export interface RouterModule {
    readonly router: Router;
    readonly basePath: string;
}

const createRouter = (): Router => {
    const router = Router();
    router.get('/', taskController.readAll);
    router.post('/', validateDto(CreateTaskDto), taskController.create);
    router.put('/:id', validateDto(UpdateTaskDto), taskController.update);
    router.delete('/:id', taskController.delete);
    return router;
};


export const TaskRouter: RouterModule = {
    router: createRouter(),
    basePath: '/tasks'
};
