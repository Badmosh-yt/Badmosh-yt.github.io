const manualBtn = document.getElementById("manualBtn");
const autoBtn = document.getElementById("autoBtn");

const chat = document.getElementById("chat");
const message = document.getElementById("message");
const sendBtn = document.getElementById("sendBtn");

const micBtn = document.getElementById("micBtn");
const speakerBtn = document.getElementById("speakerBtn");
const locationBtn = document.getElementById("locationBtn");

const photoBtn = document.getElementById("photoBtn");
const recordBtn = document.getElementById("recordBtn");
const listenBtn = document.getElementById("listenBtn");
const emergencyBtn = document.getElementById("emergencyBtn");


// ---------------- MODE ----------------

manualBtn.addEventListener("click", () => {
    manualBtn.classList.add("active");
    autoBtn.classList.remove("active");

    addBotMessage("Manual mode selected.");
});

autoBtn.addEventListener("click", () => {
    autoBtn.classList.add("active");
    manualBtn.classList.remove("active");

    addBotMessage("Auto mode selected. Safety checks required before flight.");
});


// ---------------- AI CHAT ----------------

sendBtn.addEventListener("click", sendMessage);

message.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {

    const text = message.value.trim();

    if (text === "") return;

    addUserMessage(text);

    message.value = "";

    setTimeout(() => {

        const lowerText = text.toLowerCase();

        if (lowerText.includes("location")) {
            addBotMessage("GPS location is ready to be displayed.");
        }

        else if (lowerText.includes("battery")) {
            addBotMessage("Current battery: 87%.");
        }

        else if (lowerText.includes("status")) {
            addBotMessage("Drone status: ONLINE. GPS connected. 4G connected.");
        }

        else if (lowerText.includes("photo")) {
            addBotMessage("Photo command received.");
        }

        else if (lowerText.includes("record")) {
            addBotMessage("Recording command received.");
        }

        else {
            addBotMessage(
                "I received your command. The real drone connection will be added later."
            );
        }

    }, 500);
}


function addUserMessage(text) {

    const msg = document.createElement("div");

    msg.style.textAlign = "right";
    msg.style.margin = "8px 0";
    msg.style.color = "#d89cff";

    msg.textContent = "You: " + text;

    chat.appendChild(msg);

    chat.scrollTop = chat.scrollHeight;
}


function addBotMessage(text) {

    const msg = document.createElement("div");

    msg.className = "bot-message";
    msg.style.display = "block";
    msg.style.margin = "8px 0";

    msg.textContent = "🤖 " + text;

    chat.appendChild(msg);

    chat.scrollTop = chat.scrollHeight;
}


// ---------------- SPEAKER ----------------

speakerBtn.addEventListener("click", () => {

    const text = "Badmosh AI is ready.";

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "en-IN";

    window.speechSynthesis.speak(speech);

    addBotMessage("Speaker test activated.");

});


// ---------------- MICROPHONE ----------------

micBtn.addEventListener("click", () => {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

        addBotMessage(
            "Voice recognition is not supported by this browser."
        );

        return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";

    recognition.start();

    addBotMessage("🎤 Listening...");

    recognition.onresult = (event) => {

        const result = event.results[0][0].transcript;

        message.value = result;

        sendMessage();
    };

});


// ---------------- LOCATION ----------------

locationBtn.addEventListener("click", () => {

    addBotMessage("Requesting GPS location...");

    if (!navigator.geolocation) {

        addBotMessage("GPS is not supported by this browser.");

        return;
    }

    navigator.geolocation.getCurrentPosition(

        (position) => {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            addBotMessage(
                `GPS received: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`
            );

            const marker =
                document.getElementById("droneMarker");

            marker.style.display = "block";
            marker.style.left = "50%";
            marker.style.top = "50%";

        },

        () => {

            addBotMessage(
                "Unable to access GPS location."
            );

        }

    );

});


// ---------------- PHOTO ----------------

photoBtn.addEventListener("click", () => {

    addBotMessage(
        "📷 Camera command received. Raspberry Pi camera will be connected later."
    );

});


// ---------------- RECORD ----------------

let recording = false;

recordBtn.addEventListener("click", () => {

    recording = !recording;

    if (recording) {

        recordBtn.textContent = "⏹️ STOP RECORDING";

        addBotMessage("🎥 Recording started.");

    } else {

        recordBtn.textContent = "🎥 RECORD";

        addBotMessage("🎥 Recording stopped.");

    }

});


// ---------------- LISTEN ----------------

listenBtn.addEventListener("click", () => {

    addBotMessage(
        "🎧 Two-way audio will be connected to the Raspberry Pi later."
    );

});


// ---------------- SAFETY STOP ----------------

emergencyBtn.addEventListener("click", () => {

    addBotMessage(
        "🛑 SAFETY STOP activated. Flight commands should be disabled."
    );

    emergencyBtn.textContent = "🛑 STOP ACTIVE";

});
