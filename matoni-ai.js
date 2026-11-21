// Ask MATONI: front-end for the AI explanation service.
// The API key must live ONLY in your backend (for example a Cloudflare Worker),
// never in this file.

const MATONI_AI_ENDPOINT =
  "https://matoni-ask.ayoolanipekunfaith.workers.dev";

const REQUEST_TIMEOUT_MS = 20000;

const questionBox = document.getElementById("matoni-question");
const sendButton = document.getElementById("matoni-send");
const chatBox = document.getElementById("matoni-chat");
const statusBox = document.getElementById("matoni-status");
const languageBox = document.getElementById("matoni-language");

// Do nothing on pages that do not have the chat elements
if (questionBox && sendButton && chatBox && statusBox) {

  const endpointIsReady = !MATONI_AI_ENDPOINT.includes("YOUR-WORKER-NAME");

  if (!endpointIsReady) {
    statusBox.textContent =
      "Ask MATONI is not connected yet. Please use the topics above for now.";
    sendButton.disabled = true;
  }

  statusBox.setAttribute("role", "status");
  statusBox.setAttribute("aria-live", "polite");

  function addMessage(label, message) {
    const paragraph = document.createElement("p");
    const heading = document.createElement("strong");

    heading.textContent = label + ": ";
    paragraph.appendChild(heading);
    paragraph.appendChild(document.createTextNode(message));

    chatBox.appendChild(paragraph);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // Blocks phone numbers and email addresses from being sent
  function containsPersonalDetails(text) {
    return /(\+?\d[\s-]?){9,}/.test(text) || /\S+@\S+\.\S+/.test(text);
  }

  // Urgent wording: show safety guidance instead of sending to the AI.
  // Keep this list reviewed by a clinician before launch.
  function urgentMessage(text) {
    const lower = text.toLowerCase();

    const selfHarm = ["kill myself", "want to die", "hurt myself", "end my life"];
    const emergency = [
      "fainted", "fainting", "passed out", "can't breathe", "cannot breathe",
      "soaking a pad", "heavy bleeding and dizzy", "severe pain and pregnant"
    ];
    const abuse = ["raped", "rape", "abused me", "forced me", "touched me"];

    if (selfHarm.some((w) => lower.includes(w))) {
      return "I'm really sorry you feel this way. Please tell a trusted adult or a health professional right now, or contact your local emergency services. You do not have to face this alone.";
    }

    if (emergency.some((w) => lower.includes(w))) {
      return "This could be urgent. Please get medical care now, or ask a trusted adult to help you reach a clinic or emergency services.";
    }

    if (abuse.some((w) => lower.includes(w))) {
      return "Thank you for trusting us with this. It is not your fault. Please tell a trusted adult, teacher, counsellor or health worker, or contact your local child protection or emergency services.";
    }

    return null;
  }

  async function sendQuestion() {
    const question = questionBox.value.trim();

    if (question.length < 3) {
      statusBox.textContent = "Please enter a question first.";
      return;
    }

    if (question.length > 700) {
      statusBox.textContent = "Please shorten your question.";
      return;
    }

    if (containsPersonalDetails(question)) {
      statusBox.textContent =
        "Please remove phone numbers or email addresses before asking.";
      return;
    }

    addMessage("YOU", question);
    questionBox.value = "";

    const urgent = urgentMessage(question);
    if (urgent) {
      addMessage("MATONI", urgent);
      statusBox.textContent = "";
      return;
    }

    sendButton.disabled = true;
    statusBox.textContent = "MATONI is preparing an explanation...";

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(MATONI_AI_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: question,
          language: languageBox ? languageBox.value : "en"
        }),
        signal: controller.signal
      });

      let data = {};
      try {
        data = await response.json();
      } catch (parseError) {
        throw new Error("The service sent an unexpected reply. Please try again.");
      }

      if (!response.ok) {
        throw new Error(data.error || "The service is unavailable.");
      }

      if (!data.answer || typeof data.answer !== "string") {
        throw new Error("No answer was received. Please try again.");
      }

      addMessage("ASK MATONI", data.answer);
      statusBox.textContent =
        "Educational information only. For personal medical advice, please see a health professional.";

    } catch (error) {
      statusBox.textContent =
        error.name === "AbortError"
          ? "This is taking too long. Please check your connection and try again."
          : (error.message || "Unable to connect. Please try again.");
    } finally {
      clearTimeout(timer);
      if (endpointIsReady) sendButton.disabled = false;
    }
  }

  sendButton.addEventListener("click", sendQuestion);

  questionBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!sendButton.disabled) sendQuestion();
    }
  });
}
