const client = require('../services/database');

class PlaceController {
	async create(req, res) {
		const { description, sqrmeters, city, district, owner, price} = req.body;
		console.log(description, sqrmeters, city, district, owner, price)
		try {
			var sql = `insert into houses (description, sqrmeters, city, district, owner, price, reserved) 
					   values ('${description}', '${sqrmeters}', '${city}', '${district}', '${owner}', '${price}', False)`;
			
			const dbRes = await client.query(sql);
			// console.log(dbRes);
			return res.status(200).send('ok');
		} catch(error) {
			console.log(error.message);
			return res.status(500).send('Erro no servidor');
		}
	}
	async getAllByCity(req, res) {
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
	async getAll(req, res) {
		const ownerid = req.params.ownerid;
		try {
			var sql = `select * from houses where owner = ${ownerid}`;
			const dbRes = await client.query(sql);
			return res.status(200).send(dbRes.rows);
		} catch (error) {
			return res.status(500).send('Erro no servidor');
		}
	}
	async deletePlace(req, res) {
		const id = req.params.id;

		try {
			var sql = `delete from houses where id = ${id}`;

			const dbRes = await client.query(sql);
			return res.status(200).send(dbRes.rows);
		} catch (error) {
			return res.status(500).send('Erro no servidor')
		}
	}
}

module.exports = new PlaceController();