const client = require('../services/database');

class PartyController {
	async create(req, res) {
		const { startDate, endDate, nOfDays, nOfPeople, description } = req.body;
		var sql;
		
		try {
			sql = `insert into parties (startdate, enddate, nofdays, nofpeople, description)
					values ('${startDate}', '${endDate}', ${nOfDays}, ${nOfPeople}, '${description}') `;
			
			const dbRes = await client.query(sql);
			console.log(dbRes);
		} catch(error) {
			if(error) {
				console.log(error.message);
				return res.status(500).send('Erro no servidor');
			}
		}
		
		return res.status(200).send('ok');
	}
}

module.exports = new PartyController();