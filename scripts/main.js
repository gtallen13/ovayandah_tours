/*Variables de entorno */
const email_user = process.env.EMAIL_USER
const email_password = process.env.EMAIL_PASSWORD
const db_host = process.env.DB_HOST 
const db_user = process.env.DB_USER
const db_database = process.env.DB_DATABASE
const db_password = process.env.DB_PASSWORD

console.log(__dirname + '/carpeta.ccs/img/ovaicn.icns')
/**Configuracion de Librerias a utilizar*/
const Chart = require('chart.js');
const pup = require('puppeteer');
const fs = require('fs');
const nodemailer = require('nodemailer');
const mysql = require('mysql');
const toastr = require('toastr')

const enlaces = document.getElementsByClassName('item-menu');
for (let i = 0; i < enlaces.length; i++) {
    enlaces[i].addEventListener('click', function (e) {
        const idElemento = e.currentTarget.getAttribute('data-elemento');
        const paginas = document.getElementsByClassName('pagina');
        console.log(idElemento)
        for (let j = 0; j < paginas.length; j++) {
            paginas[j].classList.add('esconder');
        }
        document.getElementById(idElemento).classList.remove('esconder');
    });
}