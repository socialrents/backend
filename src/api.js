const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:8080'
}));

app.use(express.urlencoded({extended : true}));
app.use(express.json());

const ownerRouter = require('./routers/owner');
const clientRouter = require('./routers/client');
const userRouter = require('./routers/user');
const partyRouter = require('./routers/party');

app.use('/api', ownerRouter);
app.use('/api', clientRouter);
app.use('/api', userRouter);
app.use('/api', partyRouter);

app.listen(3000, function () {
  console.log('servidor rodando no endereço: https://localhost:3000');
});