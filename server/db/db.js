var mysql = require('mysql2');

var conn = mysql.createConnection({
  host: 'patientpreview01-mysqldbserver.mysql.database.azure.com',
	user: 'sam@patientpreview01-mysqldbserver',
	password: 'Toastya15(',
	database: 'production',
	port: 3306
});

module.exports = conn;