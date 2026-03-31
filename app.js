const qrInput = document.getElementById("qrInput");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");

// QR
function generateQR() {
    const q = document.getElementById("qrcode");
    q.innerHTML = "";

    if (!qrInput.value.trim()) {
        alert("Enter text!");
        return;
    }

    new QRCode(q, {
        text: qrInput.value,
        width: 256,
        height: 256
    });

    setTimeout(() => {
        if (q.querySelector("canvas")) {
            downloadBtn.disabled = false;
            downloadBtn.classList.remove("opacity-50");
        }
    }, 300);
}

// Download
function downloadQR() {
    const canvas = document.querySelector("#qrcode canvas");

    if (!canvas) {
        alert("Generate QR first!");
        return;
    }

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "qr-code.png";
    link.click();
}

generateBtn.onclick = generateQR;
downloadBtn.onclick = downloadQR;

//
// 🔥 PWA INSTALL (فیکس واقعی)
//
let deferredPrompt;
const installBtn = document.getElementById("installBtn");

// دیباگ (ببین اصلاً اجرا می‌شود یا نه)
console.log("PWA script loaded...");

window.addEventListener("beforeinstallprompt", (e) => {
    console.log("Install available ✅");

    e.preventDefault();
    deferredPrompt = e;

    installBtn.classList.remove("hidden");
});

installBtn.addEventListener("click", async () => {
    if (!deferredPrompt) {
        alert("Install not ready!");
        return;
    }

    deferredPrompt.prompt();
    await deferredPrompt.userChoice;

    deferredPrompt = null;
    installBtn.classList.add("hidden");
});

//
// 🔌 SERVICE WORKER
//
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js")
        .then(() => console.log("Service Worker Registered ✅"))
        .catch(err => console.log("SW Error:", err));
}