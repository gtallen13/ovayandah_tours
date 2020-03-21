
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


let html = '<p>Thomas Allen</p><p>Empleado</p><p>Horas trabajadas:24hrs</p>'
document.getElementById('emp1').innerHTML = html

html = '<p>Gustavo Cano</p><p>Empleado</p><p>Horas trabajadas:24hrs</p>'
document.getElementById('emp2').innerHTML = html







//Conexion Para login Empleado
const username = document.getElementById('username')
const password = document.getElementById('password')
const btnLogin = document.getElementById('btn-guardar')


btnLogin.addEventListener('click', function(e){
    e.preventDefault()
    let consulta = `select username,contra from empleados where username = ? and contra = ?`
    conexion.query(consulta,[`${username.value}`,`${password.value}`],function(err,filas,campos){
        if (err){
            console.log('Contraseña Invalida')
        } else {
            for (let fila of filas){
                if (fila.username === username.value & fila.contra == password.value){
                    console.log('Usuario correcto')
                    
                } else{
                    console.log('Contraseña Invalida o Usuario Incorrecto')
                }
            }
            
        }
    })
})

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

//Buscar bolet
const txtBusqueda = document.getElementById('btn-guardar') 
txtBusqueda.addEventListener('keyup',function(e) {
    if (e.code === 'Enter'){
        conexion.query(`Select * from film where title like ? or description like ?`,[`%${txtBusqueda.value}%`,`%${txtBusqueda.value}%`],function(err,results,campos) {
            if (err) {
                console.log(`Error`)

                return
            }
            let html ='<table class="tabla-datos">'
            html += '<tr><td>Titulo</td><td>Descripcion</td></tr>'
            for (let fila of results) {
                html += "<tr>"
                html += `<th>${fila.title}</th>`
                html += `<td>${fila.description}</td>`
                html += "</tr>"
            }
            html += '</table>'
            document.getElementById('tabla').innerHTML = html
        })
    }
})