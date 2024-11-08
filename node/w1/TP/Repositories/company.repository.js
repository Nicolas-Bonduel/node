import pool from '../plugins/mysql2/config/db.js';

  export const all = async () => {

    const [result] = await pool.query(
      `SELECT * FROM company WHERE deleted_at IS NULL`
    );

    return result;
  };

  export const add = async (name) => {

    const result = await pool.query(
      'INSERT INTO company (name, type) VALUES (?, ?)',
      [name, 'child']
    );

    return result;
  };

  export const find = async (id) => {

      const [result] = await pool.query(
        `SELECT * FROM company WHERE id='${id}' AND deleted_at IS NULL`
      );

      if (! result)
        return null;
 
      return result[0];
  };

  export const findOneBy = async (clause) => {

      const [result] = await pool.query(
        `SELECT * FROM company WHERE ${clause} AND deleted_at IS NULL LIMIT 1`
      );

      if (! result)
        return null;
 
      return result[0];
  };

  export const edit = async ( id, map ) => {
    map.updated_at = new Date();
    const columns = Object.keys(map);
    const values = Object.values(map);

    const result = await pool.query(
      `UPDATE company SET ${columns.join(" = ? ,")} = ? WHERE id = ${id}`,
      values
    );

    return result;
};


  export default {
    all, all,
    add: add,
    find: find,
    findOneBy: findOneBy,
    edit: edit
  }