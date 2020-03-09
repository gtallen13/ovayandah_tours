const mysql = require('mysql');
const conexion = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
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
const btnReservar = document.getElementById ('btn_reservar');
// const btnAgregar = document.getElementById('btn_agregar');


// btnResultados.addEventListener('click', function(err)
// {
//     //err.preventDefault()
//     conexion.query("select * from usuarios", 
//     function(err, resultados, campos)
//     {
//         if (err) throw err;
//         console.log (resultados);
//     });
// });

let txtUsuario = 'gtallen'
let txtContra = 'password123'
btnResultados.addEventListener('click', function(err)
{
    let sql = `insert into clientes(username, email, contra, primer_nombre, primer_apellido, telefono, tipo_usuario_id) values('${txtUsuario}', 'ejempllo@gmail.com', '${txtContra}', 'Thomas', 'Allen', '9988-1234', 3)`;
    conexion.query(sql, function(err, resultados,campos)
    {
        if (err) throw err;
        console.log ('1 campo ha sido insertado');
        console.log (resultados)
    })
});

// Get the modal
var modal = document.getElementById("myModal");


//Agregando los usuarios (listo)
// btnResultados.addEventListener('click', function(err)
// {
//     let sql = `insert into clientes(username, email, contra, primer_nombre, primer_apellido, telefono, tipo_usuario_id) values('${txtUsuario}', 'ejempllo@gmail.com', '${txtContra}', 'Thomas', 'Allen', '9988-1234', 3)`;
//     conexion.query(sql, function(err, resultados,campos)
//     {
//         if (err) throw err;
//         console.log ('1 campo ha sido insertado');
//         console.log (resultados)
//     })
// });

//reservar tours

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
