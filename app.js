//Variables Globales
let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

//Esta función no retorna ningún valor
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

//Función para un evento
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value); //getElementById es una función que retorna el objeto por medio del ID.
    
    if(numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p',`¡Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez!' : 'veces!'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        deshabilitarBotonIniciar();
    } else {
        //El usuario no acertó
        if(numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p','El número secreto es menor');
        } else {
            asignarTextoElemento('p','El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();
        posiconarElFoco();
    } 
    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

//Función posicionar el foco del elemento
function posiconarElFoco() {
    let inputElement = document.getElementById('valorUsuario');
    inputElement.focus();    
}

//Función para deshabilitar botón iniciar
function deshabilitarBotonIniciar() {
    let botonIniciar = document.getElementById('verificar');
    botonIniciar.disabled = true;
}

//Función para habilitar el botón iniciar
function habilitarBotonIniciar() {
    let botonIniciar = document.getElementById('verificar');
    botonIniciar.disabled = false;
}

//Función condiciones iniciales
function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del número secreto');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;    
}

//Función con retorno
function generarNumeroSecreto() {
    //Generar número secreto y guardarlo en una variable
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo) + 1;

    //console.log(numeroGenerado);
    //console.log(listaNumerosSorteados);
    //Si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p','Ya se asignaron todos los números posibles');
    } else {
        //Si el número generado está en la lista
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

//Función Reiniciar Juego
function reiniciarJuego() {
    //Limpiar caja
    limpiarCaja();
    //Indicar mensaje de intérvalo de números
    //Generar el número aleatorio
    //Inicializar el número de intentos
    condicionesIniciales();
    //Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');
    //Habilitar el botón Intentar
    habilitarBotonIniciar();
    //Posicionar el foco
    posiconarElFoco();
}


//Llamado de Funciones
condicionesIniciales();
posiconarElFoco();

