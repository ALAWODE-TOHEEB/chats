const mysql = require("mysql"); // create instance of mysql
require('dotenv').config();


const dbConfig = mysql.createConnection({
    host: process.env.DB_HOST, // use localhost
    port: 3308, // use the correct port
    user: process.env.DB_USER, // your username
    password: "",
    database: process.env.DB_DATABASE, // your database
  });
module.exports = dbConfig;


