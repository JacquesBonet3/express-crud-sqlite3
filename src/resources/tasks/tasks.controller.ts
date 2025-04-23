import {TaskDB} from "./tasks.db";
import {
    CrudController,
} from "../../crud";
import {GenericController} from "../../controller";
import {Task} from "./tasks.type";


class TaskController extends GenericController<Task, TaskDB> implements CrudController {
}

export const taskController = new TaskController( TaskDB,'Task');