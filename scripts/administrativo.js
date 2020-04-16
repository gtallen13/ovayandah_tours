

/*Esta parte del codigo sirve para controlar el cambio de pagina de Reservacion,Empleado,Estadisticas */
const enlaces1= document.getElementsByClassName('item5');
const txtBusqueda = document.getElementById("busqueda_reservaciones")
const btnBuscar = document.getElementById('buscar')
/*         Variables del formulario para agregar empleados  */
let fe_txtUsuario = document.getElementById('fe_usuario');
let fe_txtContrasenia = document.getElementById('fe_contrasenia');
let fe_VerificarContrasenia = document.getElementById ('fe_verificar_contrasenia');
let fe_txtPrimerNombre = document.getElementById('fe_primer_nombre');
let fe_txtPrimerApellido = document.getElementById('fe_primer_apellido');
let fe_txtTelefono = document.getElementById('fe_telefono');
let fe_txtCorreo = document.getElementById('fe_correo');
let fe_cbPosicion = document.getElementById('cb_posiciones');
let fe_cbTipoUsuario = document.getElementById('cb_tipo_usuario');
const btnAgregarEmplado = document.getElementById('fe_btn_agregar');
for (let x = 0; x < enlaces1.length; x++)
{
    enlaces1[x].addEventListener('click', function(e)
    {
        const idElemento = e.currentTarget.getAttribute('data-elemento');
        const paginas = document.getElementsByClassName('pagina-admin');
        console.log (idElemento)
        if (idElemento === "info-busqueda-reserva"){
            limpiarFormEmpleados();
            document.getElementById("esconder-reservacion").classList.remove('esconder')
            document.getElementById("esconder-empleado").classList.add('esconder')
            document.getElementById("esconder-graficos").classList.add('esconder')
            //Aqui  se llama la funcion de buscar de reservacion.
            buscarReservacion()
        } else if (idElemento === "info-busqueda-emp") {
            document.getElementById('btn_agregar_empleados').style.display = 'block'
            document.getElementById("esconder-reservacion").classList.add('esconder')
            document.getElementById("esconder-empleado").classList.remove('esconder')
            document.getElementById("esconder-graficos").classList.add('esconder')
           //Aqui se llama la funcion de buscar empleado dependiendo de su nombre o apellido o su id.
            //buscarEmpleado()

        } else {
            limpiarFormEmpleados();
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
            document.getElementById('info-busqueda-emp').innerHTML += `<input type="button" value="${fila.primer_nombre} ${fila.primer_apellido}"  class="item4" id=${fila.id} onclick = "limpiarFormEmpleados()">`
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
                        toastr.error('ERROR A CARGAR LOS EMPLEADOS', {
                            "closeButton": false,
                            "debug": false,
                            "newestOnTop": false,
                            "progressBar": false,
                            "positionClass": "toast-bottom-right",
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
    let consulta1 = `SELECT r.id As id_reserva,r.fecha_inicio_tour,e.primer_nombre,e.primer_apellido,t.nombre FROM reservaciones as r 
    inner join empleados_reservaciones AS er ON r.id=er.reservacion_id 
    inner join empleados as e on er.empleados_id=e.id 
    inner join tours as t on r.tours_id=t.id 
    where r.fecha_inicio_tour >= CURDATE() 
    group by r.id order by r.fecha_inicio_tour asc limit 12`
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
                let consulta4 = `SELECT group_concat(e.primer_nombre," ",e.primer_apellido) as empleados FROM reservaciones as r
                inner join empleados_reservaciones AS er ON r.id=er.reservacion_id
                inner join empleados as e on er.empleados_id=e.id
                where r.id = ${idElemento} and r.fecha_inicio_tour >= CURDATE()`
                conexion.query(consulta4,function(err,filaEmpleado,campos){
                    if (err) {console.log('Error al cargar los empleados')} else {
                        let consulta5 = `SELECT distinct group_concat(u.nombre) as nombres FROM reservaciones as r
                        inner join tours as t on r.tours_id=t.id
                        inner join tours_ubicaciones as tu on t.id=tu.id_tours
                        inner join ubicaciones  as u on tu.id_ubicaciones=u.id
                        where r.id = ${idElemento} and r.fecha_inicio_tour >= CURDATE()`
                        conexion.query(consulta5,function(err,filaUbicacion,campos){
                            if (err) 
                            {
                                toastr.error('Error a cargar las ubicaciones', {
                                    "closeButton": false,
                                    "debug": false,
                                    "newestOnTop": false,
                                    "progressBar": false,
                                    "positionClass": "toast-bottom-right",
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
                                console.log('Error al cargar las ubicaciones')
                            } else {
                                let consulta6 = `SELECT r.fecha_inicio_tour,r.fecha_final_tour,r.cantidad_turistas FROM reservaciones as r
                                inner join tours as t on r.tours_id=t.id
                                inner join clientes as c on r.id_clientes = c.id
                                where r.id = ${idElemento} and r.fecha_inicio_tour >= CURDATE()`
                                conexion.query(consulta6,function(err,filas,campos){
                                    if (err) 
                                    {
                                        toastr.error('Error a cargar la reservacion', {
                                            "closeButton": false,
                                            "debug": false,
                                            "newestOnTop": false,
                                            "progressBar": false,
                                            "positionClass": "toast-bottom-right",
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
                                        console.log('Error al cargar la reservacion')
                                    } else {
                                        let html = '<table>'
                                        for(let row of filas){
                                            html += `<tr><th>Fecha de Inicio</th></tr><tr><td>${row.fecha_inicio_tour}</td></tr>`
                                            html += `<tr><th>Fecha final</th></tr><tr><td>${row.fecha_final_tour}</td></tr>`
                                            html += `<tr><th>Cantidad de personas</th></tr><tr><td>${row.cantidad_turistas}</td></tr>`
                                            html += `<tr><th>Ubicaciones</th></tr><tr><td>${filaUbicacion[0].nombres}</td></tr>`
                                            html += `<tr><th>Empleados Encargados</th></tr><tr><td>${filaEmpleado[0].empleados}</td></tr>`
                                        }
                                        html += '</table>'
                                        document.getElementById('tabla-reservacion').innerHTML = html
                        
                                    }
                                })
                            }
                        })
                    }
                })
            })
        }
    })

}

//Con esta vamos a buscar por primer nombre, primer apellido o por numero de empleado
btnBuscar.addEventListener('click',function(evt){
    evt.preventDefault()
    console.log(evt.code)
    if (txtBusqueda.value === ""){
        toastr.warning('Busqueda vacia', {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-right",
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
        console.log("Busqueda Vacia")
        return;
    }
        let sql = `select * from empleados where (primer_nombre like ? or primer_apellido like ? or id = ? ) and tipo_usuario_id=2`
        conexion.query(sql,[`${txtBusqueda.value}%`,`${txtBusqueda.value}%`, `${txtBusqueda.value}`],function(err,fields,campos){
            if (err) throw err; else{
                for (let fila of fields){
                    document.getElementById('info-busqueda-emp').innerHTML = `<input type="button" value="${fila.primer_nombre} ${fila.primer_apellido}"  class="item4" id=${fila.id}>`
                    consulta = `select * from  empleados where id = ${fila.id} and tipo_usuario_id = 2 `
                    conexion.query(consulta,function(err,filas,campoes){
                        if (err) throw err;
                            
                            else {
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
    

        
}) 


// Con esta funcion vamos a poder buscar las boletas dependiendo el numero de reservacion
function buscarReservacion(){
    btnBuscar.addEventListener('click',function(e){
        e.preventDefault()
        let consulta4 = `SELECT group_concat(e.primer_nombre," ",e.primer_apellido) as empleados FROM reservaciones as r
        inner join empleados_reservaciones AS er ON r.id=er.reservacion_id
        inner join empleados as e on er.empleados_id=e.id
        where  r.id= ? and r.fecha_inicio_tour >= CURDATE()`
        conexion.query(consulta4,[`${txtBusqueda.value}`],function(err,filaEmpleado,campos){
            if (err) {console.log('Error al cargar los empleados')} else {
                let consulta5 = `SELECT distinct group_concat(u.nombre) as nombres FROM reservaciones as r
                inner join tours as t on r.tours_id=t.id
                inner join tours_ubicaciones as tu on t.id=tu.id_tours
                inner join ubicaciones  as u on tu.id_ubicaciones=u.id
                where r.id= ? and r.fecha_inicio_tour >= CURDATE()`
                conexion.query(consulta5,[`${txtBusqueda.value}`],function(err,filaUbicacion,campos){
                    if (err) 
                        {
                            toastr.error('Error a cargar las ubicaciones', {
                                "closeButton": false,
                                "debug": false,
                                "newestOnTop": false,
                                "progressBar": false,
                                "positionClass": "toast-bottom-right",
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
                            console.log('Error al cargar las ubicaciones')
                        } else {
                        let consulta6 = `SELECT r.fecha_inicio_tour,r.fecha_final_tour,r.cantidad_turistas FROM reservaciones as r
                        inner join tours as t on r.tours_id=t.id
                        inner join clientes as c on r.id_clientes = c.id
                        where r.id= ? and r.fecha_inicio_tour >= CURDATE()`
                        conexion.query(consulta6,[`${txtBusqueda.value}`],function(err,filas,campos){
                            if (err) 
                                {
                                    toastr.error('Error a cargar la boleta', {
                                        "closeButton": false,
                                        "debug": false,
                                        "newestOnTop": false,
                                        "progressBar": false,
                                        "positionClass": "toast-bottom-right",
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
                                    console.log('Error al cargar la reservacion')
                                } else {
                                let html = '<table>'
                                for(let row of filas){
                                    html += `<tr><th>Fecha de Inicio</th></tr><tr><td>${row.fecha_inicio_tour}</td></tr>`
                                    html += `<tr><th>Fecha final</th></tr><tr><td>${row.fecha_final_tour}</td></tr>`
                                    html += `<tr><th>Cantidad de personas</th></tr><tr><td>${row.cantidad_turistas}</td></tr>`
                                    html += `<tr><th>Ubicaciones</th></tr><tr><td>${filaUbicacion[0].nombres}</td></tr>`
                                    html += `<tr><th>Empleados Encargados</th></tr><tr><td>${filaEmpleado[0].empleados}</td></tr>`
                                }
                                html += '</table>'
                                document.getElementById('tabla-reservacion').innerHTML = html
                
                            }
                        })
                    }
                })
            }
        })
    })
    
}

// Esta parte del codigo se carga los top 5 empleados del mes anterior

let consultaTop = `SELECT e.id,e.primer_nombre,e.primer_apellido,sum(timediff(r.fecha_final_tour,r.fecha_inicio_tour)) as horas_trabajadas FROM reservaciones as r inner join empleados_reservaciones AS er ON r.id=er.reservacion_id inner join empleados as e on er.empleados_id=e.id where r.fecha_inicio_tour between concat(YEAR(Now()),'-',month((NOW() - INTERVAL 1 MONTH)),'-01') and DATE(LAST_DAY(NOW() - INTERVAL 1 MONTH)) group by e.id order by sum(timediff(r.fecha_final_tour,r.fecha_inicio_tour)) desc limit 5`
conexion.query(consultaTop,function(err,filas,campos){
    let bandera = 0
    if (err){
        toastr.error('Error en la base de datos', {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-right",
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
        console.log('error')}else {
            for (let fila of filas){
                bandera = bandera + 1
                document.getElementById(`admin${bandera}`).innerHTML += `<p>${fila.primer_nombre} ${fila.primer_apellido}</p><p>Empleado</p><p>${bandera}-Mejor Empleado del mes</p>`
            }
        }
    }
)

// Esta parte del codigo controla para restablecer la informacion principal de la aplicacion

const btnRestablecer = document.getElementById('restablecer')

btnRestablecer.addEventListener('click',function(e){
    e.preventDefault()
    document.getElementById('info-busqueda-emp').innerHTML = ''
    mostrarEmpleado()
    
})


/* Funcion para agregar Empleados  */
function agregarEmpleados()
{
    document.getElementById("esconder-empleado").classList.add('esconder');
    document.getElementById('form_empleados').style.display = 'block';

    
    btnAgregarEmplado.addEventListener('click', function(evt)
    {
        evt.preventDefault();
        conexion.query('select username,email from empleados;', function(err, resultados, campos)
        {   
            let validado = false
            if(err) throw err;
            for (let r of resultados)
            {
                if (r.username === fe_txtUsuario.value && r.email === fe_txtCorreo.value)
                {
                    console.log("El usuario o correo ya estan tomados");
                    return;
                }
                else
                {
                    validado = true;
                }
            }
            if (validacionEmpleados(fe_txtUsuario.value, fe_txtContrasenia.value, fe_VerificarContrasenia.value, fe_txtPrimerNombre.value,
                fe_txtPrimerApellido.value, fe_txtTelefono.value, fe_txtCorreo, fe_cbPosicion.value, fe_cbTipoUsuario.value) && validado)
            {
                let sql_agregar_empleado =`insert into empleados (username, contra, primer_nombre, primer_apellido, telefono, email, id_posicion, tipo_usuario_id)
                values
                ('${fe_txtUsuario.value}', '${fe_txtContrasenia.value}','${fe_txtPrimerNombre.value}', '${fe_txtPrimerApellido.value}', '${fe_txtTelefono.value}', '${fe_txtCorreo.value}', ${fe_cbPosicion.value}, ${fe_cbTipoUsuario.value});`
                conexion.query(sql_agregar_empleado, function(err, resultados, campos)
                {
                if (err){
                    toastr.error('No se puede Ingresar Empleado', {
                        "closeButton": false,
                        "debug": false,
                        "newestOnTop": false,
                        "progressBar": false,
                        "positionClass": "toast-bottom-right",
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
                else{
                    toastr.success('Empleado Ingresado correctamente', {
                        "closeButton": false,
                        "debug": false,
                        "newestOnTop": false,
                        "progressBar": false,
                        "positionClass": "toast-bottom-right",
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
                    console.log ("Guardado exitosamente");     
                }
                            
                })
            }
            else
            {
                console.log("Algo salio mal");
            }
        });
    })

} 


function validacionEmpleados(usuario, contresenia, verif_contrasenia, primer_nombre, primer_apellido, telefono, correo,
    posicion, tipo_usuario)
{
    const hasNumber = /\d/;
    const regex_correo = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const regex_telefono = /^\(?([0-9]{4})\)?[-. ]?([0-9]{4})$/;
    if (usuario === "")
    {
        toastr.error('El usuario es invalido', {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-right",
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
        console.log("No ha ingresado un usuario");
        return false;
    }
    
    else if (contresenia === "")
    {
        toastr.error('Ingrese una contraseña', {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-right",
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
        console.log("No ha ingresado una contrasenia");
        return false;
    }
    else if (verif_contrasenia === "")
    {
        toastr.error('Valide su contraseña', {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-right",
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
        console.log('No ha ingresado la verificacion de la contresenia');
        return false;
    }
    else if (contresenia !== verif_contrasenia)
    {
        toastr.error('Las contraseña no son iguales', {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-right",
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
        console.log("Las contrasenia no son las mismas");
        return false;
    }

    else if (primer_nombre === "")
    {
        toastr.error('Ingrese un nombre', {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-right",
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
        console.log('Primer apellido no valido');
        return false;
    }
    else if (hasNumber.test(primer_nombre))
    {
        toastr.error('El campo primer nombre no puede tener numeros', {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-right",
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
        console.log("Primer nombre no valido");
        return false;   
    }
    else if (primer_apellido === "")
    {
        toastr.error('Ingrese un apellido', {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-right",
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
        console.log("No ha ingresado el primer apellido");
        return false;
    }
    else if (hasNumber.test(primer_apellido))
    {
        toastr.error('El campo de apellido no puede tener numeros', {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-right",
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
        console.log ("Primer apellido no valido");
        return false;
    }
    else if (telefono === "" && telefono.match(regex_telefono))
    {
        toastr.error('Ingrese el numero de telefono', {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-right",
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
        console.log("Telefono no valido");
        return false;
    }
    else if (correo === "" && !correo.match(regex_correo))
    {
        toastr.error('El correo no cumple con los datos necesarios', {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-right",
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
        console.log ("Correo no valido");
        return false;
    }
    
    else if (posicion === "")
    {
        toastr.error('La posicion esta vacia o es invalida revise', {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-right",
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
        console.log("No ha elegido la posicion");
        return false;
    }
    else if (tipo_usuario === "")
    {
        toastr.error('El tipo de usuario es invalido o esta vacia', {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-right",
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
        console.log ("No ha elegido el tipo de usuario");
        return false;
    }
    return true;
}

//Limpia y esconde el formEmpleados
function limpiarFormEmpleados()
{
    document.getElementById('form_empleados').style.display = 'none';
    document.getElementById("esconder-empleado").classList.remove('esconder')
    fe_txtContrasenia.value = ""
    fe_txtUsuario.value = ""
    fe_VerificarContrasenia.value = ""
    fe_txtPrimerApellido.value = ""
    fe_txtPrimerNombre.value = ""
    fe_txtTelefono.value = ""
    fe_txtCorreo.value = ""
    fe_cbPosicion.value = ""
    fe_cbTipoUsuario.value = ""
}
