const client = require('../services/database');

class PlaceController {
	async create(req, res) {
		const { description, sqrmeters, city, district, owner, price } = req.body;
		console.log(description, sqrmeters, city, district, owner, price)
		try {
			var sql = `insert into houses (description, sqrmeters, city, district, owner, price) 
					   values ('${description}', '${sqrmeters}', '${city}', '${district}', '${owner}', '${price}')`;
			
			const dbRes = await client.query(sql);
			// console.log(dbRes);
			return res.status(200).send('ok');
		} catch(error) {
			console.log(error.message);
			return res.status(500).send('Erro no servidor');
		}
	}
	async getAll(req, res) {
		const city = req.params.city;

		try {
			var sql = `select * from houses where city = '${city}'`;

			const dbRes = await client.query(sql);
			// console.log(dbRes.rows);
			return res.status(200).send(dbRes.rows);
		} catch (error) {
			console.log(error.message);
			return res.status(500).send('Erro no servidor');
		}
	}
}

module.exports = new PlaceController();