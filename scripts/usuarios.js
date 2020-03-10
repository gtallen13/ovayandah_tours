const mysql = require('mysql');
const conexion = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'JorgeGiron',
    database: 'toursdb'
})



conexion.connect(function(error)
{
    if (error)
    {
        console.log ('No se ha podido establecer conexion con la base de datos');
        console.log (error);
        alert('Fallo de conexion a la base de datos');
        return;
    }
    console.log ('Conexion Exitosa');
});


// const txtUsuario = document.getElementById('txt_usuario');
// const txtContra = document.getElementById('contra');
// const cb
const btnResultados = document.getElementById('btn_resultados');



btnResultados.addEventListener('click', function(err)
{
    //err.preventDefault()
    conexion.query("select * from usuarios", 
    function(err, resultados, campos)
    {
        if (err) throw err;
        console.log (resultados);
    });
});


