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
const placeRouter = require('./routers/place');
const locationRouter = require('./routers/location');
const notificationRouter = require('./routers/notification');

app.use('/api', ownerRouter);
app.use('/api', clientRouter);
app.use('/api', userRouter);
app.use('/api', partyRouter);
app.use('/api', placeRouter);
app.use('/api', locationRouter);
app.use('/api', notificationRouter);

app.listen(3000, function () {
  console.log('servidor rodando no endereço: https://localhost:3000');
});