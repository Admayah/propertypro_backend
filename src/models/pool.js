import { Pool } from 'pg';
import dotenv from 'dotenv';
// import { CONNECTION_STRING } from '../settings';

dotenv.config();

// export const pool = new Pool({ databaseURL: process.env.CONNECTION_STRING });

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

//  export const pool = new Pool({
//     connectionString:`${CONNECTION_STRING}?sslmode=no-verify`,
//     ssl: process.env.CONNECTION_STRING ? true : false
// });

export const pool = (() => {
  if (process.env.NODE_ENV !== 'production') {
      return new Pool({
          connectionString: process.env.CONNECTION_STRING,
          ssl: false
      });
  } else {
      return new Pool({
          connectionString: `${process.env.CONNECTION_STRING}?sslmode=no-verify`,
          ssl: {
              rejectUnauthorized: false
            }
      });
  } })();