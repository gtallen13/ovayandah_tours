const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'toursdb'
})

const identidad = document.getElementById("txt-identidad")
const firstname = document.getElementById("txt-name")
const lastname = document.getElementById("txt-lastname")
const email = document.getElementById("txt-email")
const username = document.getElementById("txt-username")
const password = document.getElementById("txt-password")
const confirmpassword = document.getElementById("txt-confirm-password")
const telphone = document.getElementById("txt-telphone")


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



const btnResultados = document.getElementById("btn-Login");

btnResultados.addEventListener('click', function(err)

{
    conexion.query(`insert into clientes(username,email,contra,primer_nombre,primer_apellido,telefono,tipo_usuario_id) values('${username.value}','${email.value}','${password.value}','${firstname.value}','${lastname.value}','${telphone.value}', 3);`,
    function(err, resultados, campos)
    {
        if (err) throw err;
    });
    
});


