// Selezioniamo gli elementi HTML
const counterElement = document.getElementById("counter");
const incrementButton = document.getElementById("increment");
const decrementButton = document.getElementById("decrement");

// Inizializziamo il valore del counter
let counter = 0;

// Funzione per aggiornare il testo del counter
function updateCounter() {
    counterElement.textContent = counter;
}

// Funzione per aumentare il counter
incrementButton.addEventListener("click", function() {
    counter++;
    updateCounter();
});

// Funzione per diminuire il counter
decrementButton.addEventListener("click", function() {
    counter--;
    updateCounter();
});

// Inizializziamo il counter alla partenza
updateCounter();