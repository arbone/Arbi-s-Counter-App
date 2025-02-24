// Selezioniamo il contenitore principale
const container = document.getElementById("counter-container");

// Inizializziamo il counter con valore salvato
let counter = localStorage.getItem("counter") ? parseInt(localStorage.getItem("counter")) : 0;

// Funzione migliorata per creare elementi HTML
function createElement(tag, { attributes = {}, classes = [], events = {}, children = [], textContent = "" } = {}) {
    const element = document.createElement(tag);

    // Aggiunge gli attributi
    Object.keys(attributes).forEach(attr => element.setAttribute(attr, attributes[attr]));

    // Aggiunge le classi
    if (Array.isArray(classes)) {
        element.classList.add(...classes);
    }

    // Aggiunge gli eventi
    Object.keys(events).forEach(event => element.addEventListener(event, events[event]));

    // Aggiunge i figli
    children.forEach(child => element.appendChild(child));

    // Imposta il contenuto testuale se presente
    if (textContent) element.textContent = textContent;

    return element;
}

// Funzione per costruire il counter e i pulsanti dinamicamente
function setupCounter() {
    // Creazione degli elementi
    const counterElement = createElement("p", { attributes: { id: "counter" }, textContent: counter });

    const decrementButton = createElement("button", {
        attributes: { id: "decrement" },
        textContent: "-",
        events: { click: () => { counter--; updateCounter(); } }
    });

    const incrementButton = createElement("button", {
        attributes: { id: "increment" },
        textContent: "+",
        events: { click: () => { counter++; updateCounter(); } }
    });

    const resetButton = createElement("button", {
        attributes: { id: "reset" },
        textContent: "Reset",
        events: { click: () => { counter = 0; updateCounter(); } }
    });

    const progressBar = createElement("div", { classes: ["progress-fill"] });
    const progressBarContainer = createElement("div", { classes: ["progress-bar"], children: [progressBar] });

    // Aggiunta degli elementi al container
    container.append(counterElement, decrementButton, incrementButton, resetButton, progressBarContainer);

    updateCounter();
}

// Funzione per aggiornare il counter e la barra di progresso
function updateCounter() {
    const counterElement = document.getElementById("counter");
    const progressBar = document.querySelector(".progress-fill");
    const footer = document.querySelector(".footer");

    counterElement.textContent = counter;
    localStorage.setItem("counter", counter);

    // Calcola il progresso usando la formula logaritmica
    let progress = Math.log10(Math.abs(counter) + 1) * 20;
    progressBar.style.width = `${progress}%`;

    // Cambia colore dello sfondo, della barra e del footer
    document.body.classList.remove("positive", "negative");
    footer.classList.remove("positive", "negative");

    if (counter > 0) {
        document.body.classList.add("positive");
        footer.classList.add("positive");
        progressBar.style.background = "#4CAF50";
    } else if (counter < 0) {
        document.body.classList.add("negative");
        footer.classList.add("negative");
        progressBar.style.background = "#ff4444";
    }
}

// Creazione del counter all'avvio della pagina
document.addEventListener("DOMContentLoaded", setupCounter);