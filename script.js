// ---------------- MATRIX EFFECT ----------------
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
const size = 18;
const cols = canvas.width / size;

let drops = Array(Math.floor(cols)).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff9f";
    ctx.font = size + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        let char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * size, drops[i] * size);

        if (drops[i] * size > canvas.height && Math.random() > 0.95) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}
setInterval(drawMatrix, 50);

// Toggle matrix
let matrixEnabled = true;

function toggleMatrix() {
    matrixEnabled = !matrixEnabled;
    if (!matrixEnabled) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

// ---------------- TERMINAL ----------------
const output = document.getElementById("output");
const input = document.getElementById("input");

document.addEventListener("keydown", e => {
    if (e.key.length === 1) input.textContent += e.key;
    if (e.key === "Backspace") {
        input.textContent = input.textContent.slice(0, -1);
    }
    if (e.key === "Enter") {
        runCommand(input.textContent);
        input.textContent = "";
    }
});

function print(text) {
    output.textContent += text + "\n";
    output.scrollTop = output.scrollHeight;
}

function runCommand(cmd) {
    print("> " + cmd);

    switch (cmd.toLowerCase()) {
        case "help":
            print("Available commands:\nhelp\nclear\nscan\nsysinfo\nmatrix\nabout");
            break;

        case "clear":
            output.textContent = "";
            break;

        case "scan":
            playScan();
            break;

        case "matrix":
            toggleMatrix();
            print("Matrix toggled.");
            break;

        case "sysinfo":
            print("System: NEON-XX\nStatus: Online\nFirewall: Active\nNodes: 12");
            break;

        case "about":
            about();
            break;

        default:
            print("Unknown command.");
    }
}

// ---------------- SCAN EFFECT ----------------
function playScan() {
    print("🔍 Scanning network...");
    let progress = 0;

    let interval = setInterval(() => {
        progress += 5;
        print("Scan: " + progress + "%");
        if (progress >= 100) {
            print("Scan complete. No threats detected.");
            clearInterval(interval);
        }
    }, 120);
}

// ---------------- ABOUT ----------------
function about() {
    print("NEON-XX Cyber Terminal\nCreated by tuanvu14032015-cyber");
}

// Open terminal
function showTerminal() {
    print("Terminal activated.");
}
