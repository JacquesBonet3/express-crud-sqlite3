import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, Response, NextFunction } from 'express';

export const validateDto = <T extends object>(dtoClass: new () => T) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            if (!isValidRequestBody(req.body)) {
                return sendBadRequest(res, ['Le corps de la requête doit être un objet JSON']);
            }

            const validationErrors = await validateRequestData(dtoClass, req.body);
            
            if (validationErrors.length > 0) {
                return sendBadRequest(res, formatValidationErrors(validationErrors));
            }

            next();
        } catch (error) {
            console.error('Erreur du middleware de validation:', error);
            res.status(500).json({ errors: ['Erreur interne du serveur'] });
        }
    };
};

function isValidRequestBody(body: unknown): body is object {
    return typeof body === 'object' && body !== null;
}

async function validateRequestData<T extends object>(
    dtoClass: new () => T, 
    data: object
): Promise<ValidationError[]> {
    const dtoInstance = plainToInstance(dtoClass, data);
    return validate(dtoInstance);
}

function formatValidationErrors(errors: ValidationError[]): string[] {
    return errors.map(err => 
        `${err.property}: ${Object.values(err.constraints!).join(', ')}`
    );
}

function sendBadRequest(res: Response, errors: string[]): void {
    res.status(400).json({ errors });
}