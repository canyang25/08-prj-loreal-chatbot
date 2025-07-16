// System prompt for the chatbot
const systemPrompt =
  "You are a helpful assistant for L’Oréal named Lourie. Only answer questions about L’Oréal products, beauty routines, recommendations, or beauty-related topics. If a question is not related to L’Oréal or beauty, politely reply: 'Sorry, I can only answer questions about L’Oréal products, routines, or beauty topics.'";

/* DOM elements */
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");

// Set initial message
chatWindow.innerHTML =
  '<div class="msg ai"><div class="bubble">👋 Hello! How can I help you today?</div></div>';

// --- Conversation history ---
const messages = [{ role: "system", content: systemPrompt }];

// Handle form submit
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get user input
  const userMessage = userInput.value.trim();
  if (!userMessage) {
    chatWindow.innerHTML +=
      '<div class="msg error"><div class="bubble">Please enter a message.</div></div>';
    return;
  }

  // Show user's message in the chat window (append in order)
  chatWindow.innerHTML += `<div class="msg user"><div class="bubble">${userMessage}</div></div>`;
  // Auto-scroll to the latest user message (after DOM update)
  setTimeout(() => {
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, 0);

  // Add user message to conversation history
  messages.push({ role: "user", content: userMessage });

  // Show a loading message
  chatWindow.innerHTML += `<div class="msg ai"><div class="bubble">...</div></div>`;

  // Clear user input
  userInput.value = "";
  userInput.focus();

  try {
    // Send request to OpenAI API with full conversation history
    const response = await fetch("https://loreal.czhao255.workers.dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: messages,
        max_tokens: 200,
      }),
    });

    const data = await response.json();

    // Remove the loading message
    const loadingMsgs = chatWindow.querySelectorAll(".msg.ai");
    if (loadingMsgs.length > 0) {
      loadingMsgs[loadingMsgs.length - 1].remove();
    }

    // Log the OpenAI response for debugging
    console.log("OpenAI response:", data);

    // Show AI response
    if (data.choices && data.choices[0] && data.choices[0].message) {
      chatWindow.innerHTML += `<div class="msg ai"><div class="bubble">${data.choices[0].message.content}</div></div>`;
      // Add AI response to conversation history
      messages.push({
        role: "assistant",
        content: data.choices[0].message.content,
      });
      // Auto-scroll to the latest AI response (after DOM update)
      setTimeout(() => {
        chatWindow.scrollTop = chatWindow.scrollHeight;
      }, 0);
    } else {
      chatWindow.innerHTML += `<div class="msg ai"><div class="bubble">Sorry, I couldn't get a response. Please try again.</div></div>`;
    }
  } catch (error) {
    // Remove the loading message
    const loadingMsgs = chatWindow.querySelectorAll(".msg.ai");
    if (loadingMsgs.length > 0) {
      loadingMsgs[loadingMsgs.length - 1].remove();
    }
    chatWindow.innerHTML += `<div class="msg ai"><div class="bubble">Error connecting to OpenAI. Please check your API key and internet.</div></div>`;
  }
});

// (All chat logic is now handled in the async event listener above)
