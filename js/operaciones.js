var logo = 0;
var papeleria = 0;
var cajas = 0;
var branding = 0;
var tipo = "";
var resultadoLogos = 0;
var resultadoPapeleria = 0;
var resultadoCajas = 0;
var resultadoBranding = 0;
var total = 0;
var d = document;
var presupuesto;
var nombre;
var email;

const precioLogo = 30000;
var precioPapeleria = 0;
var precioCajas = 0;
var precioBranding = 0;
const descuento = 0.90;
const iva = 0.21;

var solicitanteJSON = {
    "nombre": "", "email": "", "total": null, "logotipo": "", "papeleria": "",
    "cajas": "", "branding": "", "tituloLogotipo": null, "tituloPapeleria": "", "tituloCajas": "",
    "tituloBranding": "", "cotizar": "", "info": ""
};

function solicitarLogo() {
    tipo = "LOGOTIPO";
    logo = d.getElementById("logotipo").value;
    resultadoLogos = calculos(logo, tipo, precioLogo);
    return resultadoLogos;
}

function solicitarPapeleria() {
    tipo = "Combos de PAPELERÍA";

    papeleria = document.querySelector('#papeleria').value;

    filtroPrecioPapeleria = productosPapeleria.find(elem => elem.seleccion.toUpperCase() == papeleria);
    if (filtroPrecioPapeleria) {
        console.log("Combo Papelería seleccionado: " + papeleria + " | Precio:  " + filtroPrecioPapeleria.precio);
        precioPapeleria = parseInt(filtroPrecioPapeleria.precio);
        cantidad = 1;
    } else {
        console.log("No seleccionó Papelería: " + papeleria);
        cantidad = 0;
    }

    resultadoPapeleria = calculos(cantidad, tipo, precioPapeleria);

    return resultadoPapeleria;
}

function solicitarCajas() {
    tipo = "Combos de EMPAQUE";

    cajas = document.querySelector('#cajas').value;

    filtroPrecioCajas = productosCajas.find(elem => elem.seleccion.toUpperCase() == cajas);
    if (filtroPrecioCajas) {
        console.log("Combo Cajas seleccionado: " + cajas + " | Precio:  " + filtroPrecioCajas.precio);
        precioCajas = parseInt(filtroPrecioCajas.precio);
        cantidad = 1;
    } else {
        console.log("No seleccionó Cajas: " + cajas);
        cantidad = 0;
    }


    resultadoCajas = calculos(cantidad, tipo, precioCajas);
    return resultadoCajas;
}

function solicitarBranding() {
    tipo = "Combos de Branding";

    branding = document.querySelector('#branding').value;

    filtroPrecioBranding = productosBranding.find(elem => elem.seleccion.toUpperCase() == branding);
    if (filtroPrecioBranding) {
        console.log("Combo Branding seleccionado: " + branding + " | Precio:  " + filtroPrecioBranding.precio);
        precioBranding = parseInt(filtroPrecioBranding.precio);
        cantidad = 1;
    } else {
        console.log("No seleccionó Branding: " + branding);
        cantidad = 0;
    }

    resultadoBranding = calculos(cantidad, tipo, precioBranding);
    return resultadoBranding;
}

function Cotizacion(cantLogo, cantPapeleria, cantCajas, cantBranding) {
    this.cantLogo = cantLogo;
    this.cantPapeleria = cantPapeleria;
    this.cantCajas = cantCajas;
    this.cantBranding = cantBranding;


    this.composicion = function () {
        console.log("\n\nMi cotización finalmente se compuso de: " +
            "\n\n" + cantLogo + " logotipos" +
            "\n" + cantPapeleria + " Combos de papelería" +
            "\n" + cantCajas + " Combos de cajas" +
            "\n" + cantBranding + " Combos de branding");
    }

    this.cotizar = function () {

        total = resultadoLogos + resultadoPapeleria + resultadoCajas + resultadoBranding;
        totalIva = total + (total * iva);


        console.log("\n\nCOTIZACIÓN FINAL\n\nLOGOS | Cantidad: " + cantLogo + " / Subtotal: " + resultadoLogos + " AR$" +
            "\nCOMBOS DE PAPELERÍA | Cantidad: " + cantPapeleria + " / Subtotal: " + resultadoPapeleria + " AR$" +
            "\nCOMBOS DE EMPAQUE | Cantidad: " + cantCajas + " / Subtotal: " + resultadoCajas + " AR$" +
            "\nCOMBOS DE BRANDING | Cantidad: " + cantBranding + " / Subtotal: " + resultadoBranding + " AR$" +
            "\n\nTOTAL: " + total + " AR$" +
            "\nTOTAL + IVA (21%): " + totalIva + " AR$");

    }
}


function remover() {
    $("#formulario")[0].reset();
    console.log("JQUERY - Se reinicia el formulario")
}

function totalCotizacion() {

    if (($('#nombre').val().length > 0 && $('#email').val().length > 0 && $('#logotipo').val().length > 0) && validarEmail($('#email').val()) == true) {

        solicitarLogo();
        solicitarPapeleria();
        solicitarCajas();
        solicitarBranding();

        var miCotizacion = new Cotizacion(logo, papeleria, cajas, branding);
        miCotizacion.cotizar();

        guardarJSON(totalIva);
        mostrarSTORAGE();
        recuperarJSON();

        const mostrarTodo = document.querySelector('#presupuesto div')
        if (mostrarTodo != null) {
            mostrarTodo.remove();
        }

        agregar();

        return true;
    } else {


        if (!$('#nombre').val().length) {
            alert("Ingresa tu nombre");
            $('#nombre').focus();
        } else {
            if (!$('#email').val().length) {
                alert("Ingresa tu correo electrónico");
                $('#email').focus();
            } else {
                if (!$('#logotipo').val().length && $('#componentes').css('display') == 'none') {
                    alert('Debes hacer clic en "Siguiente"');
                    $('#logotipo').focus();

                } else {
                    if (!$('#logotipo').val().length) {
                        alert("Ingresa al menos la cantidad de logotipos");
                        $('#logotipo').focus();

                    }
                }
            }
        }

        return false;
    }
}


function guardarJSON(total) {

    solicitanteJSON.nombre = d.getElementById('nombre').value;
    solicitanteJSON.email = d.getElementById('email').value;
    solicitanteJSON.total = total;

    solicitanteJSON.logotipo = d.getElementById("logotipo").value;
    solicitanteJSON.papeleria = d.getElementById("papeleria").value;
    solicitanteJSON.cajas = d.getElementById("cajas").value;
    solicitanteJSON.branding = d.getElementById("branding").value;
    solicitanteJSON.tituloLogotipo = d.getElementById("tituloLogotipo").value;
    solicitanteJSON.tituloPapeleria = d.getElementById("tituloPapeleria").value;
    solicitanteJSON.tituloCajas = d.getElementById("tituloCajas").value;
    solicitanteJSON.tituloBranding = d.getElementById("tituloBranding").value;
    solicitanteJSON.cotizar = d.getElementById("cotizar").value;
    solicitanteJSON.info = d.getElementById("info").value;

    sessionStorage.setItem('DatosPersonales', btoa(JSON.stringify(solicitanteJSON)));
}

function recuperarJSON() {

    solicitanteJSON = JSON.parse(atob(sessionStorage.getItem('DatosPersonales')));

    d.getElementById('nombre').value = solicitanteJSON.nombre.toUpperCase();
    d.getElementById('email').value = solicitanteJSON.email;

    console.log("\n\nSOLICITANTE EN SESIÓN:");
    console.log("\n\Nombre: " + solicitanteJSON["nombre"] +
        "\nCorreo electrónico: " + solicitanteJSON["email"] +
        "\nTotal + IVA: " + solicitanteJSON["total"] + " AR$\n");
}

function mostrarSTORAGE() {
    console.log("\n\nMostrando eL sessionStorage codificado:\n\n" + sessionStorage.getItem('DatosPersonales'));
}

function agregar() {

    var elementoCotizacion; var elementoNombre; var elementoEmail;
    var elementoLogo; var elementoPapeleria; var elementoCajas;
    var elementoBranding; var elementoTotal; var elementoTotalIva;
    var espacioBr; var separadorHr;

    presupuesto = d.getElementById("presupuesto");
    nombre = d.getElementById("nombre");
    email = d.getElementById("email");

    elementoCotizacion = d.createElement("h1")
    elementoNombre = d.createElement("p");
    elementoEmail = d.createElement("p");
    elementoLogo = d.createElement("p");
    elementoPapeleria = d.createElement("p");
    elementoCajas = d.createElement("p");
    elementoBranding = d.createElement("p");
    elementoTotal = d.createElement("h2");
    elementoTotalIva = d.createElement("h2");
    espacioBr = d.createElement("br");

    elementoCotizacion.id = "tituloPresupuesto";
    elementoNombre.id = "nombrePresupuesto";
    elementoEmail.id = "emailPresupuesto";
    elementoLogo.id = "logoPresupuesto";
    elementoPapeleria.id = "papeleriaPresupuesto";
    elementoCajas.id = "cajasPresupuesto";
    elementoBranding.id = "brandingPresupuesto";
    elementoTotal.id = "totalPresupuesto";
    elementoTotalIva.id = "totalIvaPresupuesto";

    elementoCotizacion.innerText = "Presupuesto Final";
    elementoNombre.innerText = "Nombre: " + nombre.value;
    elementoEmail.innerText = "Correo electrónico: " + email.value;
    elementoLogo.innerText = "Logotipos: " + logo + " / " + resultadoLogos + " AR$";
    elementoPapeleria.innerText = "Papelería: " + papeleria.toLowerCase() + " / " + resultadoPapeleria + " AR$";
    elementoCajas.innerText = "Cajass: " + cajas.toLowerCase() + " / " + resultadoCajas + " AR$";
    elementoBranding.innerText = "Branding: " + branding.toLowerCase() + " / " + resultadoBranding + " AR$";
    elementoTotal.innerText = "TOTAL: " + total + " AR$";
    elementoTotalIva.innerText = "TOTAL + IVA (21%): " + totalIva + " AR$";

    const divResultado = document.createElement('div');
    divResultado.id = "divResultado";

    divResultado.appendChild(elementoCotizacion);
    divResultado.appendChild(elementoNombre);
    divResultado.appendChild(elementoEmail);
    divResultado.appendChild(elementoLogo);
    divResultado.appendChild(elementoPapeleria);
    divResultado.appendChild(elementoCajas);
    divResultado.appendChild(elementoBranding);
    divResultado.appendChild(elementoTotal);
    divResultado.appendChild(elementoTotalIva);
    divResultado.appendChild(espacioBr);

    presupuesto.appendChild(divResultado);
}

function arregloResumenCantidades() {
    var partesCotizacion = [];
    partesCotizacion.push("Logotipos: " + logo);
    partesCotizacion.push("Combo Papeleria: " + papeleria);
    partesCotizacion.push("Combo Cajas: " + cajas);
    partesCotizacion.push("Combo Branding: " + branding);
    partesCotizacion = partesCotizacion.join(" / ");
    return partesCotizacion;
}


function noEsNumero(numero, tipo) {
    if (isNaN(numero) || numero < 0) {
        alert("Debes ingresar una Cantidad de " + tipo + " válido\nHaz una nueva solicitud");
    }
}

function calculos(cantidad, tipo, precio) {
    let resultado;
    if (cantidad == 1 || cantidad == 0) {
        resultado = cantidad * precio;
        console.log("Cantidad de " + tipo + ": " + cantidad + " | Precio: " + resultado + " AR$");
    }
    if (cantidad > 1) {
        resultado = cantidad * (precio * descuento);
        console.log("Cantidad de " + tipo + ": " + cantidad + " | Precio: " + resultado + " AR$");
    }
    return resultado;
}

function validarEmail(valor) {
    if (/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(valor)) {
        return true;
    } else {
        alert("La dirección correo electrónico es incorrecta.");
        $('#email').focus();
        return false;
    }
}

document.addEventListener('DOMContentLoaded', router)
window.addEventListener('hashchange', router)

const PaginaAjaxTestimonios = {
    render: function () {
        $.ajax({
            type: 'GET',
            url: 'js/testimonios.json',
            dataType: 'json',
            success: function (data, status, jqXHR) {
                console.log(jqXHR)
                let llenado = ''
                for (const persona of data) {

                    llenado += `
                    <div>
                        <h1 class="first"><br>${persona.first_name} ${persona.last_name}</h1>
                        <p class="testimonios">"${persona.testimonio}"</p>
                        <h2 class="first">${persona.email}</h2><br>
                    </div>`

                }

                $('#pages').html(`
                <div class="frame resaltadoTestimonios">
                ${llenado}
                </div>
                <div class="frame">
                <br><img src="image/thankyouline.png" alt="">
                </div>
                `)

                console.log(`AJAX Testimonios -> Status: ${status}`)

            },
            error: function (jqXHR) {
                console.log(jqXHR)
            }
        })

    }
}

const PaginaSolicitudes = {
    render: function () {
        return formularioHTML;
    }
}

const HomePage = {
    render: function () {
        return `
        <div id="inicio">
        </div>
        `;
    }
}

const ErrorComponent = {
    render: function () {
        return `
        <div id="error">
            <br>
            <h1 class="first">:(</h1>
            <p class="footer">--- Contenido no encontrado ---</p>
            <br>
            <br>
        </div>
        `;
    }
}

const routes = [
    { path: '/solicitudes', component: PaginaSolicitudes },
    { path: '/', component: HomePage },
    { path: '/testimonios', component: PaginaAjaxTestimonios }
]

const parseLocation = () => location.hash.slice(1).toLowerCase() || '/'

const findComponent = function (path, routes) {
    return routes.find(routes => routes.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;
}

function router() {

    const path = parseLocation();
    console.log("SPA - este es el path: " + path)
    const { component = ErrorComponent } = findComponent(path, routes) || {}
    $('#pages').html(component.render())
    return path;

}

function cargarContenido(array, select) {
    array.forEach(element => {
        const option = document.createElement('option');
        option.value = element.toUpperCase();
        option.textContent = element;
        select.appendChild(option);
    })
}

function listaSelect(array, key) {
    let listado = [];
    array.forEach(elem => {
        if (!listado.includes(elem[key])) {
            listado.push(elem[key])
        }
    })
    return listado.sort();
}

$(function () {
    $('html body').on({
        keypress: function (event) {
            if (event.keyCode === 13) {
                if ($('#nombre').val().length == "") {
                    console.log("JQUERY - Debe ingresar su nombre")
                    $('#nombre').focus();
                } else {
                    if ($('#email').val().length == "") {
                        console.log("JQUERY - Debe ingresar un correo electrónico")
                        $('#email').focus();
                    } else {
                        if ($('#logotipo').val().length == "") {
                            console.log("JQUERY - Debe ingresar la cantidad de logotipos")
                            $('#logotipo').focus();
                        }
                    }
                }
            }
        }
    });



    $('div #pages').on("mouseenter", 'legend#info', function () {
        $(this).css("background-color", "blue")
        console.log("JQUERY - Entrando al Legend SIGUIENTE")
    });

    $('div #pages').on("mouseleave", 'legend#info', function () {
        $(this).css("background-color", "black")
    });

    $('div #pages').on("mouseover", 'legend#info', function () {
        $(this).css("cursor", "pointer")
    });


    $('div #pages').on("focus", 'input#nombre', function () {
        $(this).css("background-color", 'beige')
    });

    $('div #pages').on("blur", 'input#nombre', function () {
        $(this).css("background-color", '#E0F2F1')
    });

    $('div #pages').on("focus", 'input#email', function () {
        $(this).css("background-color", 'beige')
    });

    $('div #pages').on("blur", 'input#email', function () {
        $(this).css("background-color", '#E0F2F1')
    });

    $('div #pages').on("focus", 'input#logotipo', function () {
        $(this).css("background-color", 'beige')
    });
    $('div #pages').on("blur", 'input#logotipo', function () {
        $(this).css("background-color", '#E0F2F1')
    });

    $('div #pages').on("focus", 'select#papeleria', function () {
        $(this).css("background-color", 'beige')
    });
    $('div #pages').on("blur", 'select#papeleria', function () {
        $(this).css("background-color", '#E0F2F1')
    });

    $('div #pages').on("focus", 'select#cajas', function () {
        $(this).css("background-color", 'beige')
    });
    $('div #pages').on("blur", 'select#cajas', function () {
        $(this).css("background-color", '#E0F2F1')
    });

    $('div #pages').on("focus", 'select#branding', function () {
        $(this).css("background-color", 'beige')
    });
    $('div #pages').on("blur", 'select#branding', function () {
        $(this).css("background-color", '#E0F2F1')
    });

    $('div #pages').on("mouseenter", 'label#tituloLogotipo', function () {
        $('input#logotipo').css("background-color", "beige")
    });
    $('div #pages').on("mouseleave", 'label#tituloLogotipo', function () {
        $('input#logotipo').css("background-color", '#E0F2F1')
    });
    $('div #pages').on("mouseover", 'label#tituloLogotipo', function () {
        $(this).css("cursor", "pointer")
    });

    $('div #pages').on("mouseenter", 'label#tituloPapeleria', function () {
        $('select#papeleria').css("background-color", 'beige')
    });
    $('div #pages').on("mouseleave", 'label#tituloPapeleria', function () {
        $('select#papeleria').css("background-color", '#E0F2F1')
    });
    $('div #pages').on("mouseover", 'label#tituloPapeleria', function () {
        $(this).css("cursor", "pointer")
    });

    $('div #pages').on("mouseenter", 'label#tituloCajas', function () {
        $('select#cajas').css("background-color", 'beige')
    });
    $('div #pages').on("mouseleave", 'label#tituloCajas', function () {
        $('select#cajas').css("background-color", '#E0F2F1')
    });
    $('div #pages').on("mouseover", 'label#tituloCajas', function () {
        $(this).css("cursor", "pointer")
    });
    $('div #pages').on("mouseenter", 'label#tituloBranding', function () {
        $('select#branding').css("background-color", 'beige')
    });
    $('div #pages').on("mouseleave", 'label#tituloBranding', function () {
        $('select#branding').css("background-color", '#E0F2F1')
    });
    $('div #pages').on("mouseover", 'label#tituloBranding', function () {
        $(this).css("cursor", "pointer")
    });


    $('div #pages').on('click', 'legend#info', function () {


        console.log("JQUERY - Activo Ventana con Información de Precios")
        alert("LISTADO DE PRECIOS:\n\n" +
            "DISEÑO DE LOGOTIPO\n" +
            "-1 Logotipo | Precio: " + precioLogo + " $\n" +
            "Descuento del 10% para cantidades superiores a 1 logo\n\n" +
            "COMBOS DE PAPELERÍA:\n" +
            "-25 hojas, 25 sobres, 25 tarjetas, 25 carpetas | Precio: 3000 AR$\n" +
            "-50 hojas, 50 sobres, 50 tarjetas, 50 carpetas | Precio: 6000 AR$\n" +
            "-100 hojas, 100 sobres, 100 tarjetas, 100 carpetas | Precio: 12000 AR$\n\n" +
            "COMBOS DE CAJAS:\n" +
            "-25 cajas | Precio: 5000 AR$\n" +
            "-50 cajas | Precio: 10000 AR$\n" +
            "-100 cajas | Precio: 20000 AR$\n\n" +
            "COMBOS DE BRANDING:\n" +
            "-10 gorras, 10 lapiceras, 10 libretas | Precio: 6000 AR$\n" +
            "-20 gorras, 20 lapiceras, 20 libretas | Precio: 12000 AR$\n" +
            "-30 gorras, 30 lapiceras, 30 libretas | Precio: 18000 AR$\n\n");

        $('#componentes').slideDown(2000, function () {
            console.log('JQUERY - Mostrando los componentes de la cotización');
            $('html, body').animate({
                scrollTop: $("#componentes").offset().top
            }, 1000)
            console.log("JQUERY - Bajando con scroll a los componenetes")



            const selectPapeleria = document.getElementById('papeleria');
            console.log("selectPapeleria: " + selectPapeleria.id);
            const optionPapeleria = listaSelect(productosPapeleria, "seleccion");
            cargarContenido(optionPapeleria, selectPapeleria);

            const selectCajas = document.getElementById('cajas');
            console.log("selectCajas: " + selectCajas.id);
            const optionCajas = listaSelect(productosCajas, "seleccion");
            cargarContenido(optionCajas, selectCajas);


            const selectBranding = document.getElementById('branding');
            console.log("selectBranding: " + selectBranding.id);
            const optionBranding = listaSelect(productosBranding, "seleccion");
            cargarContenido(optionBranding, selectBranding);
        });

    });


    $('div #pages').on('click', 'button#cotizar', function (e) {
        e.preventDefault();
    });


    $('div #pages').on('click', 'button#cotizar', function () {
        if (totalCotizacion()) {

            $('#indicacion').fadeOut('slow');
            console.log('\nJQUERY - Oculto el div "Acá se mostrará el resultado"')
            console.log('Se agregan los elementos de la cotización')

            $('#presupuesto').show('slow', function () {
                console.log("JQUERY - Se muestra el div de Presupuesto")
            });


            $('#adicional').show('slow', function () {
                console.log("JQUERY - Se muestra el div de Agradecimiento")

                $('html, body').animate({
                    scrollTop: $("#presupuesto").offset().top + 100
                }, 1000)


                console.log("JQUERY - Bajo hasta el resultado de la cotización")
            });
            const divAdicional = $('#adicional');
            divAdicional.empty();

            $.ajax({
                url: 'js/adicional.json',
                success: function (data, status, jqXHR) {
                    data.forEach(element => {
                        divAdicional.append(`<br><img class="imgAjax" src="${element.imagen}" alt="">`)
                        console.log("AJAX - Thank you picture: " + element.imagen)
                    });
                    console.log(`AJAX Status: ${status}`)

                },
                error: function (jqXHR, status, error) {
                    console.log("Error")
                    console.log(jqXHR)
                    console.log(`Error -> Status: ${status} - Error: ${error}`)
                }
            })

        }

    });

})