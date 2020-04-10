const mysql = require('mysql');
const conexion = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'tours_personal'
});

conexion.connect(function (err) {
    if (err) throw err;
    console.log('Conexion Exitosa');
})