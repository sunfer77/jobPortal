const mysql = require('mysql');

const db = mysql.createConnection({
	host: 'www.db4free.net',
	user: 'suneth_fernando',
	password: 'jobportal',
	database: 'myjobportal',
});

module.exports = db;
