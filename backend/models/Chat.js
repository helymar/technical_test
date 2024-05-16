import pool from '../db.js';

export class ChatModel {
    constructor(sender, message, type) {
        this.id = null; // autoincrement
        this.sender = sender; // username
        this.message = message;
        this.type = type; // enum('moderator', 'student')
        this.time = new Date();

    }

    static async findBySender(sender) {
        const [rows] = await pool.query('SELECT * FROM chat WHERE sender = ?', [sender]);
        if (!rows) {
            return null;
        }
        return new ChatModel(rows.sender, rows.message, rows.type);
    }

    async save() {
        await pool.query('INSERT INTO chat SET ?', this);
    }

    static async findAll() {
        const rows = await pool.query('SELECT * FROM chat');
        return rows;
    }
}