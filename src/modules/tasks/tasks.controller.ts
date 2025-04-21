import { NextFunction, Request, Response } from 'express';
import { taskDB } from "./tasks.db";
import {
    CrudController,
    handleError,
    HttpResponse,
    sendOperationResponse,
    sendSuccessResponse,
    validateAndParseId
} from "../../crud";
import {HTTP_CODES} from "../../db";

const API_MESSAGES = {
    TASK_NOT_FOUND: 'Task not found',
    INVALID_ID: 'Invalid ID',
    TASK_UPDATED: 'Task updated successfully',
    TASK_DELETED: 'Task deleted successfully'
} as const;


export class TaskController implements CrudController {

    async readAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const tasks = await taskDB.getAll();
            sendSuccessResponse(res, { statusCode: HTTP_CODES.OK, data: tasks });
        } catch (error) {
            handleError(error, next);
        }
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { title, completed = false } = req.body;
            const newTask = await taskDB.create({ title, completed });
            sendSuccessResponse(res, { statusCode: HTTP_CODES.CREATED, data: newTask });
        } catch (error) {
            handleError(error, next);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const validationResult = await this.validateAndExecuteTaskOperation(
                req.params.id,
                async (id) => await taskDB.update(id, req.body),
                API_MESSAGES.TASK_UPDATED
            );
            sendOperationResponse(res, validationResult);
        } catch (error) {
            handleError(error, next);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const validationResult = await this.validateAndExecuteTaskOperation(
                req.params.id,
                async (id) => await taskDB.delete(id),
                API_MESSAGES.TASK_DELETED
            );
            sendOperationResponse(res, validationResult);
        } catch (error) {
            handleError(error, next);
        }
    }

    private async validateAndExecuteTaskOperation(
        idParam: string,
        operation: (id: number) => Promise<boolean>,
        successMessage: string
    ): Promise<HttpResponse<{ message: string }>> {
        const id = validateAndParseId(idParam);
        if (!id) {
            return {
                statusCode: HTTP_CODES.BAD_REQUEST,
                response: { success: false, error: API_MESSAGES.INVALID_ID }
            };
        }

        const success = await operation(id);
        if (!success) {
            return {
                statusCode: HTTP_CODES.NOT_FOUND,
                response: { success: false, error: API_MESSAGES.TASK_NOT_FOUND }
            };
        }

        return {
            statusCode: HTTP_CODES.OK,
            response: { success: true, data: { message: successMessage } }
        };
    }
}

export const taskController = new TaskController();