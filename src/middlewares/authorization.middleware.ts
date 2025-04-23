import {Request, Response, NextFunction} from 'express';
import {expressjwt, UnauthorizedError} from 'express-jwt';

const JWT_SECRET = process.env.JWT_SECRET ?? 'my password';

export const authMiddleware = expressjwt({
    secret: JWT_SECRET,
    algorithms: ['HS256']
});

export const authErrorMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (err instanceof UnauthorizedError) {
        res.status(401).json({
            status: 'error',
            code: err.code,
            message: err.message
        });
        return;
    }
    next(err);
};

declare global {
    namespace Express {
        interface Request {
            auth?: {
                userId: number;
                iat: number;
                exp: number;
            }
        }
    }
}
