const conexion = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'toursdb'
});
conexion.connect(function(err)
{
    if (err){
        toastr.error('Conexion a la base de datos Fallida', {
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
        console.log('Error');
    }
    else{console.log ('Conexion Exitosa');
        toastr.success('Conexion exitosa',{
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
    
});
// correo de donde se enviara
let email = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email_user,
        pass: email_password
    }
});
const toursinfo = document.getElementById('tours_info'); //div donde se mostrara la informacion del tour
const toursmenu = document.getElementById('tours_menu'); //div donde se mostrara el menu de tours
const tours_imagen = document.getElementById('caja'); //div donde se mostrara la imagen
let html_menu = '<div class = "lista"><ul>' //para desplegar menu de tours
let html_info = ''; //para desplegar titulo del tour e informacion del tour
let html_pdf = document.getElementById('contenido_pdf');

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

//variables para controlar estado de radiobuttons (selecTour)
let cbSnorkelScubba = ``
let cbParaSki = ``
let cbSkyswimSnork = ``
let cbZooDay = ``
let cbCanoDiving = ``
let cbSeatreking = ``
let cbFishingDay = ``
let cbSurfTurf = ``
let cbATVDay = ``
let cbWindsurf = ``
let cbSwimmingDolphins = ``




let sql = 'select id, nombre, precio, descripcion from tours'
let i = 1;
let arr = [1]

//consulta para mostrar el primer tour
conexion.query(sql,
    function (err, filas, fields) {
        if (err) throw err;
        tours_imagen.style.backgroundImage = 'url("./carpeta.css/img/tour1.jpg")';
        html_info += `<h2>${filas[0].nombre}</h2>`
        html_info += `<p>$ ${filas[0].precio}</p>`
        html_info += `<p>${filas[0].descripcion}</p>`

        for (let fila of filas) {
            html_menu += `<button class = "tablinks" onclick = "cambioTours('click', ${i})"  >${fila.nombre}</a>`;
            i++;
            if (i == 12) { break }
        }
        html_menu += '</div></ul>';
        toursmenu.innerHTML = html_menu;
        toursinfo.innerHTML = html_info;
    });

//utilizada para navegar entre los tours disponibles
function cambioTours(evt, id_tour) {
    html_info = ''
    let sql = `select * from tours`
    conexion.query(sql, function (err, resultados, campo) {
        html_info += `<h2>${resultados[id_tour - 1].nombre}</h2>`
        html_info += `<p>$ ${resultados[id_tour - 1].precio}</p>`
        html_info += `<p>${resultados[id_tour - 1].descripcion}</p>`
        arr.push(id_tour)
        toursinfo.innerHTML = html_info;
        tours_imagen.style.backgroundImage = `url("./carpeta.css/img/tour${id_tour}.jpg")`;
    });
}
//cargar los tours guides al combo box
function selecEmpleadosTG()
{
    let select_tourguides = document.getElementById('cb_tourguides')
    let query_tourguides = `select id,concat(primer_nombre, " ", primer_apellido) NombreCompleto, id_posicion from empleados
    where id_posicion = 2;`
    let html_tourguides = `<select class="combox"><option value="" disabled selected hidden>Tour Guides</option>`
    conexion.query(query_tourguides,function(err, resultados,campor)
    {
        if (err) throw err;
        for (let r of resultados)
        {
            html_tourguides += `<option value="${r.id}">${r.NombreCompleto}</option>`
        }
        html_tourguides += `</select><br>`
        select_tourguides.innerHTML = html_tourguides;
    })
}


function selecEmpleadosTransportista()
{
    let select_transportista = document.getElementById('cb_transportista')
    let query_transportista = `select id,concat(primer_nombre, " ", primer_apellido) NombreCompleto, id_posicion from empleados
    where id_posicion = 3;`
    let html_transportista = `<select class="combox"><option value="" disabled selected hidden>Transportista</option>`
    conexion.query(query_transportista,function(err, resultados,campor)
    {
        if (err) throw err;
        for (let r of resultados)
        {
            html_transportista += `<option value="${r.id}">${r.NombreCompleto}</option>`
        }
        html_transportista += `</select><br>`
        select_transportista.innerHTML = html_transportista;
    })
}
selecEmpleadosTG();
selecEmpleadosTransportista();

btnReservar.addEventListener('click', function (e) {
    e.preventDefault()
    //validando el modal
    if (validacionModal(txtFechaInicio.value, txtFechaFinal.value, txtPrimerNombre.value,
        txtPrimerApellido.value, txtCorreo.value,txtVerificacionCorreo.value, 
        txtPersonas.value, telefono.value))
    {
        insertarClientes()    
        encontrarIdCliente(arr[arr.length - 1]);   
    }
    else
    {
        console.log("No se pudo realizar la reservaciones");
    }
})



function sendMail(boleta_pdf1)
{
    //Correo que se enviara: destinario y archivos adjuntados
    let mailOptions = {
    from: 'ovayandah.tours2020@gmail.com',
    to: `${txtCorreo.value}`,
    to: 'gtallenpadi13@gmail.com',
    subject: 'Boleta de Reservacion',
    text: 'Disfrute de su tour y gracias por elegir Ovayandah Tours por nosotros te llevamos ovayandah :)',
    attachments:[{
        filename: boleta_pdf1,
        path: './boletas/'+boleta_pdf1
    }]
};
    email.sendMail(mailOptions,function(err,info)
    {
        console.log(boleta_pdf);
        if (err) 
        {  
            console.log(err);
            console.log(boleta_pdf);
            toastr.error('No se pudo enviar el correo', {
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
            console.log (err);
            return;
        }
        console.log(txtCorreo.value);
        console.log('Email sent');
        toastr.success('Correo Enviado Exitosamente',{
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
    })
}
 /*Cambiar de graficos*/
const enlaces3 = document.getElementsByClassName('item3')
for (let i = 0; i < enlaces3.length; i++) {
    enlaces3[i].addEventListener('click', function(e) {
        e.preventDefault()
        const idElemento = e.currentTarget.getAttribute('data-elemento')
        const paginas = document.getElementsByClassName('container');
        console.log(idElemento)
        for (let j = 0; j < paginas.length; j ++)
        {
            paginas[j].classList.add('esconder');
        }
        document.getElementById(idElemento).classList.remove('esconder')
    })   
}

function insertarClientes() {
    let sql = 'insert into clientes(email,primer_nombre,primer_apellido,telefono)values(?,?,?,?)'
    conexion.query(sql,[`${txtCorreo.value}`,`${txtPrimerNombre.value}`,`${txtPrimerApellido.value}`,`${telefono.value}`],
    function(err,filas,campos){
        // if ((err) ) {
        //     toastr.error('El Correo ya existe', {
        //         "closeButton": false,
        //         "debug": false,
        //         "newestOnTop": false,
        //         "progressBar": false,
        //         "positionClass": "toast-top-right",
        //         "preventDuplicates": false,
        //         "onclick": null,
        //         "showDuration": "300",
        //         "hideDuration": "1000",
        //         "timeOut": "5000",
        //         "extendedTimeOut": "1000",
        //         "showEasing": "swing",
        //         "hideEasing": "linear",
        //         "showMethod": "fadeIn",
        //         "hideMethod": "fadeOut"
        //       });
        // }
        toastr.success('Los datos se guardaron correctamente',{
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
        console.log('Se almacenaron los clientes correctamente')
    })  
}

function encontrarIdCliente(tour_id) {
    let consultaCliente = `select id from clientes where email = "${txtCorreo.value}"`
    conexion.query(consultaCliente,function(err,results,campoes){
        if (err) {console.log('Error')} else {
                let consultaId = `select ID,precio from tours where ID = ${tour_id} limit 1`
                conexion.query(consultaId,function(err,filas,campos){
                if (err) {
                    toastr.error('No se encontro en la base de datos', {
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
                    console.log('Error'); return;} else {
                    let consultaReservacion = `insert into reservaciones(fecha_inicio_tour,fecha_final_tour,cantidad_turistas,precio_total,fecha_creacion,id_clientes,tours_id, cancelado) 
                    values(?,?,?,?,NOW(),?,?,0);`
                    conexion.query(consultaReservacion,[`${txtFechaInicio.value}`,`${txtFechaFinal.value}`,`${txtPersonas.value}`,`${txtPersonas.value * filas[0].precio}`,`${results[0].id}`,`${filas[0].ID}`],
                    function(err,rows,campos){
                        if (err) {
                            toastr.error('No se encontro en la base de datos', {
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
                            console.log('Error'); return;} else {
                            console.log('se pudo campeon')
                            
                            pdfGeneracion()
                        }
                    })
                
                }
            })
        }
    })    
}


// Generacion del PDF
function pdfGeneracion()
{
    let sql_boleta = 
    `select r.id ID, concat(c.primer_nombre, " ", c.primer_apellido) NombreCompleto, r.cantidad_turistas CantPersonas,
    r.fecha_inicio_tour FechaInicio, r.fecha_final_tour FechaFinal, r.fecha_creacion FechaCreacion, r.tours_id IDTours, concat(e.primer_nombre," ", e.primer_apellido) NombreEmpleado
    from clientes c
    join reservaciones r
        on c.id = r.id_clientes
	join empleados_reservaciones re 	
		on r.id = re.reservacion_id
	join empleados e
		on re.empleados_id = e.id
	where r.id in (select id from reservaciones order by r.id desc)
    and c.email = '${txtCorreo.value}'
    group by r.id,e.id
    order by r.id desc;`
    let dir_boleta = './boletas/boleta.html'
    
    

    conexion.query(sql_boleta, function(err, resultados, campos)
    {
        if(err) throw err;
        selecTour(parseInt(resultados[1].IDTours))
        console.log(parseInt(resultados[1].IDTours))
        console.log(resultados)
        let arhivo_boleta = `
        
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Document</title>
                <style>
                    body{
                        position: absolute;
                    }
                    div#contenido_total
                    {
                        position: relative;
                        width: 1350px;
                    }
                    .sup{
                        display: flex;
                        
                        margin: 0;
                        width: 1350px;
                        height: 100px;
                        justify-content: center;
                        
                    }
                    input{
                    border: 0px;
                    border-bottom: 1px solid black;
                    margin-right: 5px;
                    }
                    #touridipt{
                        width: 50px;
                    }
                    #touridipt:hover{
                        outline: none;
                    }
                    #touridipt:focus{
                        outline: none;
                    }
                    .logo{
                        height: 110px;
                    width: 110px; 
                    margin-right: 5px;
                    }
                    img{
                        height: 100px;
                        width: 100px;
                    }
                    .titulo{
                    font-family: Arial;
                    font-size: 20px;
                    }
                    .contenedor{
                        display: flex;
                        justify-content: center;
                        padding: 5px;
                        padding-top: 60px;
                    }
                    .subcon{
                        border: 1px solid black;
                        width: 600px;
                    }
                    .NCli{
                        width: 60%;
                    }
                    .Ncli{
                    text-align: center;
                    margin-left: 3px;
                    }
                    .f{
                        width: 40%;
                    }
                    
                    .fecha{
                        display: flex;
                        text-align: center;
                        justify-content: center;
                    }
            
                    .fecha p 
                    {
                        text-decoration: underline;
                        margin: 0 0 0 10px;
                    }
                    .tours{
                        display: flex;
                        justify-content: center;
                    }
                    .ttours{
                        display: flex;
                        justify-content: center;
                    }
                    dl{
                        column-count: 2;
                    }
                    .lt{
                        align-content: inherit;
                    }
                
                    .parteinf{
                        display: flex;
                        justify-content: space-evenly;
                    }
                    .enc{
                        display: flex;
                        flex-direction: column;
                        text-align: center;
                    }
                    .ncli{
                        display: flex;
                        justify-content: center;
                    }
                    .ncli p
                    {
                        text-decoration: underline;
                        margin: 0 0 0 10px;
                    }
                    .can{
                        display: flex;
                        justify-content: center;
                    }
                    .can p
                    {
                        text-decoration: underline;
                        margin: 0 0 0 10px;
                    }
                    .tourid{
                        margin-left: 5px;
                        display: flex;
                    }
                    .tourid p
                    {
                        text-decoration: underline;
                        margin: 0 0 0 10px
                    }
                </style>
            </head>
            <body>
                <div class="sup">
                    <div class="logo">
                        <img src="../carpeta.css/img/logot.png" alt="">
                    </div>
                    <div class="titulo">
                        <h1>Ovayandah Tours</h1>
                    </div>
                    <div class="tourid">
                        <label>N° Reservación</label>
                        <p>${resultados[0].ID}</p>
                    </div>
                </div>  
                <br>
                <div class="contenedor">
                    <br>
                    <div class="subcon">
                        
                        <br>
                        <div class="ncli">
                            <label>Nombre Completo:</label>
                            <p>${resultados[0].NombreCompleto} </p>
                        </div>
                        <br>
                        <div class="can">
                            <label>Cantidad de Clientes:</label>
                            <p>${resultados[0].CantPersonas}</p>
                            
                        </div>
                        <br>
                        <div class="fecha">
                            <label>Fecha de reservación:  </label>
                            <p>${resultados[0].FechaInicio}</p>
                        </div>
                        <br>
                        <div class="fecha">
                            <label>Fecha de finalización:  </label>
                            <p>${resultados[0].FechaFinal}</p>
                        </div>
                        <br>
                        <div class="ttours">
                            <h2>
                                Tours 
                            </h2>
                        </div>
                        <div class="tours">
                                <dl>
                                    <dt><input type="checkbox"  ${cbSnorkelScubba} class="lt"> Skorkel-Scubba </li>
                                    <dt><input type="checkbox"  ${cbParaSki} class="lt"> Para Sky</li>
                                    <dt><input type="checkbox"  ${cbSkyswimSnork} class="lt"> Skyswim & Snorkel</li>
                                    <dt><input type="checkbox"  ${cbZooDay} class="lt"> Zoo Day </li>
                                    <dt><input type="checkbox"  ${cbCanoDiving} class="lt"> Cano Diving</li>
                                    <dt><input type="checkbox"  ${cbSeatreking} class="lt"> Seatreking</li>
                                    <dt><input type="checkbox"  ${cbFishingDay} class="lt"> Fishing Day</li>
                                    <dt><input type="checkbox"  ${cbSurfTurf} class="lt"> Surf and turf</li>
                                    <dt><input type="checkbox"  ${cbATVDay} class="lt"> ATV Day</li>
                                    <dt><input type="checkbox"  ${cbWindsurf} class="lt"> Windsurf-up</li>
                                    <dt><input type="checkbox"  ${cbSwimmingDolphins} class="lt"> Swimming with Dolphins</li>
            
                                </ul>
                        </div>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <div class="parteinf">
                            <div class="enc">
                                <input type="text" value = "${resultados[1].NombreEmpleado}">
                                <span>Empleado Encargado</span>
                            </div>
                            <div class="enc">
                                <input type="text" value = "${resultados[0].NombreEmpleado}">
                                <span>Empledo Encargado</span>
                            </div>
                            <div class="enc">
                                <input type="text" value="${resultados[0].FechaCreacion}">
                                <span>Fecha Creacion</span>
                            </div>
                        </div>
                        <br>
                    </div>
                </div>
            </body>
        </html>`

        //guardando la plantilla con la informacion de la reservacion
        fs.writeFile(dir_boleta, arhivo_boleta,function(err)
        {
            if (err) {
                toastr.error('No se pudo generar la boleta', {
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
                return
            }
            console.log("Se puedo guardar con exito");
            
        let direccion = __dirname; //obteniendo direccion desde la raiz a la carpeta del programa
        let file = 'boleta.html' // archivo de la plantilla de la boleta

        const fullpath = direccion + '/boletas/' + file; //direccion completa hasta la plantilla del pdf
        (async () =>
        {
            const url = 'file://' + fullpath ; //url del ubicacion de la plantilla del pdf
            const browser = await pup.launch({
                headless:true,
                defaultViewport: null
            });

            const page = await browser.newPage();
            await page.goto(url, {waitUntil:"load"}); //se va carga la plantilla del pdf
            let boleta_pdf = `RES-${resultados[0].ID}.pdf` //nombre de la boleta
            await page.pdf({path: "./boletas/"+ boleta_pdf}); //guardando el pdf

            await browser.close(); 
            sendMail(boleta_pdf);
        })();
        toastr.success('La boleta ha sido enviada con exito!!', {
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
              }
        )
        //boleta creada exitosamente
    })
     //llamando la funcion para mandar el correo
})
}


//utilizada para seleccionar la opcion en plantilla_pdf
function selecTour(id)
{
    switch (id)
    {
        case 1:
            cbSnorkelScubba += `checked`
            break
        case 2:
            cbParaSki += `checked`
            break
        case 3:
            cbSkyswimSnork += `checked`
            break
        case 4: 
            cbZooDay += `checked`
            break
        case 5:
            cbCanoDiving += `checked`
            break
        case 6:
            cbSeatreking += `checked`
            break
        case 7:
            cbFishingDay += `checked`
            break
        case 8:
            cbSurfTurf += `checked`
            break
        case 9:
            cbATVDay += `checked`
            break
        case 10:
            cbWindsurf += `checked`
            break
        case 11:
            cbSwimmingDolphins += `checked`
            break
    }
}

function validacionModal(fechaInicio, fechaFinal, primer_nombre, primer_apellido, correo, verificacion_correo,
    cantidad_personas, telefono)
{
    const regex_fecha = /^[0-3]?[0-9]\/[01]?[0-9]\/[12][90][0-9][0-9]$/;
    const hasNumber = /\d/;
    const regex_correo = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const regex_telefono = /^\(?([0-9]{4})\)?[-. ]?([0-9]{4})$/;
    //validando campos en el modal
    if (fechaInicio === "" && !fechaInicio.match(regex_fecha))
    {
        toastr.error('Fecha inadecuada', {
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
        console.log("Fecha de inicio no valido");
        return false;
    }
    else if (fechaFinal === "" && !fechaFinal.match(regex_fecha))
    {
        toastr.error('Esta fecha es invalida', {
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
        console.log("Fecha de finalizacion no valida");
        return false;
    }
    else if (primer_nombre === "")
    {
        toastr.error('Complete el nombre por favor', {
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
        console.log('Primer nombre no valido');
        return false;
    }
    else if (hasNumber.test(primer_nombre))
    {
        toastr.error('No se puede tener numeros en este campo', {
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
        console.log("primer nombre no valido");
        return false;
    }

    else if (primer_apellido === "")
    {
        toastr.error('Ponga el apellido del cliente', {
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
        console.log('Primer apellido no valido');
        return false;
    }
    else if (hasNumber.test(primer_apellido))
    {
        toastr.error('No se puede tener numeros en este campo', {
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
        console.log ("Primer apellido no valido");
        return false;
    }
    else if (correo === "" && !correo.match(regex_correo))
    {
        toastr.error('Correo No valido', {
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
        console.log ("Correo no valido");
        return false;
    }
    else if (verificacion_correo === "" && !verificacion_correo.match(regex_correo))
    {toastr.error('Agrege los caracteres faltantes', {
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
        console.log("Verificacion de Correo no valido");
        return false;
    }
    else if (correo !== verificacion_correo)
    {
        toastr.error('Los correos no son los mismos', {
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
        console.log ("Los correos no son los mismos");
        return false;
    }
    else if (cantidad_personas === "")
    {
        toastr.error('Ingrese una cantidad de personas', {
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
        console.log("No ha especificado la cantidad de personas");
        return false;
    }
    else if (telefono === "" && telefono.match(regex_telefono))
    {
        toastr.error('Ingrese un numero de telefono', {
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
        console.log("Telefono no valido");
        return false;
    }
    return true;
}