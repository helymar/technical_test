import pool from '../db.js';

export class UserModel {
    constructor(username, password, name, type) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.type = type; // enum('moderator', 'student')

    }
    
    static async findByUsername(username) {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (!rows) {
            return null;
        }
        return new UserModel(rows.username, rows.password, rows.names, rows.type);
    }

    async save() {
        await pool.query('INSERT INTO users SET ?', this);
    }

    async update(update) {
        await pool.query('UPDATE users SET ? WHERE username = ?', [update, this.username]);
    }

    async delete() {
        await pool.query('DELETE FROM users WHERE username = ?', [this.username]);
    }
}