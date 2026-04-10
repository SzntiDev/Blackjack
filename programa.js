// ============================================================
//  BLACKJACK — programa.js
//  Autores: Agustin Aurellana y Santiago Pérez  |  5°B 2024
// ============================================================

// ── Inicialización de elementos globales ──────────────────
const panelReglas  = document.getElementById("panel-reglas");
const barraAcciones = document.getElementById("barra-acciones");
panelReglas.style.display = "none";

// Variables de cartas
let mazo = [];
let rand, rand2, rand3, rand4, palo, palo2, palo3, palo4, crupier;

// Variables de juego
let puntaje, puntajePasado;
let bandera  = false; // true cuando se activó Doblar
let enJuego  = false; // true mientras hay una mano activa — bloquea el spam de repar()
const AS = 11;

// Dinero
let money = 1000;
let pozo  = 0;

// Elementos del DOM
const modalResultado   = document.getElementById("modal-resultado");
const modalContenido   = document.getElementById("modal-contenido");
const modalTitulo      = document.getElementById("modal-titulo");
const modalDescripcion = document.getElementById("modal-descripcion");
const saldoDisplay     = document.getElementById("saldo-display");
const puntosJugador    = document.getElementById("puntos-jugador");
const puntosCrupier    = document.getElementById("puntos-crupier");
const btnRepartir      = document.getElementById("btn-repartir");
const btnDoblar        = document.getElementById("btn-doblar");
const btnDividir       = document.getElementById("btn-dividir");
const manoJugador      = document.getElementById("mano-jugador");
const manoCrupier      = document.getElementById("mano-crupier");

// ── Estado inicial de la UI ───────────────────────────────
saldoDisplay.innerHTML = money + " $";
document.getElementById("btn-pedir").style.display     = "none";
document.getElementById("btn-plantarse").style.display = "none";
btnDoblar.style.display   = "none";
btnDividir.style.display  = "none";
modalResultado.style.display = "none";
document.getElementById("btn-continuar").style.display = "none";
manoJugador.style.display = "flex";


// ============================================================
//  HELPERS DE ANIMACIÓN
// ============================================================

/**
 * Muestra el modal de resultado con animación de entrada.
 */
function mostrarModal() {
  modalResultado.classList.remove("ocultando", "visible");
  void modalResultado.offsetWidth;
  modalResultado.style.display = "flex";
  modalResultado.classList.add("visible");
  // El .modal-contenido arranca con opacity:0 en CSS para el
  // fade-in de la imagen de fondo, así que hay que ponerlo en 1
  setTimeout(() => { modalContenido.style.opacity = 1; }, 50);
}

/**
 * Oculta el modal con animación de salida y ejecuta un callback al terminar.
 * @param {Function} callback - función a ejecutar después de que la animación termina
 */
function ocultarModal(callback) {
  modalResultado.classList.remove("visible");
  modalResultado.classList.add("ocultando");
  setTimeout(() => {
    modalResultado.style.display = "none";
    modalResultado.classList.remove("ocultando");
    if (callback) callback();
  }, 300);
}

/**
 * Hace pulsar el marcador de puntos con un brillo dorado.
 * @param {HTMLElement} el - el elemento marcador a pulsar
 */
function pulsarMarcador(el) {
  el.classList.remove("puntos-actualizados");
  void el.offsetWidth;
  el.classList.add("puntos-actualizados");
}

/**
 * Hace vibrar la mano del jugador (animación de derrota).
 */
function sacudirManoJugador() {
  manoJugador.classList.remove("shake");
  void manoJugador.offsetWidth;
  manoJugador.classList.add("shake");
  setTimeout(() => manoJugador.classList.remove("shake"), 600);
}

/**
 * Hace brillar la mano del jugador en dorado (animación de victoria).
 */
function brillarVictoria() {
  manoJugador.classList.remove("ganando");
  void manoJugador.offsetWidth;
  manoJugador.classList.add("ganando");
  setTimeout(() => manoJugador.classList.remove("ganando"), 900);
}

/**
 * Anima las 4 cartas iniciales con un delay secuencial de 100ms
 * entre cada una para que lleguen una tras otra.
 */
function animarCartasIniciales() {
  const ids = ["carta-jugador-1", "carta-jugador-2", "carta-oculta", "carta-visible-crupier"];
  ids.forEach((id, i) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove("repartida");
    el.style.animationDelay = (i * 100) + "ms";
    void el.offsetWidth;
    el.classList.add("repartida");
  });
}

// ── Lógica de Mazo (Deck) ──────────────────────────────

/**
 * Crea las 52 cartas del mazo (13 números x 4 palos).
 */
function crearMazo() {
  mazo = [];
  for (let n = 1; n <= 13; n++) {
    for (let p = 1; p <= 4; p++) {
      mazo.push({ numero: n, palo: p });
    }
  }
}

/**
 * Mezcla el mazo usando el algoritmo Fisher-Yates.
 */
function mezclarMazo() {
  for (let i = mazo.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mazo[i], mazo[j]] = [mazo[j], mazo[i]];
  }
}

/**
 * Saca una carta del mazo. Si el mazo está vacío, lo regenera.
 * @returns {Object} carta - objeto con {numero, palo}
 */
function sacarCarta() {
  if (mazo.length === 0) {
    crearMazo();
    mezclarMazo();
  }
  return mazo.pop();
}


// ============================================================
//  FUNCIONES DE JUEGO
// ============================================================

function repar() {
  if (enJuego) return; // bloquea llamadas múltiples mientras hay mano activa
  enJuego = true;

  // ── Sacar cartas del mazo real ──────────────────────
  const c1 = sacarCarta();
  const c2 = sacarCarta();
  const c3 = sacarCarta();
  const c4 = sacarCarta();

  rand  = c1.numero; palo  = c1.palo;
  rand2 = c2.numero; palo2 = c2.palo;
  rand3 = c3.numero; palo3 = c3.palo;
  rand4 = c4.numero; palo4 = c4.palo;

  // ── Asignar imágenes ────────────────────────────────
  document.getElementById("carta-jugador-1").src      = "img/" + rand  + palo  + ".png";
  document.getElementById("carta-jugador-2").src      = "img/" + rand2 + palo2 + ".png";
  document.getElementById("carta-oculta").src         = "img/trasera.png";
  document.getElementById("carta-visible-crupier").src = "img/" + rand4 + palo4 + ".png";

  animarCartasIniciales();

  // ── Convertir figuras y Ases a su valor numérico ────
  if (rand4 === 11 || rand4 === 12 || rand4 === 13) rand4 = 10;
  if (rand  === 11 || rand  === 12 || rand  === 13) rand  = 10;
  if (rand2 === 11 || rand2 === 12 || rand2 === 13) rand2 = 10;
  if (rand  === 1) rand  = AS;
  if (rand2 === 1) rand2 = AS;

  puntajePasado = rand + rand2;
  puntaje       = (rand === AS ? 1 : rand) + (rand2 === AS ? 1 : rand2);

  // ── Mostrar marcadores con pulso ────────────────────
  puntosJugador.style.display  = "flex";
  puntosCrupier.style.display  = "flex";
  puntosJugador.innerHTML      = "<p>" + puntajePasado + "</p><img src='img/logardo.png'>";
  puntosCrupier.innerHTML      = "<p>" + rand4         + "</p><img src='img/logardo.png'>";
  pulsarMarcador(puntosJugador);
  pulsarMarcador(puntosCrupier);

  manoJugador.style.display = "flex";

  // ── Mostrar botones de juego, ocultar lo demás ──────
  btnRepartir.style.display                                  = "none";
  document.getElementById("btn-pedir").style.display        = "flex";
  document.getElementById("btn-plantarse").style.display    = "flex";
  btnDoblar.style.display                                    = "flex";
  document.getElementById("panel-fichas").style.display     = "none";
  document.getElementById("btn-continuar").style.display    = "none";

  saldoDisplay.innerHTML = money + " $";

  // Restaurar rand/rand2 al valor bajo del As para la lógica de puntaje
  if (rand  === AS) rand  = 1;
  if (rand2 === AS) rand2 = 1;
  puntaje = rand + rand2;
}

function apostar(valor) {
  if (money >= valor) {
    money -= valor;
    pozo  += valor;
  }
  document.getElementById("apuesta-display").innerHTML = pozo + " $";
  saldoDisplay.innerHTML = money + " $";
}

function allIn() {
  pozo  = money + pozo;
  money = 0;
  document.getElementById("apuesta-display").innerHTML = pozo + " $";
  saldoDisplay.innerHTML = money + " $";
}

function limpiar() {
  money += pozo;
  pozo   = 0;
  document.getElementById("apuesta-display").innerHTML = pozo + " $";
  saldoDisplay.innerHTML = money + " $";
}

function hit() {
  if (!enJuego) return;

  const cartaObj = sacarCarta();
  const randNueva = cartaObj.numero;
  const paloNuevo = cartaObj.palo;

  // Crear la carta y agregarla al DOM con clase de animación
  const nuevaCarta = document.createElement("img");
  nuevaCarta.src = "img/" + randNueva + paloNuevo + ".png";
  nuevaCarta.classList.add("carta-nueva-jugador");
  nuevaCarta.alt = "";
  manoJugador.appendChild(nuevaCarta);

  // Calcular el valor de la carta (figuras = 10)
  const valorCarta = (randNueva >= 11) ? 10 : randNueva;
  puntaje += valorCarta;

  puntosJugador.innerHTML = "<p>" + puntaje + "</p><img src='img/logardo.png'>";
  pulsarMarcador(puntosJugador);

  if (bandera === false) {
    // Turno normal del jugador
    if (puntaje > 21) {
      document.getElementById("apuesta-display").innerHTML = pozo + " $";
      saldoDisplay.innerHTML = money + " $";
      sacudirManoJugador();

      if (money <= 0 && pozo <= 0) {
        modalTitulo.innerHTML      = "Has perdido todo tu dinero.";
        modalDescripcion.innerHTML = "No te quedan más fondos.";
        document.getElementById("btn-continuar").style.display = "none";
        mostrarModal();
      } else {
        mostrarResultado("Has perdido", "Te pasaste de 21.", pozo, false);
      }
    }
  } else {
    // Turno especial: el crupier ya jugó (después de Doblar)
    money += pozo;
    if      (crupier > 21)      mostrarResultado("Has ganado",  "El crupier se pasó de 21.",       pozo * 2, true);
    else if (crupier > puntaje) mostrarResultado("Has perdido", "El crupier se acercó más a 21.",  pozo,     false);
    else if (crupier < puntaje) mostrarResultado("Has ganado",  "Te acercaste más a 21.",           pozo * 2, true);
    else                        mostrarResultado("Empate",      "Ambos tuvieron el mismo puntaje.", pozo,     false);
  }
}

function doblarApuesta() {
  if (!enJuego) return;
  if (money >= pozo) {
    money  -= pozo;
    pozo   *= 2;
    document.getElementById("apuesta-display").innerHTML = pozo + " $";
    saldoDisplay.innerHTML = money + " $";
    btnDoblar.style.display = "none";
    hit();
    stand();
  } else {
    alert("No tienes suficiente dinero para doblar la apuesta.");
  }
}

function stand() {
  if (!enJuego) return;
  // Revelar la carta oculta del crupier
  const cartaOculta = document.getElementById("carta-oculta");
  cartaOculta.src = "img/" + rand3 + palo3 + ".png";
  cartaOculta.classList.remove("repartida");
  void cartaOculta.offsetWidth;
  cartaOculta.classList.add("repartida");

  if (rand3 === 11 || rand3 === 12 || rand3 === 13) rand3 = 10;
  if (rand4 === 1) rand4 = 11;

  crupier = rand3 + rand4;

  // El crupier saca cartas hasta tener 17 o más (regla del casino)
  while (crupier < 17) {
    const cartaObj = sacarCarta();
    let randNueva = cartaObj.numero;
    let paloNuevo = cartaObj.palo;

    const nuevaCarta = document.createElement("img");
    nuevaCarta.src = "img/" + randNueva + paloNuevo + ".png";
    nuevaCarta.alt = "";
    nuevaCarta.classList.add("carta-nueva-crupier");
    manoCrupier.appendChild(nuevaCarta);

    if (randNueva >= 11) randNueva = 10;
    crupier += randNueva;
  }

  puntosCrupier.innerHTML = "<p>" + crupier + "</p><img src='img/logardo.png'>";
  pulsarMarcador(puntosCrupier);

  document.getElementById("apuesta-display").innerHTML = pozo + " $";
  saldoDisplay.innerHTML = money + " $";

  // Evaluar resultado
  if      (puntaje > 21)      mostrarResultado("Has perdido", "Te pasaste de 21.",                pozo,     false);
  else if (crupier > 21)      mostrarResultado("Has ganado",  "El crupier se pasó de 21.",        pozo * 2, true);
  else if (crupier > puntaje) mostrarResultado("Has perdido", "El crupier se acercó más a 21.",   pozo,     false);
  else if (crupier < puntaje) mostrarResultado("Has ganado",  "Te acercaste más a 21.",            pozo * 2, true);
  else                        mostrarResultado("Empate",      "Ambos tuvieron el mismo puntaje.",  pozo,     true);
}

function mostrarResultado(titulo, descripcion, premio, ganado) {
  // Efecto visual antes del modal
  if (ganado && titulo !== "Empate") {
    brillarVictoria();
  } else if (!ganado) {
    sacudirManoJugador();
  }

  // Actualizar dinero
  if (ganado) money += premio;
  pozo = 0;

  // Delay para que la animación visual termine antes de mostrar el modal
  setTimeout(() => {
    if (money <= 0) {
      modalTitulo.innerHTML      = "Has perdido todo tu dinero.";
      modalDescripcion.innerHTML = "No te quedan más fondos.";
      document.getElementById("btn-continuar").style.display = "none";
    } else {
      const etiqueta             = ganado ? "h2" : "h3";
      modalTitulo.innerHTML      = `${titulo} <${etiqueta}>${premio}</${etiqueta}>$`;
      modalDescripcion.innerHTML = descripcion;
      document.getElementById("btn-continuar").style.display = "flex";
    }

    document.getElementById("apuesta-display").innerHTML = pozo + " $";
    saldoDisplay.innerHTML = money + " $";
    mostrarModal();
  }, ganado ? 300 : 500);
}


// ============================================================
//  REGLAS
// ============================================================
function reglas() {
  const tablero    = document.getElementById("tablero");
  const panelReglas = document.getElementById("panel-reglas");

  if (panelReglas.style.display === "flex") {
    panelReglas.style.display = "none";
    tablero.style.display     = "flex";
  } else {
    panelReglas.style.display = "flex";
    tablero.style.display     = "none";
  }
}


// ============================================================
//  MODO OSCURO
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("dark-mode") === "enabled") {
    document.body.classList.add("dark-mode");
    document.getElementById("btn-modo-oscuro").innerHTML = '<i class="bi bi-brightness-high"></i>';
  } else {
    document.getElementById("btn-modo-oscuro").innerHTML = '<i class="bi bi-moon"></i>';
  }
});

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const enabled = document.body.classList.contains("dark-mode");
  localStorage.setItem("dark-mode", enabled ? "enabled" : "disabled");
  document.getElementById("btn-modo-oscuro").innerHTML = enabled
    ? '<i class="bi bi-brightness-high"></i>'
    : '<i class="bi bi-moon"></i>';
}


// ============================================================
//  CONTINUAR / REINICIAR
// ============================================================

/**
 * Limpia la mesa para iniciar una nueva ronda.
 * Extrajimos esto en su propia función para no repetir
 * el mismo código en continuar() y reiniciar().
 */
function limpiarMesa() {
  document.getElementById("btn-pedir").style.display     = "none";
  document.getElementById("btn-plantarse").style.display = "none";
  btnDoblar.style.display   = "none";
  btnDividir.style.display  = "none";

  // Borrar imágenes de cartas fijas
  document.getElementById("carta-oculta").src             = "";
  document.getElementById("carta-jugador-1").src          = "";
  document.getElementById("carta-jugador-2").src          = "";
  document.getElementById("carta-visible-crupier").src    = "";

  // Borrar marcadores
  puntosJugador.innerHTML = "";
  puntosCrupier.innerHTML = "";

  // Quitar clases de animación de cartas fijas
  ["carta-jugador-1", "carta-jugador-2", "carta-oculta", "carta-visible-crupier"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove("repartida");
  });

  // Eliminar cartas dinámicas del DOM
  document.querySelectorAll(".carta-nueva-jugador").forEach(el => el.remove());
  document.querySelectorAll(".carta-nueva-crupier").forEach(el  => el.remove());

  // Mostrar el panel de apuestas y el botón Repartir
  document.getElementById("panel-fichas").style.display = "flex";
  btnRepartir.style.display = "flex";
  manoJugador.style.display = "none";

  // Limpiar mensajes y estados
  modalTitulo.innerHTML        = "";
  modalDescripcion.innerHTML   = "";
  modalContenido.style.opacity = 0;
  bandera  = false;
  enJuego  = false; // libera el bloqueo para la próxima ronda
  pozo     = 0;
  document.getElementById("apuesta-display").innerHTML = pozo + " $";
  saldoDisplay.innerHTML = money + " $";
}

function continuar() {
  ocultarModal(() => limpiarMesa());
}

function reiniciar() {
  money = 1000;
  ocultarModal(() => limpiarMesa());
}