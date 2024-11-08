import pool from '../plugins/mysql2/config/db.js';

  export const all = async () => {

    const [result] = await pool.query(
      `SELECT * FROM menu WHERE deleted_at IS NULL`
    );

    return result;
  };

  export const add = async ({name, content = '[]', company_id}) => {

    const result = await pool.query(
      'INSERT INTO menu (name, content, company_id) VALUES (?, ?, ?)',
      [name, content, company_id]
    );

    return result;
  };

  export const find = async (id) => {

      const [result] = await pool.query(
        `SELECT * FROM menu WHERE id='${id}' AND deleted_at IS NULL`
      );

      if (! result)
        return null;
 
      return result[0];
  };

  export const findOneBy = async (clause) => {

      const [result] = await pool.query(
        `SELECT * FROM menu WHERE ${clause} AND deleted_at IS NULL LIMIT 1`
      );

      if (! result)
        return null;
 
      return result[0];
  };

  export const findByCompany = async (company_id) => {

      const [result] = await pool.query(
        `SELECT * FROM menu WHERE company_id='${company_id}' AND deleted_at IS NULL`
      );

      if (! result)
        return null;
 
      return result;
  };

  export const edit = async ( id, map ) => {
    map.updated_at = new Date();
    const columns = Object.keys(map);
    const values = Object.values(map);

    const result = await pool.query(
      `UPDATE menu SET ${columns.join(" = ? ,")} = ? WHERE id = ${id}`,
      values
    );

    return result;
  };

  export default {
    all: all,
    add: add,
    find: find,
    findOneBy: findOneBy,
    findByCompany: findByCompany,
    edit: edit
  }