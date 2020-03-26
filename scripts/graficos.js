const Chart = require('chart.js');
let myChart = document.getElementById('chart').getContext('2d');



let barChart = new Chart(myChart, {
    type: 'bar',
    data: 
    {
        labels: ['Roatan', 'La Ceiba', 'Trujillo', 'Tegucigalpa', 'San Pedro Sula', 'Olachito'],
        datasets: 
        [{
            label: 'Population',
            data: [12901,13900,15500,9000,87000,1500],
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
            text: 'Lugares de Gente mas Sexy',
            fontSize:25,
            fontFamily: 'Georgia'
        },
        legend:
        {
            
        }
    }
});