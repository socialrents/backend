
const client = require('../services/database');

class OwnerController {

  async login(req, res) {
    const { login, password } = req.body;

    try {
      const sql = `select * from owners where login = '${login}' and password = md5('${password}')`;

      const dbRes = await client.query(sql);
      console.log(dbRes);

      if(dbRes.rowCount > 0) {
        
        const owner = {
          email: dbRes.rows[0].email,
          login: dbRes.rows[0].login,
          nOfReservations: dbRes.rows[0].nOfReservations
        }

        return res.status(200).send(owner);
      } else {  
        return res.status(404).send('Usuário não encontrado!');
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async signup(req, res) {
    const { email, login, password } = req.body;

    try {
      const sql = `insert into owners values ('${email}', '${login}', md5('${password}'), 0)`;

      const dbRes = await client.query(sql);
      console.log(dbRes);

    } catch (error) {
      if (error.code === '23505') {
        return res.status(422).send('Usuário já cadastrado!');
      }
    }

    return res.status(200).send('ok');
  }
}

module.exports = new OwnerController();