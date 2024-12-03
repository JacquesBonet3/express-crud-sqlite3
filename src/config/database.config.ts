import sqlite3 from 'sqlite3';
import {Database, open} from 'sqlite';

export const initializeDatabase = async (): Promise<Database> => {
    return await open({
        filename: './tasks.db',
        driver: sqlite3.Database,
    });
};