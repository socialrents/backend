const client = require('../services/database');

class LocationController {
    async getAllCities(req, res) {
        try {
            var sql = 'select city_name as name from cities';

            const dbRes = await client.query(sql);
            console.log(dbRes.rows);
            const cities = dbRes.rows
            return res.status(200).send(cities);
        } catch (error) {
            return res.status(500).send('Erro no servidor');
        }
    }
    async getAllDistricts(req, res) {
        try {
            var sql = `select district_name as name from districts
                        inner join
                        (select * from cities) as c on c.id = fk_city
                        where c.city_name = '${req.params.city}'`
            
            const dbRes = await client.query(sql);
            const districts = dbRes.rows;
            return res.status(200).send(districts);
        } catch (error) {
            return res.status(500).send('Erro no servidor');
        }
    }
}

module.exports = new LocationController();