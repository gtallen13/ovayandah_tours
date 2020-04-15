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

/*JS DE ELEGIR EMPLEADOS POR RAZONES QUE NUNCA PUTA FUNCION LO PUSE AQUI MANDI DISCULPAME NO PUDE SOLUCIONAR ESO PERO ERROR MIO LO ACEPCTO QUE FALLE*/
var x, i, j, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("combo-box");
for (i = 0; i < x.length; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    /*for each element, create a new DIV that will act as the selected item:*/
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /*for each element, create a new DIV that will contain the option list:*/
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < selElmnt.length; j++) {
        /*for each option in the original select element,
        create a new DIV that will act as an option item:*/
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function (e) {
            /*when an item is clicked, update the original select box,
            and the selected item:*/
            var y, i, k, s, h;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            h = this.parentNode.previousSibling;
            for (i = 0; i < s.length; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName("same-as-selected");
                    for (k = 0; k < y.length; k++) {
                        y[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");
                    break;
                }
            }
            h.click();
        });
        b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
        /*when the select box is clicked, close any other select boxes,
        and open/close the current select box:*/
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {
    /*a function that will close all select boxes in the document,
    except the current select box:*/
    var x, y, i, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    for (i = 0; i < y.length; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < x.length; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);

var y, w, j, selElmnt, a, u, d;
/*look for any elements with the class "custom-select":*/
y = document.getElementsByClassName("combo-box_1");
for (w = 0; w < y.length; w++) {
    selElmnt = y[w].getElementsByTagName("select")[0];
    /*for each element, create a new DIV that will act as the selected item:*/
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected_1");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    y[w].appendChild(a);
    /*for each element, create a new DIV that will contain the option list:*/
    u = document.createElement("DIV");
    u.setAttribute("class", "select-items_1 select-hide_1");
    for (j = 1; j < selElmnt.length; j++) {
        /*for each option in the original select element,
        create a new DIV that will act as an option item:*/
        d = document.createElement("DIV");
        d.innerHTML = selElmnt.options[j].innerHTML;
        d.addEventListener("click", function (e) {
            /*when an item is clicked, update the original select box,
            and the selected item:*/
            var y, x, k, z, h;
            z = this.parentNode.parentNode.getElementsByTagName("select")[0];
            h = this.parentNode.previousSibling;
            for (x = 0; x < z.length; x++) {
                if (z.options[x].innerHTML == this.innerHTML) {
                    z.selectedIndex = x;
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName("same-as-selected_1");
                    for (k = 0; k < y.length; k++) {
                        y[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected_1");
                    break;
                }
            }
            h.click();
        });
        u.appendChild(d);
    }
    y[w].appendChild(u);
    a.addEventListener("click", function (e) {
        /*when the select box is clicked, close any other select boxes,
        and open/close the current select box:*/
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide_1");
        this.classList.toggle("select-arrow-active_1");
    });
}
function closeAllSelect(elmnt) {
    /*a function that will close all select boxes in the document,
    except the current select box:*/
    var x, s, i, arrNo = [];
    x = document.getElementsByClassName("select-items_1");
    s = document.getElementsByClassName("select-selected_1");
    for (i = 0; i < s.length; i++) {
        if (elmnt == s[i]) {
            arrNo.push(i)
        } else {
            s[i].classList.remove("select-arrow-active_1");
        }
    }
    for (i = 0; i < x.length; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide_1");
        }
    }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);