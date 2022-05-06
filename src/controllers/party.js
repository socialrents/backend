const client = require('../services/database');

class PartyController {

	async create(req, res) {
		const { startDate, endDate, nOfDays, nOfPeople, city, description, clientKey } = req.body;
		
		console.log(req.body);
		try {
			var sql = `insert into parties (startdate, enddate, nofdays, nofpeople, city, client, description)
					values ('${startDate}', '${endDate}', ${nOfDays}, ${nOfPeople}, '${city}', ${clientKey}, '${description}') `;
				
			const dbRes = await client.query(sql);
			console.log(dbRes);
			return res.status(200).send('ok');
		} catch(error) {
			console.log(error.message);
			return res.status(500).send('Erro no servidor');
		}
	}
	async getAll(req, res) {
		const clientKey = req.params.clientID;

		try {
			var sql = `select * from parties where client = ${clientKey}`;

			const dbRes = await client.query(sql);
			console.log(dbRes);
			return res.status(200).send(dbRes.rows);
		} catch (error) {
			console.log(error.message);
			return res.status(500).send('Erro no servidor');
		}
	}
	async deleteParty(req, res) {
		const id = req.params.id

		try {
			var sql = `delete from parties where id = ${id}`;
			const dbRes = await client.query(sql);
			return res.status(200).send('ok');
		} catch (error) {
			return res.status(500).send('Erro no servidor');
		}
	}
}

module.exports = new PartyController();