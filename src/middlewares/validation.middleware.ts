import {plainToInstance} from "class-transformer";
import {validate} from "class-validator";
import { Request, Response, NextFunction } from 'express';

export const validateDto = <T extends object>(dtoClass: new () => T) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const runValidation = async () => {
            if (typeof req.body !== 'object' || req.body === null) {
                res.status(400).json({ errors: ['Invalid body: must be a JSON object'] });
                return;
            }

            const dtoInstance = plainToInstance(dtoClass, req.body);

            const errors = await validate(dtoInstance);

            if (errors.length > 0) {
                const errorMessages = errors.map(
                    (err) => `${err.property}: ${Object.values(err.constraints!).join(', ')}`
                );
                res.status(400).json({ errors: errorMessages });
                return;
            }

            next();
        };
        runValidation().catch((err) => {
            console.error('Validation middleware error:', err);
            res.status(500).json({ errors: ['Internal Server Error'] });
        });
    };
};