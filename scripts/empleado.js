
const username = document.getElementById('username')
const password = document.getElementById('password')
const btnLogin = document.getElementById('btn-guardar')


let band = 0;
btnLogin.addEventListener('click', function(e){
    e.preventDefault()
    console.log(username.value)
    let consultasql = `select concat(primer_nombre, " ", primer_apellido) NombreEmpleado, username,contra,tipo_usuario_id as id from empleados where username = ? and contra = ? `
    conexion.query(consultasql,[`${username.value}`,`${password.value}`],function(err,filas,campos)
    {
        if (err)
        {
            toastr.error('Cuenta o contraseña incorrectos', {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        });
        console.log(err);
        return;
        
        } else 
            {
            if (filas[0].id === 1) 
            {
                for (let hilo of filas) {
                    if (username.value === hilo.username & password.value === hilo.contra){
                        toastr.success(`Bienvenido ${username.value}`, {
                            "closeButton": false,
                            "debug": false,
                            "newestOnTop": false,
                            "progressBar": false,
                            "positionClass": "toast-top-right",
                            "preventDuplicates": false,
                            "onclick": null,
                            "showDuration": "300",
                            "hideDuration": "1000",
                            "timeOut": "5000",
                            "extendedTimeOut": "1000",
                            "showEasing": "swing",
                            "hideEasing": "linear",
                            "showMethod": "fadeIn",
                            "hideMethod": "fadeOut"
                        });
                
                        console.log('lo existe')
                        //Este desasparece el formulario login
                        document.getElementById('lolo').style.display = 'none'
                        //Este aparece la pagina de Administrador
                        document.getElementById('lolo4').classList.remove('esconder')
                        cargarNombreEmpleado()
                        nombrar()
                        // cargarClientes()
                        cargarTop()
                        cargarPrimerInfo()
                    }
                    else {
                        console.log ('no pudiste entrar')
                        toastr.error('Cuenta o contraseña incorrectos', {
                            "closeButton": false,
                            "debug": false,
                            "newestOnTop": false,
                            "progressBar": false,
                            "positionClass": "toast-top-right",
                            "preventDuplicates": false,
                            "onclick": null,
                            "showDuration": "300",
                            "hideDuration": "1000",
                            "timeOut": "5000",
                            "extendedTimeOut": "1000",
                            "showEasing": "swing",
                            "hideEasing": "linear",
                            "showMethod": "fadeIn",
                            "hideMethod": "fadeOut"
                        });
                    }
                }   
                
            } else
                {   
                    for (let hilo of filas) {
                        if (username.value === hilo.username & password.value === hilo.contra){
                            console.log('lo existe')
                            //Este desasparece el formulario login
                            document.getElementById('lolo').style.display = 'none'
                            //Este aparece la pagina el formulario Empleado
                            document.getElementById('lolo3').classList.remove('esconder')
                            cargarNombreEmpleado()
                            nombrar()
                            // cargarClientes()
                            cargarTop()
                            cargarPrimerInfo()
                            //notificaion
                            //bienvenido [nombre del empleado]
                            
                        }else {
                            console.log ('no pudiste entrar')
                            //notificaion
                            //usuario o contrasenia malas
                        }
                    }
                }
    
            }
    });
});


//Encontrar los top 5 mejores empleados del mes dependiendo de la fecha del sistema
function cargarTop(){
    let consulta1 = `SELECT e.id,e.primer_nombre,e.primer_apellido,sum(timediff(r.fecha_final_tour,r.fecha_inicio_tour)) as horas_trabajadas FROM toursdb.reservaciones as r inner join toursdb.empleados_reservaciones AS er ON r.id=er.reservacion_id inner join toursdb.empleados as e on er.empleados_id=e.id where r.fecha_inicio_tour between concat(YEAR(Now()),'-',month((NOW() - INTERVAL 1 MONTH)),'-01') and DATE(LAST_DAY(NOW() - INTERVAL 1 MONTH)) group by e.id order by sum(timediff(r.fecha_final_tour,r.fecha_inicio_tour)) desc limit 5`
    conexion.query(consulta1,function(err,filas,campos){
        let cont = 0
        if (err){console.log('error')}else {
            for (let fila of filas){
                cont = cont + 1
                document.getElementById(`emp${cont}`).innerHTML += `<p>${fila.primer_nombre} ${fila.primer_apellido}</p><p>Empleado</p><p>${cont}-Mejor Empleado del mes</p>`
            }
        }
    })
}


function cargarPrimerInfo() {
    //Cargar la primer informacion de la reservacion
    let consulta2 = `SELECT r.id,r.fecha_inicio_tour,fecha_final_tour,e.primer_nombre,e.primer_apellido,t.nombre,c.primer_nombre as Nombre_Cliente,c.primer_apellido as Apellido_Cliente,u.nombre, r.cantidad_turistas,group_concat(u.nombre) as Ubicaciones FROM toursdb.reservaciones as r
inner join toursdb.empleados_reservaciones AS er ON r.id=er.reservacion_id
inner join toursdb.empleados as e on er.empleados_id=e.id
inner join tours as t on r.tours_id=t.id
inner join clientes as c on r.id_clientes = c.id
inner join tours_ubicaciones as tu on t.id=tu.id_tours
inner join ubicaciones  as u on tu.id_ubicaciones=u.id
where e.username = ? and r.fecha_inicio_tour >= CURDATE()
group by r.id order by r.fecha_inicio_tour asc limit 1 `
    conexion.query(consulta2, [`${username.value}`], function (err, filas, campoes) {
        if (err) {
            console.log('error')
        } else {
            let html = '<table>'
            for (let row of filas) {
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
}

function nombrar () {
    //Aparecer las boletas con el boton

    let consulta = 'SELECT r.id As id_reserva,r.fecha_inicio_tour,e.primer_nombre,e.primer_apellido,t.nombre FROM reservaciones as r inner join empleados_reservaciones AS er ON r.id=er.reservacion_id inner join empleados as e on er.empleados_id=e.id inner join tours as t on r.tours_id=t.id where e.username = ? and r.fecha_inicio_tour >= CURDATE() order by r.fecha_inicio_tour asc limit 10'
    let cont = 0
    conexion.query(consulta, [`${username.value}`], function (err, filas, campos) {
        for (let fila of filas) {
            cont = cont + 1
            document.getElementById('boleta1').innerHTML += `<input type="button" value="Reservacion#${fila.id_reserva}/${fila.nombre}" id=${fila.id_reserva} class="item">`
        }
        const enlaces = document.getElementsByClassName('item')
        for (let i = 0; i < enlaces.length; i++) {
            enlaces[i].addEventListener('click', function (e) {
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

function cargarNombreEmpleado(){
    conexion.query(`select e.primer_nombre,e.primer_apellido,t.nombre_tipo as nombre from empleados as e inner join tipo_usuario as t on e.tipo_usuario_id=t.id where username = ?`,[`${username.value}`],function(err,filas,campos){
        if (err){
            console.log('error')
        } else {
            for (let fila of filas){
                document.getElementById('usuario-emp').innerHTML = `<p>${fila.primer_nombre} ${fila.primer_apellido}</p><p>${fila.nombre}</p><a href="" class="item-menu" data-elemento="inicio">Cerrar Sesion</a>`
                document.getElementById('administrativo-emp').innerHTML = `<p>${fila.primer_nombre} ${fila.primer_apellido}</p><p>${fila.nombre}</p><a href="" class="item-menu" data-elemento="inicio">Cerrar Sesion</a>`
            }

        }

    })
}
