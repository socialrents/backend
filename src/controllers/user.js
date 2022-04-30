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
            login: dbRes.rows[0].login,
            password: dbRes.rows[0].password,
            type: 'client'
          }
        }
      }
      if(user === null) {
        return res.status(404).send('usuário não encontrado');
      } else {
        return res.status(200).send({ user });
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = new UserController();