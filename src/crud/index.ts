import {NextFunction, Request, Response} from "express";

interface ApiResponse<T = void> {
    success: boolean;
    data?: T;
    error?: string;
}

interface CrudController {
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
    readAll(req: Request, res: Response, next: NextFunction): Promise<void>;
    update(req: Request, res: Response, next: NextFunction): Promise<void>;
    delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}

const sendResponse = <T>(res: Response, statusCode: number, response: ApiResponse<T>): void => {
    res.status(statusCode).json(response);
};

const validateAndParseId = (id: string): number | null => {
    const parsedId = parseInt(id, 10);
    return isNaN(parsedId) ? null : parsedId;
};

type HttpResponse<T> = {
    statusCode: number;
    response: ApiResponse<T>;
};


const sendSuccessResponse = <T>(res: Response, { statusCode, data }: { statusCode: number, data: T }): void => {
    sendResponse(res, statusCode, { success: true, data });
}

const sendOperationResponse = (res: Response, { statusCode, response }: HttpResponse<any>): void => {
    sendResponse(res, statusCode, response);
}

const handleError = (error: unknown, next: NextFunction): void => {
    next(error);
}



export {
    ApiResponse,
    CrudController,
    handleError,
    HttpResponse,
    sendOperationResponse,
    sendResponse,
    sendSuccessResponse,
    validateAndParseId,
}