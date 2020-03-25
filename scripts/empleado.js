
const mysql = require('mysql')
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


//Encontrar los top 5 mejores empleados del mes dependiendo de la fecha del sistema
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
//Cargar la primer informacion de la reservacion
let consulta2 = `SELECT r.id,r.fecha_inicio_tour,fecha_final_tour,e.primer_nombre,e.primer_apellido,t.nombre,c.primer_nombre as Nombre_Cliente,c.primer_apellido as Apellido_Cliente,u.nombre, r.cantidad_turistas,group_concat(u.nombre) as Ubicaciones FROM toursdb.reservaciones as r
inner join toursdb.empleados_reservaciones AS er ON r.id=er.reservacion_id
inner join toursdb.empleados as e on er.empleados_id=e.id
inner join tours as t on r.tours_id=t.id
inner join clientes as c on r.id_clientes = c.id
inner join tours_ubicaciones as tu on t.id=tu.id_tours
inner join ubicaciones  as u on tu.id_ubicaciones=u.id
where e.username = 'gustavoo23' and r.fecha_inicio_tour >= CURDATE()
group by r.id order by r.fecha_inicio_tour asc limit 1 `
conexion.query(consulta2,function(err,filas,campoes){
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

//Cargar la informacion del cliente
let sql = `SELECT c.primer_nombre as Nombre_Cliente,c.primer_apellido as Apellido_Cliente,c.email,c.telefono FROM toursdb.reservaciones as r
inner join toursdb.empleados_reservaciones AS er ON r.id=er.reservacion_id
inner join toursdb.empleados as e on er.empleados_id=e.id
inner join tours as t on r.tours_id=t.id
inner join clientes as c on r.id_clientes = c.id
inner join tours_ubicaciones as tu on t.id=tu.id_tours
inner join ubicaciones  as u on tu.id_ubicaciones=u.id
where e.username = 'gustavoo23' and r.fecha_inicio_tour >= CURDATE()
group by r.id order by r.fecha_inicio_tour asc limit 1
`
conexion.query(sql,function(err,filas,campos){
    if (err){
        console.log('error')
    } else {
        for (let fila of filas){
            document.getElementById('txt-name').value = fila.Nombre_Cliente
            document.getElementById('txt-lastname').value = fila.Apellido_Cliente
            document.getElementById('txt-telphone').value = fila.telefono
            document.getElementById('txt-email').value = fila.email
        }
    }
})


//Abrir el login dependiendo el tipo de usuario
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



//Aparecer las boletas con el boton

const btnVer = document.getElementById('btn-ver')

    let consulta = 'SELECT r.id As id_reserva,r.fecha_inicio_tour,e.primer_nombre,e.primer_apellido,t.nombre FROM reservaciones as r inner join empleados_reservaciones AS er ON r.id=er.reservacion_id inner join empleados as e on er.empleados_id=e.id inner join tours as t on r.tours_id=t.id where e.username = ? and r.fecha_inicio_tour >= CURDATE() order by r.fecha_inicio_tour asc limit 10'
    let cont = 0
    conexion.query(consulta,['gustavoo23'],function(err,filas,campos){
        for (let fila of filas){
            cont = cont + 1
            document.getElementById('boleta1').innerHTML += `<input type="button" value="${fila.primer_nombre} ${fila.primer_apellido}/${fila.nombre}" id=${fila.id_reserva} class="item">`
        }
        const enlaces = document.getElementsByClassName('item')
    for (let i = 0; i < enlaces.length; i++) {
        enlaces[i].addEventListener('click', function(e) {
        e.preventDefault();
        console.log('hola')
        const idElemento = e.currentTarget.getAttribute('id');
        let sql = `SELECT r.id,r.fecha_inicio_tour,fecha_final_tour,e.primer_nombre,e.primer_apellido,t.nombre,c.primer_nombre as Nombre_Cliente,c.primer_apellido as Apellido_Cliente,u.nombre, r.cantidad_turistas,group_concat(u.nombre) as Ubicaciones,c.email,c.telefono FROM toursdb.reservaciones as r
        inner join toursdb.empleados_reservaciones AS er ON r.id=er.reservacion_id
        inner join toursdb.empleados as e on er.empleados_id=e.id
        inner join tours as t on r.tours_id=t.id
        inner join clientes as c on r.id_clientes = c.id
        inner join tours_ubicaciones as tu on t.id=tu.id_tours
        inner join ubicaciones  as u on tu.id_ubicaciones=u.id
        where r.id =${idElemento} and r.fecha_inicio_tour >= CURDATE()
        group by r.id order by r.fecha_inicio_tour asc limit 10 `
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
                    document.getElementById('txt-name').value = row.Nombre_Cliente
                    document.getElementById('txt-lastname').value = row.Apellido_Cliente
                    document.getElementById('txt-telphone').value = row.telefono
                    document.getElementById('txt-email').value = row.email
                }
                html += '</table>'
                document.getElementById('tabla-info').innerHTML = html
            }
            
        })
        console.log(idElemento);
        })
    }
        
    })



