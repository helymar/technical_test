import pool from "./keys.js";
import util from "util";
// You can now use the pool to execute queries
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database: ', err);
        return;
    }
    console.log('Connected to database as ID: ', connection.threadId);
}
);


//promisify pool
pool.query = util.promisify(pool.query);

export default pool;