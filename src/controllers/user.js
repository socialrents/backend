const client = require('../services/database');

class UserController {

  async login(req, res) {
    const { login, password } = req.body;
  
    var user = null, sql, dbRes
        console.log(login, password);
    try {
      sql = `select * from owners where login = '${login}' and password = '${password}'`;

      dbRes = await client.query(sql);

      if(dbRes.rowCount > 0) {
        
        user = {
          id: dbRes.rows[0].id,
          email: dbRes.rows[0].email,
          login: dbRes.rows[0].login,
          password: dbRes.rows[0].password,
          type: 'owner'
        }
      } else {  
        sql = `select * from clients where login = '${login}' and password = '${password}'`;

        dbRes = await client.query(sql);
        console.log(dbRes.rowCount);
        if(dbRes.rowCount > 0) {
          
          user = {
            id: dbRes.rows[0].id,
            email: dbRes.rows[0].email,
            login: dbRes.rows[0].login,
            password: dbRes.rows[0].password,
            type: 'client'
          }
        }
      }
      console.log(user);
      if(user === null) {
        return res.status(404).send('usuário não encontrado');
      } else {
        return res.status(200).send({ user });
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  async updateProfile(req, res) {
    const { id, email, login, type } = req.body;
    console.log(id, email, login, type)
    try {
      if(type === 'owner') {
        await client.query(`update owners set email = '${email}', login = '${login}' where id = ${id}`);
      } else if(type === 'client') {
        await client.query(`update clients set email = '${email}', login = '${login}' where id = ${id}`);
      }

      return res.status(200).send('ok');
    } catch (error) {
      console.log(error.message);
      return res.status(500).send('erro');
    }
  }
}

module.exports = new UserController();