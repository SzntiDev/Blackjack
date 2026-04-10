<h1 align="center">
  <br>
  Blackjack Premium
  <br>
</h1>

<h4 align="center">Una experiencia de casino de alta fidelidad construida con tecnologías web puras.</h4>

<p align="center">
  <em>Leer en otros idiomas: <a href="README.md">Inglés</a>, <a href="README-es.md">Español</a></em>
</p>

<p align="center">
  <a href="#-características">Características</a> •
  <a href="#-cómo-funciona">Cómo Funciona</a> •
  <a href="#-instalación-y-uso">Instalación y Uso</a> •
  <a href="#-arquitectura">Arquitectura</a> •
  <a href="#-tecnologías">Tecnologías</a>
</p>

---

> [!TIP]
> **Blackjack Premium** se centra en la excelencia visual y la precisión matemática, proporcionando una experiencia realista de cartas sin necesidad de frameworks pesados.

**Blackjack Premium** es una implementación web elegante y altamente interactiva del clásico juego de casino. Desarrollado con un enfoque en la **Experiencia de Usuario (UX)** y la **Fidelidad de Animación**, cuenta con un sistema de apuestas profesional, algoritmos de barajado realistas y una lógica anti-spam que garantiza la integridad del juego.

El proyecto demuestra manipulación avanzada del DOM, animaciones basadas en CSS (keyframes y transiciones) y una máquina de estados robusta que maneja la lógica del crupier, las decisiones del jugador y el cálculo de resultados de forma fluida.

---

## ✨ Características

- 🃏 **Algoritmo de Barajado Pro**: Implementa el **Fisher-Yates (Knuth) Shuffle** para una distribución de cartas estadísticamente justa e impredecible en un mazo de 52 cartas.
- 🎨 **Visuales Premium**: Assets de cartas diseñados a medida, efectos de hover suaves y un sofisticado sistema de modales para los resultados del juego (Ganar/Perder/Pasarse).
- 💰 **Sistema Bancario**: Gestión de moneda virtual integrada comenzando con $1,000. Incluye manejo dinámico del pozo y lógica de pagos balanceada.
- 🛡️ **Lógica Anti-Spam**: Un control estricto basado en estados (flag `enJuego`) evita clics accidentales o el spam de "repartir" durante las manos activas.
- 📱 **Responsivo y sin Saltos**: Layout optimizado que evita el "content shift" (desplazamiento de contenido) al revelar cartas, asegurando una UI estable y envolvente.
- ✨ **Micro-Animaciones**: Incluye palpitación de marcadores, sacudida de mano al perder y transiciones suaves de vuelo de cartas para una sensación de alta gama.

---

## 🚀 Cómo Funciona

Blackjack Premium se basa en un enfoque estructurado para gestionar el flujo del juego y el motor de probabilidades:

### 1. El Motor del Mazo
En lugar de una simple generación de números aleatorios, el juego mantiene un array `mazo` físico. El algoritmo **Fisher-Yates** recorre el array en reversa, intercambiando elementos para asegurar una aleatoriedad total antes de cada nueva ronda.

### 2. Lógica del Crupier e IA
El "Crupier" sigue las reglas estándar de los casinos: se planta en 17 y pide carta con cualquier valor inferior. Esta lógica se procesa de forma asíncrona para permitir que el usuario vea la revelación secuencial de cartas, simulando el ritmo de un crupier real.

### 3. Gestión de Estados
El juego rastrea varios estados concurrentes (Puntaje, Apuesta, Fase del Juego). Utiliza event listeners del DOM y el cambio de clases CSS para reflejar estos estados visualmente, transicionando entre los modos de "Apuesta", "Jugando" y "Resultado" dinámicamente.

---

## 💻 Instalación y Uso

### Prerrequisitos
Ninguno. Este es un proyecto 100% Vanilla frontend.

### Pasos
1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/SzntiDev/Blackjack.git
   cd Blackjack
   ```
2. **Jugar**:
   Simplemente abre el archivo `index.html` en cualquier navegador web moderno.
   ```bash
   start index.html
   ```

---

## 🏗️ Arquitectura

```text
Blackjack/
├── index.html           # Marcado semántico y contenedores de UI
├── Estilos.css          # Sistema de diseño premium (Capas, Animaciones, Variables)
├── programa.js          # Motor central (Estados, Barajado, IA del Crupier)
├── img/                 # Assets de cartas SVG/PNG e iconos de interfaz
└── f/                   # Tipografía personalizada y assets de fuentes
```

---

## ⚙️ Tecnologías

- **[HTML5](https://developer.mozilla.org/es/docs/Web/HTML)** para una estructura semántica.
- **[CSS3](https://developer.mozilla.org/es/docs/Web/CSS)** usando Flexbox, Grid y animaciones complejas de Keyframes.
- **[Vanilla JavaScript (ES6)](https://developer.mozilla.org/es/docs/Web/JavaScript)** para la lógica, gestión del mazo e interacción con el DOM.

---
> Proyecto co-autoría de Agustin Aurellana y Santiago Pérez. Enfocado en lógica limpia y diseño de interfaz premium.
