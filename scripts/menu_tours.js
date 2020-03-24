const mysql = require ('mysql');
const conexion = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'toursdb'
});

conexion.connect(function(err)
{
    if (err) throw err;
    console.log ('Conexion Exitosa');
})
const toursinfo = document.getElementById('tours_info');
const toursmenu = document.getElementById('tours_menu');
let html = "<ul>"
let sql = 'select nombre from tours'
conexion.query (sql, 
    function(err, filas, fields){
        if (err) throw err;

        for (let fila of filas)
        {
            html += `<a href = "#">${fila.nombre}</a>`;
        }
        html += '</ul>';
        toursmenu.innerHTML = html;
    });


