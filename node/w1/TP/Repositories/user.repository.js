import pool from '../plugins/mysql2/config/db.js';
import bcrypt from 'bcryptjs';

export const add = async ({username, password, firstname, lastname, company_id}) => {
    const salt = await bcrypt.genSalt();

    const result = await pool.query(
      'INSERT INTO user (username, password, firstname, lastname, company_id) VALUES (?, ?, ?, ?, ?)',
      [username, await bcrypt.hash(password, salt), firstname, lastname, company_id]
    );

    return result;
  };

  export const find = async (id) => {

      const [result] = await pool.query(
        `SELECT * FROM user WHERE id='${id}' AND deleted_at IS NULL`
      );

      if (! result)
        return null;
 
      return result[0];
  };

  export const findOneByUsername = async (username) => {

      const [result] = await pool.query(
        `SELECT * FROM user WHERE username='${username}' AND deleted_at IS NULL LIMIT 1`
      );

      if (! result)
        return null;
 
      return result[0];
  };


  export default {
    add: add,
    find: find,
    findOneByUsername: findOneByUsername
  }