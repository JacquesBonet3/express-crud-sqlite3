import {Router} from "express";
import {createTask, deleteTask, getAllTasks, updateTask,} from "./tasks.controller";
import {validateDto} from "../../middlewares/validation.middleware";
import {CreateTaskDto} from "./dto/create-task.dto";
import {UpdateTaskDto} from "./dto/update-task.dto";

const router = Router();

router.get('/', getAllTasks);
router.post('/', validateDto(CreateTaskDto), createTask);
router.put('/:id', validateDto(UpdateTaskDto), updateTask);
router.delete('/:id', deleteTask);

export const tasksRoutes = router;