const client = require('../services/database');

class ClientController {

  async signup(req, res) {
    const { email, login, password } = req.body;

    try {
      const sql = `insert into clients (email, login, password, nofparties) values ('${email}', '${login}', '${password}', 0)`;

      const dbRes = await client.query(sql);
      console.log(dbRes);

      return res.status(200).send('ok');
    } catch (error) {
      if (error.code === '23505') {
        return res.status(422).send('Usuário já cadastrado!');
      }
      console.log(error);
    }
  }
}

module.exports = new ClientController();