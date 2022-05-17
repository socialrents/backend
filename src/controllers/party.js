const client = require('../services/database');

class PartyController {

	async create(req, res) {
		const { startDate, endDate, nOfDays, nOfPeople, city, description, clientKey } = req.body;
		
		console.log(req.body);
		try {
			var sql = `insert into parties2 (startdate, enddate, nofdays, nofpeople, city, client, description)
					values ('${startDate}', '${endDate}', ${nOfDays}, ${nOfPeople}, '${city}', ${clientKey}, '${description}') `;
				
			const dbRes = await client.query(sql);
			// console.log(dbRes);
			return res.status(200).send('ok');
		} catch(error) {
			console.log(error.message);
			return res.status(500).send('Erro no servidor');
		}
	}
	async getAll(req, res) {
		const clientKey = req.params.clientID;

		try {

			var sql = `select pr.*, h.district from houses as h
						inner join
						(
							select p.*, r.* from parties2 as p
							inner join
							(
								select fk_party, fk_house, total from reservations2) as r
								on r.fk_party = p.id
						) as pr on pr.fk_house = h.id
						where pr.client = ${clientKey}`

			const dbRes = await client.query(sql);
			// console.log(dbRes);
			return res.status(200).send(dbRes.rows);
		} catch (error) {
			console.log(error.message);
			return res.status(500).send('Erro no servidor');
		}
	}
	async deleteParty(req, res) {
		const id = req.params.id

		try {
			var sql = `delete from reservations2 where fk_party = ${id}` 
			await client.query(sql);
			sql = `delete from notifications2 where fk_party = ${id}`
			await client.query(sql)
			sql = `delete from parties2 where id = ${id}`;
			await client.query(sql);

			return res.status(200).send('ok');
		} catch (error) {
			console.log(error.message);
			return res.status(500).send('Erro no servidor');
		}
	}
	async getLastId(req, res) {
		try {
			var sql = 'select MAX(id) as id_party from parties2'

			const dbRes = await client.query(sql);
			const partyId = dbRes.rows[0].id_party;
			console.log('id party: ' + partyId);

			return res.status(200).send({ partyId });
		} catch (error) {
			return res.status(500).send('Erro no servidor');
		}
	}
	async accept(req, res) {
		const { id_notif, id_party, id_house, login, id_owner } = req.body;
		console.log( req.body);
		try {
			await client.query(`update parties2 set status = 'confirmed' where id = ${id_party}`);
			await client.query(`update houses set reserved = true where id = ${id_house}`);
			await client.query(`insert into reservations2 (fk_party, fk_house, id_owner, login_client) 
			values (${id_party}, ${id_house}, ${id_owner}, '${login}')`)
			await client.query(`delete from notifications2 where id = ${id_notif}`);
			return res.status(200).send('ok');
		} catch (error) {
			console.log(error.message);
			return res.status(500).send('Erro');
		}
	}
	async deny(req, res) {
		const { id_notif, id_party } = req.params;
		console.log( id_notif, id_party);
		try {
			await client.query(`update parties2 set status = 'denied' where id = ${id_party}`);
			await client.query(`delete from notifications2 where id = ${id_notif}`);
			return res.status(200).send('ok');
		} catch (error) {
			console.log(error.message);
			return res.status(500).send('Erro');
		}
	}
}

module.exports = new PartyController();