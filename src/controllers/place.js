const client = require('client');

const PlaceController {
	async create(req, res) {
		const {  } = req.body;
		var sql;
		
		try {
			sql = 'insert into places values () ';
			
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

module.exports = new PlaceController();