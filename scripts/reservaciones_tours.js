const mysql = require ('mysql');
const nodemailer = require('nodemailer');
const fs = require ('fs');
const pup = require('puppeteer');
const conexion = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'toursdb'
});

// correo de donde se enviara
let email = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ovayandah.tours2020@gmail.com',
        pass: 'ThomasCarlosGustavoDavidJorge'
    }
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
        tours_imagen.style.backgroundImage = `url("./carpeta.css/img/tour${id_tour}.jpg")`;
    });
   

    
}

btnReservar.addEventListener('click',function(e){
    e.preventDefault()
    if (txtCorreo.value === txtVerificacionCorreo.value){
        insertarClientes()
        encontrarIdCliente(arr[arr.length - 1])
        
    } else {
        console.log('Revise bien el correo')
        //notificacion
        //correos incorrectos
    }
})



function sendMail()
{
    //Correo que se enviara: destinario y archivos adjuntados
    let mailOptions = {
    from: 'ovayandah.tours2020@gmail.com',
    to: `${txtCorreo.value}`,
    subject: 'Boleta de Reservacion',
    text: 'Disfrute de su tour y gracias por elegir Ovayandah Tours por nosotros te llevamos ovayandah :)',
    attachments:[{
        filename: 'guapeton.pdf',
        path: './boletas/guapeton.pdf'
    }]
};
    email.sendMail(mailOptions,function(err,info)
    {

        if (err) 
        {
            console.log (err);
        }
        console.log(txtCorreo.value);
        console.log('Email sent:' + info.repsonse);
        //notificacion
        //correo enviado con exito
    })
}




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
                        if (err) 
                        {
                            console.log('Error')
                            return;
                            //notificacion
                            //no se pudieron guardar los datos
                        } else {
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
    r.fecha_inicio_tour FechaInicio, r.fecha_final_tour FechaFinal, r.fecha_creacion FechaCreacion, r.tours_id
    from clientes c
    join reservaciones r
        on c.id = r.id_clientes
    order by r.id desc
    limit 1;`
    let dir_boleta = './boletas/boleta.html'
    
    

    conexion.query(sql_boleta, function(err, resultados, campos)
    {
        selecTour(resultados[0].tours_id)
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
                        height: 10%;
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
                                    <dt><input type="radio"  ${cbSnorkelScubba}class="lt"> Skorkel-Scubba </li>
                                    <dt><input type="radio"  ${cbParaSki} class="lt"> Para Sky</li>
                                    <dt><input type="radio"  ${cbSkyswimSnork} class="lt"> Skyswim & Snorkel</li>
                                    <dt><input type="radio"  ${cbZooDay} class="lt"> Zoo Day </li>
                                    <dt><input type="radio"  ${cbCanoDiving} class="lt"> Cano Diving</li>
                                    <dt><input type="radio"  ${cbSeatreking} class="lt"> Seatreking</li>
                                    <dt><input type="radio"  ${cbFishingDay} class="lt"> Fishing Day</li>
                                    <dt><input type="radio"  ${cbSurfTurf} class="lt"> Surf and turf</li>
                                    <dt><input type="radio"  ${cbATVDay} class="lt"> ATV Day</li>
                                    <dt><input type="radio"  ${cbWindsurf} class="lt"> Windsurf-up</li>
                                    <dt><input type="radio"  ${cbSwimmingDolphins} class="lt"> Swimming with Dolphins</li>
            
                                </ul>
                        </div>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <div class="parteinf">
                            <div class="enc">
                                <input type="text" value = "">
                                <span>Tourguide</span>
                            </div>
                            <div class="enc">
                                <input type="text">
                                <span>Transportista</span>
                            </div>
                            <div class="enc">
                                <input type="text">
                                <span>Fecha De Creación</span>
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
            if (err) throw err;
            console.log("Se puedo guardar con exito");
        })
        let direccion = __dirname; //obteniendo direccion desde la raiz a la carpeta del programa
        let file = 'boleta.html' // archivo de la plantilla de la boleta

        const fullpath = direccion + '/boletas/' + file; //direccion completa hasta la plantilla del pdf
        (async () =>
        {
            const url = 'file://' + fullpath ; //url del ubicacion de la plantilla del pdf
            const browser = await pup.launch({
                headless:true
            });

            const page = await browser.newPage();
            await page.goto(url, {waitUntil:"load"}); //se va carga la plantilla del pdf
            let boleta_pdf = `RES-${resultados[0].ID}.pdf` //nombre de la boleta
            await page.pdf({path: "./boletas/"+ boleta_pdf}); //guardando el pdf

            await browser.close(); 
        })();
        //notificacion
        //boleta creada exitosamente
    })
    sendMail(); //llamando la funcion para mandar el correo
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