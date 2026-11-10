
const MATONI_AI_ENDPOINT =
  "https://YOUR-WORKER-NAME.YOUR-SUBDOMAIN.workers.dev";

const questionBox = document.getElementById("matoni-question");
const sendButton = document.getElementById("matoni-send");
const chatBox = document.getElementById("matoni-chat");
const statusBox = document.getElementById("matoni-status");
const languageBox = document.getElementById("matoni-language");

function addMessage(label, message) {
  const paragraph = document.createElement("p");
  const heading = document.createElement("strong");

  heading.textContent = label + ": ";
  paragraph.appendChild(heading);
  paragraph.appendChild(document.createTextNode(message));

  chatBox.appendChild(paragraph);
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendButton.addEventListener("click", async () => {
  const question = questionBox.value.trim();

  if (question.length < 3) {
    statusBox.textContent = "Please enter a question first.";
    return;
  }

  if (question.length > 700) {
    statusBox.textContent = "Please shorten your question.";
    return;
  }

  addMessage("YOU", question);

  questionBox.value = "";
  sendButton.disabled = true;
  statusBox.textContent = "MATONI is preparing an explanation...";

  try {
    const response = await fetch(MATONI_AI_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question: question,
        language: languageBox.value
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "The service is unavailable.");
    }

    addMessage("ASK MATONI", data.answer);
    statusBox.textContent = "Response received.";
  } catch (error) {
    statusBox.textContent =
      error.message || "Unable to connect. Please try again.";
  } finally {
    sendButton.disabled = false;
  }
});

questionBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendButton.click();
  }
});
