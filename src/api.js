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

app.use('/api', ownerRouter);
app.use('/api', clientRouter);
app.use('/api', userRouter);

app.listen(3000, function () {
  console.log('servidor rodando no endereço: https://localhost:3000');
});