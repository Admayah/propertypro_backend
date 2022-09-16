import { pool } from '../models/pool.js';
import { createAgentTable, createPropertyTable } from "./queries"

export const executeQueryArray = async arr => new Promise(resolve => {
  const stop = arr.length;
  arr.forEach(async (q, index) => {
    await pool.query(q);
    if (index + 1 === stop) resolve();
  });
});

export const createAgentTables = () => executeQueryArray([ createAgentTable ]);

export const createPropertyTables = () => executeQueryArray([ createPropertyTable ]);
