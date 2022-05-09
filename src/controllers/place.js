const client = require('../services/database');

class PlaceController {
	async create(req, res) {
		const { description, sqrmeters, city, district, owner, price} = req.body;
		console.log(description, sqrmeters, city, district, owner, price)
		try {
			var sql = `insert into houses (description, sqrmeters, city, district, owner, price, reserved) 
					   values ('${description}', '${sqrmeters}', '${city.name}', '${district.name}', '${owner}', '${price}', False)`;
			
			const dbRes = await client.query(sql);
			// console.log(dbRes);
			return res.status(200).send('ok');
		} catch(error) {
			console.log(error.message);
			return res.status(500).send('Erro no servidor');
		}
	}
	async getAll(req, res) {

		console.log(req.params.city);
		const city = req.params.city

		try {
			var sql =  `
					select h.id, h.description, h.sqrmeters, h.city, 
						h.district, o.login as owner, o.id as id_owner, h.price, h.reserved from houses as h
					inner join
					(select id, login from owners) as o on o.id = h.owner
					where h.city = '${city}' and h.reserved is false`;

			const dbRes = await client.query(sql);
			console.log(dbRes.rows);
			return res.status(200).send(dbRes.rows);
		} catch (error) {
			console.log(error.message);
			return res.status(500).send('Erro no servidor');
		}
	}
	async getAllByOwner(req, res) {
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
	async getAllFromDistrict(req, res) {
		const { city, district } = req.params;
		try {
			var sql = `
				select h.id, h.description, h.sqrmeters, h.city, 
					   h.district, o.login as owner, o.id as ownerId, h.price, h.reserved from houses as h
				inner join
				(select id, login from owners) as o on o.id = h.owner
				where h.district = '${district}'`;

			const dbRes = await client.query(sql);
			console.log(dbRes.rows);
			return res.status(200).send(dbRes.rows);
		} catch (error) {
			return res.status(500).send('Erro no servidor');
		}
	}
}

module.exports = new PlaceController();