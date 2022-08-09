import { Pool, Client } from 'pg';
import dotenv from 'dotenv';
import { connectionString } from '../settings';

dotenv.config();

// export const pool = new Pool({ connectionString });

// const client = new Client({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false
//     }
// });

// client.connect();

// client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//     if (err) throw err;
//     for (let row of res.rows) {
//       console.log(JSON.stringify(row));
//     }
//     client.end();
//   });

 export const pool = new Pool({
    connectionString:`${DATABASE_URL}?sslmode=no-verify`,
    ssl: {
      rejectUnauthorized: false,
    }
});