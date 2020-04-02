const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'ovayandah_tours'
})

const identidad = document.getElementById("txt-identidad")
const firstname = document.getElementById("txt-name")
const lastname = document.getElementById("txt-lastname")
const email = document.getElementById("txt-email")
const username = document.getElementById("txt-username")
const password = document.getElementById("txt-password")
const confirmpassword = document.getElementById("txt-confirm-password")
const telphone = document.getElementById("txt-telphone")
const btnResultados = document.getElementById("btn-Login");
const btnConsultar = document.getElementById("btn-Consultar")


conexion.connect(function(error){
    if (error)
    {
        console.log ('No se ha podido establecer conexion con la base de datos');
        console.log (error);
        alert('Fallo de conexion a la base de datos');
        return;
    }
    console.log ('Conexion Exitosa');
});


btnResultados.addEventListener('click', function(e){
    conexion.query(`insert into empleados(username,contra,primer_nombre,primer_apellido,telefono,email,id_posicion,tipo_usuario_id) values('${username.value}','${password.value}','${firstname.value}','${lastname.value}','${telphone.value}','${email.value}',1, 3);`,
    function(err, resultados, campos)
    {
        if (err) throw err;
    });
    console.log("Se agregaron existosamente")
});


btnConsultar.addEventListener('click',function(e){
    conexion.query("select * from empleados", function(err,results,campos){
        if (err) throw error
        // let html = '<tbody>'
        // for (let i of results){
        //     html += `<tr>${i.username}</tr>`
        //     html += `<tr>${i.contra}</tr>`
        //     html += `<tr>${i.primer_nombre}</tr>`
        //     html += `<tr>${i.primer_apellido}</tr>`
        // }
        // html += "</tbody>"
        // document.getElementById('mostrar').innerHTML = html
    })
})




