// System prompt for the chatbot
const systemPrompt = "You are a helpful assistant for L’Oréal. Only answer questions related to L’Oréal products, skincare/haircare routines, and recommendations. If asked about anything else, politely say you can only help with L’Oréal topics.";

/* DOM elements */
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");

// Set initial message
chatWindow.textContent = "👋 Hello! How can I help you today?";

// Handle form submit//
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get user input
  const userMessage = userInput.value.trim();
  if (!userMessage) {
    chatWindow.innerHTML = "Please enter a message.";
    return;
  }

   // Show user's message in the chat window
  chatWindow.innerHTML += `<div class="msg user">${userMessage}</div>`;

  // message array
  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userMessage }
  ];

  // Clear user input
  userInput.value = "";
  userInput.focus();
});

/* Handle form submit */
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Show message
  chatWindow.innerHTML = "Connect to the OpenAI API for a response!";
});
