
const client = require('./services/database');

async function createAllTables() {

  console.log('creating all tables...');
  await client.query(`
  create table if not exists owners (
    id serial not null unique,
    email varchar(50) unique not null,
    login varchar(20) primary key not null,
    password varchar(50) not null,
    nOfReservations integer
  );
  create table if not exists clients (
    id serial not null unique,
    email varchar(50) unique not null,
    login varchar(20) primary key not null,
    password varchar(50) not null,
    nOfParties integer
  );
  create table if not exists houses (
    id serial not null primary key,
    description varchar(200) not null,
    sqrMeters float,
    city varchar(30) not null,
    district varchar(30) not null,
    owner integer references owners (id)
  );
  create table if not exists parties (
    id serial not null primary key,
    startDate date not null,
    endDate date not null,
    nOfDays integer,
    nOfPeople integer,
    city varchar(30) not null,
    client integer references clients (id)
  );
  create table reservations (
    id serial primary key,
    fk_party integer references parties(id),
    fk_house integer references houses(id),
    total money
  );
  create table notifications (
    id serial primary key,
    fk_house integer references houses(id),
    fk_party integer references parties(id),
    id_owner integer
  );`);

  console.log('Ok.');
  
  await client.end()
}

createAllTables();