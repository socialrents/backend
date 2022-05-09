const client = require('../services/database');

class PartyController {

	async create(req, res) {
		const { startDate, endDate, nOfDays, nOfPeople, city, description, clientKey } = req.body;
		
		console.log(req.body);
		try {
			var sql = `insert into parties (startdate, enddate, nofdays, nofpeople, city, client, description)
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
							select p.*, r.* from parties as p
							inner join
							(
								select fk_party, fk_house, total from reservations) as r
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
			var sql = `delete from reservations where fk_party = ${id}` 
			await client.query(sql);
			sql = `delete from parties where id = ${id}`;
			await client.query(sql);

			return res.status(200).send('ok');
		} catch (error) {
			return res.status(500).send('Erro no servidor');
		}
	}
	async getLastId(req, res) {
		try {
			var sql = 'select MAX(id) as id_party from parties'

			const dbRes = await client.query(sql);
			const partyId = dbRes.rows[0].id_party;
			console.log('id party: ' + partyId);

			return res.status(200).send({ partyId });
		} catch (error) {
			return res.status(500).send('Erro no servidor');
		}
	}
}

module.exports = new PartyController();