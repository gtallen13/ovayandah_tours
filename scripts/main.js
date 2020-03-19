const enlaces = document.getElementsByClassName('item-menu');
for (let i = 0; i < enlaces.length; i ++)
{
    enlaces[i].addEventListener('click', function(e)
    {
        const idElemento = e.currentTarget.getAttribute('data-elemento');
        const paginas = document.getElementsByClassName('pagina');
        console.log (idElemento)
        for (let j = 0; j < paginas.length; j ++)
        {
            paginas[j].classList.add('esconder');
        }
        document.getElementById(idElemento).classList.remove('esconder');
    });
}