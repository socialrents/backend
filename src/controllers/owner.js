const client = require('../services/database');

class OwnerController {

  async signup(req, res) {
    const { email, login, password } = req.body;

    console.log({email, login, password})
    try {
      const sql = `insert into owners (email, login, password, nofreservations) values ('${email}', '${login}', '${password}', 0)`;

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
  async getReservations(req, res) {
    const id = req.params.ownerId;
    console.log(id);
    try {
      var sql = `select fk_house as id_house, login_client as client, p.startdate, p.enddate, p.nofpeople, p.description, total 
                from reservations2, parties2 p where id_owner = ${id} and p.id = fk_party`;
      
      const dbRes = await client.query(sql);
      console.log(dbRes);

      return res.status(200).send(dbRes.rows);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send('erro no servidor');
    }
  }
}

module.exports = new OwnerController();