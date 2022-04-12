const client = require('../services/database');

class UserController {

  async login(req, res) {
    const { login, password } = req.body;
  
    var user = null, sql, dbRes
  
    try {
      sql = `select * from owners where login = '${login}' and password = md5('${password}')`;

      dbRes = await client.query(sql);

      if(dbRes.rowCount > 0) {
        
        user = {
          email: dbRes.rows[0].email,
          login: dbRes.rows[0].login,
          nOfReservations: dbRes.rows[0].nOfReservations,
          type: 'owner'
        }
      } else {  
        sql = `select * from clients where login = '${login}' and password = md5('${password}')`;

        dbRes = await client.query(sql);
        console.log(dbRes.rowCount);
        if(dbRes.rowCount > 0) {
          
          user = {
            email: dbRes.rows[0].email,
            login: dbRes.rows[0].login,
            nOfParties: dbRes.rows[0].nOfParties,
            type: 'client'
          }
        }
      }
      if(user === null) {
        return res.status(404).send('usuário não encontrado');
      } else {
        return res.status(200).send(user);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = new UserController();