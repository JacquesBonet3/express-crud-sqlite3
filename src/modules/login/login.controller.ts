import {UserDB} from "./user.db";
import {GenericController} from "../../controller";
import {CrudController} from "../../crud";
import {User} from "./user.type";
import jwt from 'jsonwebtoken';

class LoginController extends GenericController<User, UserDB> implements CrudController {
    constructor() {
        super(UserDB, 'User');
    }

    async login(username: string, password: string): Promise<string | null> {
        const users = await this._model.getAll();
        const user = users.find( user => user.username === username && user.password === password)
        if (!user) {
            return null;
        }
        return jwt.sign(
            {userId: user.id, username: user.username},
            process.env.JWT_SECRET || 'my password',
            {expiresIn: '1h'}
        );
    }
}

export const loginController = new LoginController();