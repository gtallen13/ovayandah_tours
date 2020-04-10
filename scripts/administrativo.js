/*Esta parte del codigo sirve para controlar el cambio de pagina de Reservacion,Empleado,Estadisticas */
const enlaces1= document.getElementsByClassName('item5');
const txtBusqueda = document.getElementById("busqueda_reservaciones")
for (let x = 0; x < enlaces1.length; x++)
{
    enlaces1[x].addEventListener('click', function(e)
    {
        const idElemento = e.currentTarget.getAttribute('data-elemento');
        const paginas = document.getElementsByClassName('pagina-admin');
        console.log (idElemento)
        if (idElemento === "info-busqueda-reserva"){
            document.getElementById("esconder-reservacion").classList.remove('esconder')
            document.getElementById("esconder-empleado").classList.add('esconder')
            document.getElementById("esconder-graficos").classList.add('esconder')
            //Aqui  se llama la funcion de buscar de reservacion.
            buscarReservacion()
        } else if (idElemento === "info-busqueda-emp") {
            document.getElementById("esconder-reservacion").classList.add('esconder')
            document.getElementById("esconder-empleado").classList.remove('esconder')
            document.getElementById("esconder-graficos").classList.add('esconder')
           //Aqui se llama la funcion de buscar empleado dependiendo de su nombre o apellido o su id.
            buscarEmpleado()

        } else {
            document.getElementById("esconder-reservacion").classList.add('esconder')
            document.getElementById("esconder-empleado").classList.add('esconder')
            document.getElementById("esconder-graficos").classList.remove('esconder')
           
        }
        for (let y = 0; y < paginas.length; y ++)
        {
            paginas[y].classList.add('esconder');
        }
        document.getElementById(idElemento).classList.remove('esconder');
        
    });
}

/*Esta funcion lleva el control de mostrar los empleados para el administrador en la parte
izquierda de la aplicacion*/ 

mostrarEmpleado()

function mostrarEmpleado(){  
    let consulta = "select * from empleados where tipo_usuario_id = 2 limit 10"
    let cont = 0
    conexion.query(consulta,function(err,filas,campos){
        for (let fila of filas){
            cont = cont + 1
            document.getElementById('info-busqueda-emp').innerHTML += `<input type="button" value="${fila.primer_nombre} ${fila.primer_apellido}"  class="item4" id=${fila.id}>`
        }
        const enlaces = document.getElementsByClassName('item4')
        for (let i = 0; i < enlaces.length; i++) {
            enlaces[i].addEventListener('click', function(e) {
                e.preventDefault();
                console.log('hola')
                const idElemento = e.currentTarget.getAttribute('id');
                consulta = `select * from  empleados where id = ${idElemento} and tipo_usuario_id = 2 `
                conexion.query(consulta,function(err,filas,campoes){
                    if (err){
                        console.log('error')
                    } else {
                        let html = '<table>'
                        for(let row of filas){
                            html += `<tr><th>Nombre</th></tr><tr><td>${row.primer_nombre}</td></tr>`
                            html += `<tr><th>Apellido</th></tr><tr><td>${row.primer_apellido}</td></tr>`
                            html += `<tr><th>Telefono</th></tr><tr><td>${row.telefono}</td></tr>`
                            html += `<tr><th>Email</th></tr><tr><td>${row.email}</td></tr>`
                        }
                        html += '</table>'
                        document.getElementById('tabla-empleado').innerHTML = html
                    }
                
                })
            console.log(idElemento);
            })
        }
    })
}
/*Esta funcion lleva el control de mostrar en la parte izquierda de la aplicacion todas las reservaciones dependiendo
la fecha del sistema */

mostrarReservaciones()

function mostrarReservaciones(){
    let consulta1 = 'SELECT r.id As id_reserva,r.fecha_inicio_tour,e.primer_nombre,e.primer_apellido,t.nombre FROM reservaciones as r inner join empleados_reservaciones AS er ON r.id=er.reservacion_id inner join empleados as e on er.empleados_id=e.id inner join tours as t on r.tours_id=t.id where r.fecha_inicio_tour >= CURDATE() order by r.fecha_inicio_tour asc limit 10'
    conexion.query(consulta1,function(err,filas,campos){
        for (let fila of filas){

            document.getElementById('info-busqueda-reserva').innerHTML += `<input type="button" value="Reservacion#${fila.id_reserva}/${fila.nombre}" id=${fila.id_reserva} class="item">`
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
                }
                html += '</table>'
                document.getElementById('tabla-reservacion').innerHTML = html
            }
            
        })
        console.log(idElemento);
        })
    }
        
    })

    }

//Con esta vamos a buscar por primer nombre, primer apellido o por numero de empleado
function buscarEmpleado(){
    txtBusqueda.addEventListener('keyup',function(evt){
        evt.preventDefault()
        console.log(evt.code)
        if (evt.code === 'Enter'){
            let sql = `select * from empleados where (primer_nombre like ? or primer_apellido like ? or id = ? ) and tipo_usuario_id=2`
            conexion.query(sql,[`${txtBusqueda.value}%`,`${txtBusqueda.value}%`, `${txtBusqueda.value}`],function(err,fields,campos){
                if (err) {console.log('Error')} else{
                    for (let fila of fields){
                        document.getElementById('info-busqueda-emp').innerHTML = `<input type="button" value="${fila.primer_nombre} ${fila.primer_apellido}"  class="item4" id=${fila.id}>`
                        consulta = `select * from  empleados where id = ${fila.id} and tipo_usuario_id = 2 `
                        conexion.query(consulta,function(err,filas,campoes){
                            if (err){
                                console.log('error')
                            } else {
                                let html = '<table>'
                                for(let row of filas){
                                    html += `<tr><th>Nombre</th></tr><tr><td>${row.primer_nombre}</td></tr>`
                                    html += `<tr><th>Apellido</th></tr><tr><td>${row.primer_apellido}</td></tr>`
                                    html += `<tr><th>Telefono</th></tr><tr><td>${row.telefono}</td></tr>`
                                    html += `<tr><th>Email</th></tr><tr><td>${row.email}</td></tr>`
                                }
                                html += '</table>'
                                document.getElementById('tabla-empleado').innerHTML = html
                            }
                            
                        })
                        
                    }
                }
            })
        }
    
    }) 
}

// Con esta funcion vamos a poder buscar las boletas dependiendo el numero de reservacion
function buscarReservacion(){
    txtBusqueda.addEventListener('keyup',function(e){
        e.preventDefault()
        console.log(e.code)
        if (e.code === 'Enter'){
            let sql = `SELECT r.id,r.fecha_inicio_tour,fecha_final_tour,e.primer_nombre,e.primer_apellido,t.nombre,c.primer_nombre as Nombre_Cliente,c.primer_apellido as Apellido_Cliente,u.nombre, r.cantidad_turistas,group_concat(u.nombre) as Ubicaciones,c.email,c.telefono FROM toursdb.reservaciones as r
            inner join toursdb.empleados_reservaciones AS er ON r.id=er.reservacion_id
            inner join toursdb.empleados as e on er.empleados_id=e.id
            inner join tours as t on r.tours_id=t.id
            inner join clientes as c on r.id_clientes = c.id
            inner join tours_ubicaciones as tu on t.id=tu.id_tours
            inner join ubicaciones  as u on tu.id_ubicaciones=u.id where (r.id = ? or t.nombre like ? ) and r.fecha_inicio_tour >= CURDATE() `
            conexion.query(sql,[`${txtBusqueda.value}`,`%${txtBusqueda.value}%`],function(err,filas,campos){
                if (err) {console.log('Error')} else {
                    let html = '<table>'
                    for (let row of filas){
                       
                        html += `<tr><th>Fecha de Inicio</th></tr><tr><td>${row.fecha_inicio_tour}</td></tr>`
                        html += `<tr><th>Fecha final</th></tr><tr><td>${row.fecha_final_tour}</td></tr>`
                        html += `<tr><th>Cantidad de personas</th></tr><tr><td>${row.cantidad_turistas}</td></tr>`
                        html += `<tr><th>Ubicaciones</th></tr><tr><td>${row.Ubicaciones}</td></tr>`

                    }      
                    html += '</table>'
                    document.getElementById('tabla-reservacion').innerHTML = html      

                }
            })
        }
    })
    
}

// Esta parte del codigo se carga los top 5 empleados del mes anterior

let consultaTop = `SELECT e.id,e.primer_nombre,e.primer_apellido,sum(timediff(r.fecha_final_tour,r.fecha_inicio_tour)) as horas_trabajadas FROM toursdb.reservaciones as r inner join toursdb.empleados_reservaciones AS er ON r.id=er.reservacion_id inner join toursdb.empleados as e on er.empleados_id=e.id where r.fecha_inicio_tour between concat(YEAR(Now()),'-',month((NOW() - INTERVAL 1 MONTH)),'-01') and DATE(LAST_DAY(NOW() - INTERVAL 1 MONTH)) group by e.id order by sum(timediff(r.fecha_final_tour,r.fecha_inicio_tour)) desc limit 5`
conexion.query(consultaTop,function(err,filas,campos){
    let bandera = 0
    if (err){console.log('error')}else {
        for (let fila of filas){
            bandera = bandera + 1
            document.getElementById(`admin${bandera}`).innerHTML += `<p>${fila.primer_nombre} ${fila.primer_apellido}</p><p>Empleado</p><p>${bandera}-Mejor Empleado del mes</p>`
        }
    }
})

// Esta parte del codigo controla para restablecer la informacion principal de la aplicacion

const btnRestablecer = document.getElementById('buscar')

btnRestablecer.addEventListener('click',function(e){
    e.preventDefault()
    document.getElementById('info-busqueda-emp').innerHTML = ''
    mostrarEmpleado()
    
})
