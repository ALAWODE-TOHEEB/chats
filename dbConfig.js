const mysql = require("mysql"); // create instance of mysql
const mysql2 = require("mysql2"); // create instance of mysql
require('dotenv').config();


// const dbConfig = mysql2.createConnection({
//     host: sql11.freemysqlhosting.net, // use localhost
//     port: 3306, // use the correct port
//     user: sql11651935, // your username
//     password: "p8axRRJAIH",
//   });
//   database: process.env.DB_DATABASE, // your database
// module.exports = dbConfig;


const dbConfig = mysql2.createConnection({
  host: "sql11.freemysqlhosting.net",
  user: "sql11651935",
  password: "p8axRRJAIH",
      database: 'sql11651935', //  Replace 'test' with the name of your database
    connectionLimit: 100,
    multipleStatements:true,
});


module.exports = dbConfig;

// const dbConfig = mysql.createConnection({
//   host: process.env.DB_HOST, // use localhost
//   port: 3308, // use the correct port
//   user: process.env.DB_USER, // your username
//   password: "",
//   database: process.env.DB_DATABASE, // your database
// });
// module.exports = dbConfig;


