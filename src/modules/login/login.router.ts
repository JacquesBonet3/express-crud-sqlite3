import express, {Router} from 'express';
import {loginController} from './login.controller';

class LoginRouter {
    public static basePath = '/login';
    public static router: Router = express.Router();

    static {
        this.router.post('/', async (req, res, next) => {
            try {
                const result = await loginController.login(req.body.username, req.body.password);
                res.json(result);
            } catch (error) {
                next(error);
            }
        });
    }
}

export {
    LoginRouter
};
