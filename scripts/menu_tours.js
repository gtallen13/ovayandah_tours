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
const toursinfo = document.getElementById('tours_info'); //div donde se mostrara la informacion del tour
const toursmenu = document.getElementById('tours_menu'); //div donde se mostrara el menu de tours
const tours_imagen = document.getElementById('caja'); //div donde se mostrara la imagen
let html_menu = '<div class = "lista"><ul>' //para desplegar menu de tours
let html_info = ''; //para desplegar titulo del tour e informacion del tour

//Variables del formulario Modal para poder hacer la reservacion dependiendo del tour
const btnReservar = document.getElementById('Guardar');
const txtFechaInicio = document.getElementById('fecha');
const txtFechaFinal = document.getElementById('fecha2');
const txtPrimerNombre = document.getElementById('txt_primer_nombre');
const txtPrimerApellido = document.getElementById('txt_primer_apellido');
const txtCorreo = document.getElementById('txt_correo');
const txtVerificacionCorreo = document.getElementById('txt_ver_correo');
const telefono = document.getElementById('txt-telefono')
const txtPersonas = document.getElementById('txt_cantidad_personas');


let sql = 'select id, nombre, precio, descripcion from tours' 
let i = 1;
let arr = [1]
//consulta para mostrar el primer tour
conexion.query (sql, 
    function(err, filas, fields){
        if (err) throw err;
        tours_imagen.style.backgroundImage = 'url("./carpeta.css/img/tour1.jpg")';
        html_info += `<h2>${filas[0].nombre}</h2>`
        html_info += `<p>$ ${filas[0].precio}</p>`
        html_info += `<p>${filas[0].descripcion}</p>`
        
        for (let fila of filas)
        {
            html_menu += `<button class = "tablinks" onclick = "cambioTours('click', ${i})"  >${fila.nombre}</a>`;
            i++;
            if (i == 12) {break}
        }
        html_menu += '</div></ul>';
        toursmenu.innerHTML = html_menu;
        toursinfo.innerHTML = html_info;
    });

//utilizada para navegar entre los tours disponibles
function cambioTours(evt, id_tour)
{
    html_info = ''
    let sql = `select * from tours`
    conexion.query (sql, function(err, resultados, campo)
    {
        html_info += `<h2>${resultados[id_tour - 1].nombre}</h2>`
        html_info += `<p>$ ${resultados[id_tour - 1].precio}</p>`
        html_info += `<p>${resultados[id_tour - 1].descripcion}</p>`
        arr.push(id_tour)
        toursinfo.innerHTML = html_info;  
    });
   

    
}

btnReservar.addEventListener('click',function(e){
    e.preventDefault()
    if (txtCorreo.value === txtVerificacionCorreo.value){
        insertarClientes()
        encontrarIdCliente(arr[arr.length - 1])
    } else {
        console.log('Revise bien el correo')
    }
})




function insertarClientes(){
    let sql = 'insert into clientes(email,primer_nombre,primer_apellido,telefono)values(?,?,?,?)'
    conexion.query(sql,[`${txtCorreo.value}`,`${txtPrimerNombre.value}`,`${txtPrimerApellido.value}`,`${telefono.value}`],
    function(err,filas,campos){
        if (err) {console.log('error')} else {
            console.log('Se almacenaron los clientes correctamente')
        }
    })
}

function encontrarIdCliente(tour_id){
    let consultaCliente = 'select id from clientes order by id desc limit 1'
    conexion.query(consultaCliente,function(err,results,campoes){
        if (err) {console.log('Error')} else {
                let consultaId = `select ID,precio from tours where ID = ${tour_id} limit 1`
                conexion.query(consultaId,function(err,filas,campos){
                if (err) {console.log('Error')} else {
                    let consultaReservacion = `insert into reservaciones(fecha_inicio_tour,fecha_final_tour,cantidad_turistas,precio_total,fecha_creacion,id_clientes,tours_id) 
                    values(?,?,?,?,NOW(),?,?);`
                    conexion.query(consultaReservacion,[`${txtFechaInicio.value}`,`${txtFechaFinal.value}`,`${txtPersonas.value}`,`${txtPersonas.value * filas[0].precio}`,`${results[0].id}`,`${filas[0].ID}`],
                    function(err,rows,campos){
                        if (err) {console.log('Error')} else {
                            console.log('se pudo campeon')
                        }
                
                    })
                
                }
            })
        }
    })
}




