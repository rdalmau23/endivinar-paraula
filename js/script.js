const inputParaula = document.getElementById("paraula");
const displayLletres = document.getElementById("display-lletres");
const botonsContainer = document.getElementById("botons-container");
const intentsImg = document.getElementById("intents-img");
const botoComencarPartida = document.getElementById("comencar-partida");

let intentsRestants = 10;
let paraulaAEndevinar = "";

inputParaula.addEventListener("input", () => {
    inputParaula.value = inputParaula.value.replace(/[^a-zA-Z]/g, "");
});

function toggleVisibility() {
    inputParaula.type = inputParaula.type === "password" ? "text" : "password";
}

function comencarPartida() {
    paraulaAEndevinar = inputParaula.value.toUpperCase();
    
    if (!paraulaAEndevinar) {
        alert("Escriu una paraula per començar.");
        return;
    }

    intentsRestants = 10;
    intentsImg.src = `img/10.png`;
    displayLletres.innerHTML = "";
    botonsContainer.innerHTML = "";

    paraulaAEndevinar.split("").forEach(() => {
        const lletraDisplay = document.createElement("span");
        lletraDisplay.textContent = "_ ";
        displayLletres.appendChild(lletraDisplay);
    });

    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(lletra => {
        const boto = document.createElement("button");
        boto.textContent = lletra;
        boto.onclick = () => comprovarLletra(boto, lletra);
        botonsContainer.appendChild(boto);
    });
}

function comprovarLletra(boto, lletra) {
    boto.disabled = true;
    const posicions = [];
    
    paraulaAEndevinar.split("").forEach((char, index) => {
        if (char === lletra) posicions.push(index);
    });

    if (posicions.length > 0) {
        posicions.forEach(index => {
            displayLletres.children[index].textContent = lletra + " ";
        });
    } else {
        intentsRestants--;
        intentsImg.src = `img/img_${intentsRestants}.jpg`;
        if (intentsRestants === 0) {
            alert("Has perdut! No et queden més intents.");
            resetJoc();
        }
    }

    // Comprova si has guanyat
    const paraulaActual = Array.from(displayLletres.children).map(span => span.textContent.trim()).join("");
    if (paraulaActual === paraulaAEndevinar) {
        alert("Felicitats! Has endevinat la paraula.");
        resetJoc();
    }
}

// Reinicia el joc
function resetJoc() {
    intentsRestants = 10;
    intentsImg.src = `img/img_10.jpg`;
    inputParaula.value = "";
    displayLletres.innerHTML = "";
    botonsContainer.innerHTML = "";
}
