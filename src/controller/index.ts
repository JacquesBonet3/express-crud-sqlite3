import { NextFunction, Request, Response } from 'express';
import {
    CrudController,
    handleError,
    HttpResponse,
    sendOperationResponse,
    sendSuccessResponse,
    validateAndParseId
} from "../crud";
import {ApiDB, HTTP_CODES} from "../db";


const API_MESSAGES = (name: string) => ({
    NOT_FOUND: `${name} not found`,
    INVALID_ID: `${name} Invalid ID`,
    UPDATED: `${name} updated successfully`,
    DELETED: `${name} deleted successfully`
});


export class GenericController<Model, ApiDBImplementation extends ApiDB<Model>> implements CrudController {
    _model: ApiDB<Model>
    _name: string;

    constructor( ModelCreator: new () => ApiDBImplementation, name: string) {
        this._model = new ModelCreator();
        this._name = name;
    }

    async readAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const tasks = await this._model.getAll();
            sendSuccessResponse(res, { statusCode: HTTP_CODES.OK, data: tasks });
        } catch (error) {
            handleError(error, next);
        }
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const newTask = await this._model.create( req.body);
            sendSuccessResponse(res, { statusCode: HTTP_CODES.CREATED, data: newTask });
        } catch (error) {
            handleError(error, next);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const validationResult = await this.validateAndExecuteTaskOperation(
                req.params.id,
                async (id) => await this._model.update(id, req.body),
                API_MESSAGES(this._name).UPDATED
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
                async (id) => await this._model.delete(id),
                API_MESSAGES(this._name).DELETED
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
                response: { success: false, error: API_MESSAGES(this._name).INVALID_ID }
            };
        }

        const success = await operation(id);
        if (!success) {
            return {
                statusCode: HTTP_CODES.NOT_FOUND,
                response: { success: false, error: API_MESSAGES(this._name).NOT_FOUND }
            };
        }

        return {
            statusCode: HTTP_CODES.OK,
            response: { success: true, data: { message: successMessage } }
        };
    }
}
