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
  async createReservation(req, res) {
    const { id_party, id_house, id_owner, login_client, total } = req.body;
    console.log(id_party, id_house, id_owner, login_client, total);
    try {
      const sql = `insert into reservations2 (fk_party, fk_house, id_owner, login_client, total) 
                    values (${id_party}, ${id_house}, ${id_owner}, '${login_client}', '${total}')`;
      await client.query(sql);
      return res.status(200).send('ok');
    } catch (error) {
      console.log(error.message)
      return res.status(500).send('Erro');
    }
  }
}

module.exports = new ClientController();