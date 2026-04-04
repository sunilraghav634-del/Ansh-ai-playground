let history = []; // Pichli baatein yahan save hongi

async function sendToAI() {
    const input = document.getElementById('user-input');
    const chatWindow = document.getElementById('chat-window');
    const message = input.value.trim();
    
    if(!message) return;

    // UI update
    chatWindow.innerHTML += `<div class="user-msg"><b>You:</b> ${message}</div>`;
    input.value = '';

    // History update
    history.push({ role: "user", content: message });

    // API Call to our Serverless Function
    const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history })
    });

    const data = await res.json();
    const aiMsg = data.choices[0].message.content;

    // AI Response update
    chatWindow.innerHTML += `<div class="ai-msg"><b>AI:</b> ${aiMsg}</div>`;
    history.push({ role: "assistant", content: aiMsg });
    
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function clearChat() {
    history = [];
    document.getElementById('chat-window').innerHTML = '';
}
