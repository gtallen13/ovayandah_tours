const Chart = require('chart.js');
let myChart = document.getElementById('chart').getContext('2d');
let arrUbicaciones = []
let arrCantReservaciones_ubicaciones = []
let arrTours =  []
let arrCantReservaciones_tours = []
let arrActividades = []
let arrCantReservaciones_actividades = []




Chart.defaults.global.defaultFontColor = 'orange'

//ubicaciones con mas reservaciones
let sql_ubcacionesTop = 
`select u.nombre Ubicacion, count(u.id) CantidadReservaciones from
reservaciones r
join tours t 
    on r.tours_id = t.id
join tours_ubicaciones tu
    on t.id = tu.id_ubicaciones
join ubicaciones u 
    on tu.id_ubicaciones = u.id
group by r.tours_id
order by count(r.tours_id) desc
limit 5;`;

let sql_toursTop = 
`select t.nombre NombreTour, count(r.tours_id) CantidadReservaciones
from reservaciones r
join tours t
    on r.tours_id = t.id
group by tours_id
order by count(tours_id) desc
limit 5;`

let sql_actividadesTop = 
`select a.nombre NombreActividad, count(a.id) CantidadReservaciones from
reservaciones r
join tours t 
	on r.tours_id = t.id
join tours_actividades ta
	on t.id = ta.id_actividad
join actividades a 
	on ta.id_actividad = a.id
group by r.tours_id
order by count(r.tours_id) desc
limit 5;`

//Mostrara un grafico con las top 5 ubicaciones
function ubicacionesTop()
{       
        
        conexion.query(sql_ubcacionesTop, function(err, resultados, fields)
    {
        for (let resultado of resultados)
        {
            arrUbicaciones.push(resultado.Ubicacion); //llenando el arreglo de las ubicaciones
            arrCantReservaciones_ubicaciones.push(resultado.CantidadReservaciones) //llenando el arreglo de las Cantidades Reservadas
        }
        //haciendo el grafico
        let barChart_ubicaciones = new Chart(myChart, {
            type: 'bar',
            data: 
            {
                labels: arrUbicaciones,
                datasets: 
                [{
                    label: '# de Reservaciones',
                    data: arrCantReservaciones_ubicaciones,
                    //to apply different colors to columns just send to color in an array
                    backgroundColor: 'blue',
                    hoverBorderWidth: 3,
                    hoverBorderColor: '#000' 
                }]
            },
            options: 
            {
                title:
                {
                    display: true,
                    text: 'Ubicaciones mas Reservadas',
                    fontSize:25,
                    fontFamily: 'Georgia'
                },
                legend:
                {  
                    display: true,
                    position: 'right',
                    labels:
                    {
                        fontColor:'#000'
                    }   
                },
                layout:
                {
                    padding:
                    {
                        left: 50,
                        right: 0,
                        bottom: 0,
                        top:0
                    }
                }
            }
        });
    });
}

//Mostrara los tours mas populares
function toursTop()
{
    conexion.query(sql_toursTop, function(err, resultados, campos)
    {
        for (let resultado of resultados)
        {
            arrTours.push(resultado.NombreTour)
            arrCantReservaciones_tours.push(resultado.CantidadReservaciones)
        }
            let barChart_tours = new Chart(myChart, {
            type: 'bar',
            data: 
            {
                labels: arrTours,
                datasets: 
                [{
                    label: '# de Reservaciones',
                    data: arrCantReservaciones_tours,
                    //to apply different colors to columns just send to color in an array
                    backgroundColor: 'blue',
                    hoverBorderWidth: 3,
                    hoverBorderColor: '#000' 
                }]
            },
            options: 
            {
                title:
                {
                    display: true,
                    text: 'Tours mas Reservadas',
                    fontSize:25,
                    fontFamily: 'Georgia'
                },
                legend:
                {  
                    display: true,
                    position: 'right',
                    labels:
                    {
                        fontColor:'#000'
                    }   
                },
                layout:
                {
                    padding:
                    {
                        left: 50,
                        right: 0,
                        bottom: 0,
                        top:0
                    }
                }
            }
        });
    })
}


//Mostrara las actividades mas populares
function actividadesTop()
{
    conexion.query(sql_actividadesTop, function(err, resultados, campos)
    {
        for (let resultado of resultados)
        {
            arrActividades.push(resultado.NombreActividad)
            arrCantReservaciones_actividades.push(resultado.CantidadReservaciones)
        }
            let barChart_actividades = new Chart(myChart, {
            type: 'bar',
            data: 
            {
                labels: arrActividades,
                datasets: 
                [{
                    label: '# de Reservaciones',
                    data: arrCantReservaciones_actividades,
                    //to apply different colors to columns just send to color in an array
                    backgroundColor: 'blue',
                    hoverBorderWidth: 3,
                    hoverBorderColor: '#000' 
                }]
            },
            options: 
            {
                title:
                {
                    display: true,
                    text: 'Actividades mas Populares',
                    fontSize:25,
                    fontFamily: 'Georgia'
                },
                legend:
                {  
                    display: true,
                    position: 'right',
                    labels:
                    {
                        fontColor:'#000'
                    }   
                },
                layout:
                {
                    padding:
                    {
                        left: 50,
                        right: 0,
                        bottom: 0,
                        top:0
                    }
                }
            }
        });
    })
}


