## Run following commands:

```
1. npm install<br>
2. npm run build<br>
3. npm run server<br>

```
## Frontend
* And, go to localhost 4000
* patient account => id: tempus pwd: 123
* doctor account => id: jae pwd: 321

## Backend

* A local PSQL DB was created to persist data for patient and doctor:

##Table Commands

```
patient table
username | password | name | age | email | address | phone_number


doctor table
username | password

Quick Commands to Create Above Tables:

  create table patient(
    username varchar(50) not null,
    password varchar(50) not null,
    name varchar(50) not null,
    age int not null,
    email varchar(50) not null,
    address varchar(50) not null,
    phone_number varchar(50) not null
    );

  create table doctor(
    username varchar(50) not null,
    password varchar(50) not null
    );



