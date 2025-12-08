/* MATRIX BACKGROUND */
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = "01";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array.from({ length: columns }).fill(1);

let matrixEnabled = true;

function drawMatrix() {
    if (!matrixEnabled) return;
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff88";
    ctx.font = fontSize + "px monospace";

    drops.forEach((y, i) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.95) drops[i] = 0;
        drops[i]++;
    });
}
setInterval(drawMatrix, 33);

function toggleMatrix() {
    matrixEnabled = !matrixEnabled;
}

/* TERMINAL */
const output = document.getElementById("output");
const input = document.getElementById("input");

document.addEventListener("keydown", e => {
    if (e.key.length === 1) {
        input.textContent += e.key;
        playKey();
    }
    if (e.key === "Backspace") {
        input.textContent = input.textContent.slice(0, -1);
    }
    if (e.key === "Enter") {
        runCommand(input.textContent.trim());
        input.textContent = "";
    }
});

/* TERMINAL COMMANDS */
function runCommand(cmd) {
    addOutput("> " + cmd);

    if (cmd === "help") {
        addOutput("COMMANDS:\nhelp\nclear\nscan\nhack\nabout\nmatrix on\matrix off");
    }
    else if (cmd === "clear") {
        output.textContent = "";
    }
    else if (cmd === "scan") {
        addOutput("Scanning...\n[##########] 100%\nStatus: SAFE");
    }
    else if (cmd === "hack") {
        addOutput("Attempting remote access...\nACCESS GRANTED\n>>> Welcome, Operator.");
    }
    else if (cmd === "about") {
        addOutput("NEON-X Terminal\nCreated by You");
    }
    else if (cmd === "matrix off") {
        matrixEnabled = false;
    }
    else if (cmd === "matrix on") {
        matrixEnabled = true;
    }
    else {
        addOutput("Unknown command. Type 'help'");
    }
}

function addOutput(text) {
    output.textContent += text + "\n";
    output.scrollTop = output.scrollHeight;
}

/* SOUNDS */
function playKey() {
    const snd = new Audio("data:audio/mp3;base64,//uQxAAAAAAAAAAAAAAAAAAAA...");
    snd.volume = 0.2;
    snd.play();
}

/* MENU */
function showTerminal() {
    window.scrollTo(0, document.body.scrollHeight);
}

function playScan() {
    addOutput("Running full system scan...");
    runCommand("scan");
}

function about() {
    addOutput("This is a neon green cyber hacker UI.");
}
