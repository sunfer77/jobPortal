const mysql = require('mysql');

// const db = mysql.createConnection({
// 	host: process.env.HOST,
// 	user: process.env.USER,
// 	password: process.env.PASSWORD,
// 	database: process.env.DATABASE,
// });

const db = mysql.createPool({
	connectionLimit: 100,
	host: 'www.db4free.net',
	user: 'suneth_fernando',
	password: 'jobportal',
	database: 'myjobportal',
});

module.exports = db;
