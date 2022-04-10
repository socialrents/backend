
const client = require('./services/database');


async function createAllTables() {
  await client.connect();

  console.log('creating all tables...');
  await client.query(`create table if not exists owners (
    email varchar(50) unique not null,
    login varchar(20) primary key not null,
    password varchar(50) not null,
    nOfReservations integer
  );
  create table if not exists clients (
    email varchar(50) unique not null,
    login varchar(20) primary key not null,
    password varchar(50) not null,
    nOfParties integer
  );
  create table if not exists houses (
    id integer not null primary key,
    description varchar(200) not null,
    sqrMeters float,
    city varchar(30) not null,
    district varchar(30) not null
  );
  create table if not exists parties (
    id integer not null primary key,
    startDate date not null,
    endDate date not null,
    nOfDays integer,
    nOfPeople integer,
    city varchar(30) not null
  );
  `);
  console.log('Ok.');
  
  await client.end()
}

createAllTables();