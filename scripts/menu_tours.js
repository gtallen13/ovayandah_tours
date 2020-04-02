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

let sql = 'select nombre, precio, descripcion from tours' 
let i = 1;

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
        toursinfo.innerHTML = html_info;
        console.log(`url("./carpeta.css/img/tour${id_tour - 1}.jpg")`)
        tours_imagen.style.backgroundImage = `url("./carpeta.css/img/tour${id_tour}.jpg")`;
    });
}

