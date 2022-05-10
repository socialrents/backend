const client = require('../services/database');

class NotificationController {
    async getAll(req, res) {
        const ownerid = req.params.ownerid
        try {
           var sql = `select fk_house as id_house, fk_party as id_party, id_owner, pInfo.* from notifications
                        inner join
                        (
                            select c.login, p.* from clients as c
                            inner join
                            (
                                select id, startdate, enddate, nofpeople, description, client from parties
                            ) as p on c.id = client
                        ) as pInfo on fk_party = pInfo.id
                        
                        where id_owner = ${ownerid}`
            const dbRes = await client.query(sql);
            console.log(dbRes.rows);
            return res.status(200).send(dbRes.rows); 
        } catch (error) {
            console.log(error.message);
            return res.status(500).send('Erro no servidor');
        }
    }
    async create(req, res) {
        const { id_house, id_party, id_owner } = req.body;
        
        try {
            var sql = `insert into notifications (fk_house, fk_party, id_owner) values (
                ${id_house}, ${id_party}, ${id_owner})`
                
                const dbRes = await client.query(sql);
                console.log(dbRes);
                return res.status(200).send('ok');
        } catch (error) {
            console.log(error.message);
            return res.status(500).send('Erro no servidor');
        }
    }
}

module.exports = new NotificationController();