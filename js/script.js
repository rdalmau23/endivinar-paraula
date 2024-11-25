const inputParaula = document.getElementById("paraula");
const displayLletres = document.getElementById("display-lletres");
const botonsContainer = document.getElementById("botons-container");
const intentsImg = document.getElementById("intents-img");

let intentsRestants = 10;
let paraulaAEndevinar = "";

inputParaula.addEventListener("input", () => {
    inputParaula.value = inputParaula.value.replace(/[^a-zA-Z]/g, "");
    actualitzarDisplay();
});

function toggleVisibility() {
    inputParaula.type = inputParaula.type === "password" ? "text" : "password";
}

function actualitzarDisplay() {
    paraulaAEndevinar = inputParaula.value.toUpperCase();
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
        boto.onclick = () => comprovarLletra(lletra);
        botonsContainer.appendChild(boto);
    });
}

function comprovarLletra(lletra) {
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
}

function resetJoc() {
    intentsRestants = 10;
    intentsImg.src = `img/img_10.jpg`;
    inputParaula.value = "";
    actualitzarDisplay();
}
