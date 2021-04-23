const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'jobPortal',
});

module.exports = db;
