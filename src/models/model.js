import { pool } from './pool';

class Model {
  constructor(table) {
    this.pool = pool;
    this.table = table;
    this.pool.on('error', (err, client) => `Error, ${err}, on idle client${client}`);
  }

  async select(columns, clause) {
    let query = `SELECT ${columns} FROM ${this.table}`;

    if (clause) query += clause;
    return this.pool.query(query);
  }

  // async check(columns, limit, offset, clause) {
  //   let query = `SELECT ${columns} FROM ${this.table} LIMIT ${limit} OFFSET ${offset}`; 
  //   if(clause) query+= clause
  //   return this.pool.query(query)
  // }

  async insertWithReturn(columns, values) {
    const query = `
          INSERT INTO ${this.table}(${columns})
          VALUES (${values})
          RETURNING id, ${columns}
      `;
    return this.pool.query(query);
  }

  async update(column, clause) {
    const keys = Object.keys(column);
    keys.forEach((key) => {
      const query = `UPDATE  ${this.table} 
      SET ${key} = '${column[key]}' ${clause}
      `;
      return this.pool.query(query);
    });
  }

  async delete(clause) {
    let query = `DELETE FROM ${this.table}`;
    if (clause) query += clause;
    return this.pool.query(query);
  }
}

export default Model;
