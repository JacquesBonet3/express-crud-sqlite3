import sqlite3 from 'sqlite3';
import {Database, open} from 'sqlite';

interface ApiDB<Model> {
    create(task: Omit<Model, 'id'>): Promise<Model>;
    getAll(): Promise<Model[]>;
    update(id: number, updates: Partial<Omit<Model, 'id'>>): Promise<boolean>;
    delete(id: number): Promise<boolean>;
}

const initializeDatabase = async (): Promise<Database> => {
    return await open({
        filename: './tasks.db',
        driver: sqlite3.Database,
    });
};

const withDatabase = async <T>(operation: (db: Database) => Promise<T>): Promise<T> => {
    const db = await initializeDatabase();
    try {
        return await operation(db);
    } finally {
        await db.close();
    }
}

const HTTP_CODES = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404
} as const;

export {
    ApiDB,
    HTTP_CODES,
    withDatabase,
}