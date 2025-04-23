import { User } from "./user.type";
import { ApiDB, withDatabase } from "../../db";

const SQL_QUERIES = {
    GET_ALL: 'SELECT * FROM users',
    INSERT: 'INSERT INTO users (username, password) VALUES (?, ?)',
    UPDATE: `
        UPDATE users 
        SET username = COALESCE(?, username), 
            password = COALESCE(?, password) 
        WHERE id = ?`,
    DELETE: 'DELETE FROM users WHERE id = ?'
} as const;

class UserDB implements ApiDB<User> {

    async getAll(): Promise<User[]> {
        return withDatabase(db => db.all<User[]>(SQL_QUERIES.GET_ALL));
    }

    async create(User: Omit<User, 'id'>): Promise<User> {
        return withDatabase(async db => {
            const result = await db.run(SQL_QUERIES.INSERT, [
                User.username,
                User.password
            ]);
            return {
                id: result.lastID!,
                ...User
            };
        });
    }

    async update(id: number, updates: Partial<Omit<User, 'id'>>): Promise<boolean> {
        return withDatabase(async db => {
            const result = await db.run(SQL_QUERIES.UPDATE, [
                updates.password,
                id
            ]);
            return result.changes! > 0;
        });
    }

    async delete(id: number): Promise<boolean> {
        return withDatabase(async db => {
            const result = await db.run(SQL_QUERIES.DELETE, [id]);
            return (result.changes ?? 0) > 0;
        });
    }
}


export {
    UserDB
}