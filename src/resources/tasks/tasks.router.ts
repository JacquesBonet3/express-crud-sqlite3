import {Router} from "express";
import {taskController} from "./tasks.controller";
import {validateDto} from "../../middlewares/validation.middleware";
import {CreateDto} from "./dto/create.dto";
import {UpdateDto} from "./dto/update.dto";

const createTaskRouter = (): Router => {
    const router = Router();
    router.get('/', taskController.readAll.bind(taskController));
    router.post('/', validateDto(CreateDto), taskController.create.bind(taskController));
    router.put('/:id', validateDto(UpdateDto), taskController.update.bind(taskController));
    router.delete('/:id', taskController.delete.bind(taskController));
    return router;
};


export const TaskRouter = {
    router: createTaskRouter(),
    basePath: '/tasks'
};
