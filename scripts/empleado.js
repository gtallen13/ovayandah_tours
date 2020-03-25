
const mysql = require('mysql')
import Chart from 'chart.js';
const conexion = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'toursdb'
})

conexion.connect(function(err){
    if (err){
        console.log('Error con la conexion de base de datos')

    } else {
        console.log('Conexion Existosa')
    }
})

let consulta1 = 'SELECT e.id,e.primer_nombre,e.primer_apellido,sum(timediff(r.fecha_final_tour,r.fecha_inicio_tour)) as horas_trabajadas FROM toursdb.reservaciones as r inner join toursdb.empleados_reservaciones AS er ON r.id=er.reservacion_id inner join toursdb.empleados as e on er.empleados_id=e.id where r.fecha_inicio_tour between concat(YEAR(NOW()),?,MONTH(NOW()),?) and curdate() group by e.id order by sum(timediff(r.fecha_final_tour,r.fecha_inicio_tour)) desc'
conexion.query(consulta1,['-','-01'],function(err,filas,campos){
    let cont = 0
    if (err){

    }else {
        for (let fila of filas){
            cont = cont + 1
            document.getElementById(`emp${cont}`).innerHTML += `<p>${fila.primer_nombre} ${fila.primer_apellido}</p><p>Empleado</p><p>${cont}-Mejor Empleado del mes</p>`
        }
    }
})



//Conexion Para login Empleado
const username = document.getElementById('username')
const password = document.getElementById('password')
const btnLogin = document.getElementById('btn-guardar')


// btnLogin.addEventListener('click', function(e){
//     e.preventDefault()
//     let consulta = `select username,contra from empleados where username = ? and contra = ?`
//     conexion.query(consulta,[`${username.value}`,`${password.value}`],function(err,filas,campos){
//         if (err){
//             console.log('Contraseña Invalida')
//         } else {
//             for (let fila of filas){
//                 if (fila.username === username.value & fila.contra == password.value){
//                     console.log('Usuario correcto')
                    
//                 } else{
//                     console.log('Contraseña Invalida o Usuario Incorrecto')
//                 }
//             }
            
//         }
//     })
// })

//Cambiar de pagina
const enlaces = document.getElementsByClassName('item-menu')
        for (let i = 0; i < enlaces.length; i++) {
            enlaces[i].addEventListener('click', function(e) {
                e.preventDefault();
                const idElemento = e.currentTarget.getAttribute('data-elemento');
                console.log(idElemento);
                const paginas = document.getElementsByClassName('pagina');
                for (let j = 0; j < paginas.length; j++) {
                    paginas[j].classList.add('esconder')
                }
                document.getElementById(idElemento).classList.remove('esconder');
            })
            
        }

//Buscar boleta
// const txtBusqueda = document.getElementById('btn-guardar') 
// txtBusqueda.addEventListener('keyup',function(e) {
//     if (e.code === 'Enter'){
//         conexion.query(`Select * from film where title like ? or description like ?`,[`%${txtBusqueda.value}%`,`%${txtBusqueda.value}%`],function(err,results,campos) {
//             if (err) {
//                 console.log(`Error`)

//                 return
//             }
//             let html ='<table class="tabla-datos">'
//             html += '<tr><td>Titulo</td><td>Descripcion</td></tr>'
//             for (let fila of results) {
//                 html += "<tr>"
//                 html += `<th>${fila.title}</th>`
//                 html += `<td>${fila.description}</td>`
//                 html += "</tr>"
//             }
//             html += '</table>'
//             document.getElementById('tabla').innerHTML = html
//         })
//     }
// })

//Aparecer las boletas con el boton

const btnVer = document.getElementById('btn-ver')
let cont = 0
btnVer.addEventListener('click',function(e){
    e.preventDefault()
    let consulta = 'SELECT r.id As id_reserva,r.fecha_inicio_tour,e.primer_nombre,e.primer_apellido,t.nombre FROM reservaciones as r inner join empleados_reservaciones AS er ON r.id=er.reservacion_id inner join empleados as e on er.empleados_id=e.id inner join tours as t on r.tours_id=t.id where e.username = ? and r.fecha_inicio_tour >= CURDATE() order by r.fecha_inicio_tour asc limit 10'
    conexion.query(consulta,['gustavoo23'],function(err,filas,campos){
        for (let fila of filas){
            cont = cont + 1
            document.getElementById('boleta1').innerHTML += `<input type="button" value="${fila.primer_nombre} ${fila.primer_apellido}/${fila.nombre}" id=${fila.id_reserva} class="item">`
        }
        document.getElementById('btn-ver').style.display = 'none'
        const enlaces = document.getElementsByClassName('item')
    for (let i = 0; i < enlaces.length; i++) {
        enlaces[i].addEventListener('click', function(e) {
        e.preventDefault();
        console.log('hola')
        const idElemento = e.currentTarget.getAttribute('id');
        let sql = `SELECT r.id,r.fecha_inicio_tour,fecha_final_tour,e.primer_nombre,e.primer_apellido,t.nombre,c.primer_nombre as Nombre_Cliente,c.primer_apellido as Apellido_Cliente,u.nombre, r.cantidad_turistas,group_concat(u.nombre) as Ubicaciones FROM toursdb.reservaciones as r
        inner join toursdb.empleados_reservaciones AS er ON r.id=er.reservacion_id
        inner join toursdb.empleados as e on er.empleados_id=e.id
        inner join tours as t on r.tours_id=t.id
        inner join clientes as c on r.id_clientes = c.id
        inner join tours_ubicaciones as tu on t.id=tu.id_tours
        inner join ubicaciones  as u on tu.id_ubicaciones=u.id
        where r.id =${idElemento} and r.fecha_inicio_tour >= CURDATE()
        group by r.id order by r.fecha_inicio_tour asc limit 10;
 `
        conexion.query(sql,function(err,filas,campoes){
            if (err){
                console.log('error')
            } else {
                let html = '<table>'
                for(let row of filas){
                    html += `<tr><th>Fecha de Inicio</th></tr><tr><td>${row.fecha_inicio_tour}</td></tr>`
                    html += `<tr><th>Fecha final</th></tr><tr><td>${row.fecha_final_tour}</td></tr>`
                    html += `<tr><th>Cantidad de personas</th></tr><tr><td>${row.cantidad_turistas}</td></tr>`
                    html += `<tr><th>Ubicaciones</th></tr><tr><td>${row.Ubicaciones}</td></tr>`
                    html += `<tr><th>Nombre Del Cliente</th></tr><tr><td>${row.Nombre_Cliente} ${row.Apellido_Cliente}</td></tr>`
                }
                html += '</table>'
                document.getElementById('tabla-info').innerHTML = html
            }
            
        })
        console.log(idElemento);
        })
    }
        
    })
})

// Tabla de horas trabajadas por meses

var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    type: 'doughnut',
    data:{
	datasets: [{
		data: [60,18,10, 8, 4],
		backgroundColor: ['#42a5f5', 'red', 'green','blue','violet'],
		label: 'Comparacion de navegadores'}],
		labels: ['Google Chrome','Safari','Edge','Firefox','Opera']},
    options: {responsive: true}
});
    
