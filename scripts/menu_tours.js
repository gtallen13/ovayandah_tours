

/*   Variables para Consulta, Actualizacion y Cancelacion de reservaciones  */
let cc_txtBusqueda = document.getElementById('cc_txt_busqueda');
let cc_txtCorreo = document.getElementById('cc_txt_correo');
let cc_NombreCliente = document.getElementById('cc_nombre_completo');
let cc_CantPersonas = document.getElementById('cc_cant_personas');
let cc_FechaInicio = document.getElementById('cc_fecha_inicio');
let cc_FechaFinal = document.getElementById ('cc_fecha_final');
let cc_NombreTour = document.getElementById('cc_nombre_tour');
let cc_Empleado = document.getElementById('cc_empleado');
let cc_Empleado1 = document.getElementById('cc_empleado1');

function reservacionLimpiarForm()
{  
    cc_txtBusqueda.value = ""
    cc_txtCorreo.value = ""
    cc_Empleado1.value = ""
    cc_NombreCliente.value = ""
    cc_CantPersonas.value = ""
    cc_FechaInicio.value = ""
    cc_FechaFinal.value = ""
    cc_NombreTour.value = ""
    cc_Empleado.value = ""
    document.getElementById('cc_btn_cancelar').disabled = false;
    document.getElementById('cc_btn_actualizar').disabled = false;
}


function reservacionBusqueda()
{
    if (cc_txtBusqueda.value === "")
    {
        console.log ("Ingrese el numero de la reservacion");
        toastr.error("No ha ingresado el numero de la reservacion");
        return;
    }
    else if (cc_txtCorreo.value === "")
    {
        console.log ("Ingreso su correo para mas seguridad");
        toastr.error("No ha ingresado el numero de la reservacion");
    }
    let sql_busqueda = `select concat(c.primer_nombre, " ", c.primer_apellido) NombreCliente, c.email Correo,
    date_format(r.fecha_inicio_tour, '%Y-%m-%d %H:%i:%s')  FechaInicio, date_format(r.fecha_final_tour, '%Y-%m-%d %H:%i:%s')  FechaFinal, r.cantidad_turistas CantidadTuristas, 
    t.nombre NombreTour, group_concat(e.primer_nombre, " ", e.primer_apellido) NombreEmpleado, r.id
    from clientes c 
    join reservaciones r 
        on c.id = r.id_clientes
    join tours t 
        on r.tours_id = t.id 
    join empleados_reservaciones er 
        on r.id = er.reservacion_id
    join empleados e 
        on er.empleados_id = e.id
    where r.id = ${cc_txtBusqueda.value}
    group by r.id, c.id, e.id;`;

    conexion.query(sql_busqueda, function(err, resultados, campos)
    {
        if (err) throw err;
        if (resultados[0].Correo !== cc_txtCorreo.value)
        {
            console.log ("El correo no concuerda");
            toastr.error("El correo no es el mismo al que esta en la reservacion"); 
            return;
        }
        cc_Empleado1.value = resultados[0].NombreEmpleado; 
        cc_NombreCliente.value = resultados[1].NombreCliente;
        cc_CantPersonas.value = resultados[1].CantidadTuristas;
        cc_FechaInicio.value = resultados[1].FechaInicio;
        cc_FechaFinal.value = resultados[1].FechaFinal;
        cc_NombreTour.value = resultados[1].NombreTour;
        cc_Empleado.value = resultados[1].NombreEmpleado; 
        console.log(resultados);
    })
    document.getElementById('cc_btn_cancelar').disabled = false;
    document.getElementById('cc_btn_actualizar').disabled = false;
}

function reservacionCancelar()
{
    let sql_cancelar = `update reservaciones set cancelado = 1 where id = ${cc_txtBusqueda.value}`
    conexion.query(sql_cancelar,function(err, result, campos)
    {
        if (err) throw err;
        console.log ("Se ha cancelado exitosamente"); 
    })
}

function reservacionActualizar()
{
    
    let busqueda_int = parseInt(cc_txtBusqueda.value)
    console.log (busqueda_int);
    let sql_precio_tour = 
    `select t.precio PrecioTour
    from tours t 
    join reservaciones r
        on t.id = r.tours_id
    where r.id = ${busqueda_int};`;

    conexion.query(sql_precio_tour, function(err, resultados, campos)
    {
        console.log(resultados);
        if (err) throw err;
        console.log(resultados);
        let precio_total = cc_CantPersonas.value * resultados[0].PrecioTour;
        let precio_total_int = parseInt(precio_total)
        console.log(precio_total_int);
        console.log(precio_total);
        let sql_actualizacion = 
        `update reservaciones set fecha_inicio_tour = STR_TO_DATE('${cc_FechaInicio.value}', '%Y-%m-%d %H:%i:%s'),
        fecha_final_tour = STR_TO_DATE('${cc_FechaFinal.value}', '%Y-%m-%d %H:%i:%s'), cantidad_turistas = ${cc_CantPersonas.value}, 
        precio_total = ${precio_total_int} where id = ${busqueda_int};`;

        conexion.query(sql_actualizacion, function(err, result, campos)
        {
            if (err) throw err;

            console.log('Se actualizaron los datos');
        })
    })
}