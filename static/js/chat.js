document.addEventListener('DOMContentLoaded', function() {
    const chatContainer = document.getElementById('chat-container');
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');

    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const message = userInput.value.trim();
        if (message) {
            addMessage('user', message);
            sendMessage(message);
            userInput.value = '';
        }
    });

    function addMessage(sender, content) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
        messageDiv.textContent = content;
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function sendMessage(message) {
        fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                addMessage('bot', 'Sorry, an error occurred. Please try again.');
            } else {
                addMessage('bot', data.response);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            addMessage('bot', 'Sorry, an error occurred. Please try again.');
        });
    }

    // About Us functionality
    const aboutUsBtn = document.getElementById('about-us-btn');
    const aboutUsContent = document.querySelector('.about-us-content');
    const aboutUsText = document.getElementById('about-us-text');

    aboutUsBtn.addEventListener('click', () => {
        aboutUsContent.style.display = aboutUsContent.style.display === 'none' ? 'block' : 'none';
    });

    const aboutUsSections = {
        mission: "Our mission is to provide a seamless and personalized experience for every user who interacts with us. We aim to make our technology accessible and user-friendly, so anyone can use us to get the information, assistance, or entertainment they need.",
        "how-we-work": "Our AI chatbot uses advanced machine learning algorithms to analyze and process language inputs. Our system can understand context, intent, and sentiment, allowing us to provide accurate and relevant responses. We're constantly learning and improving, incorporating feedback from our users to refine our performance and provide a better experience.",
        "our-team": "Our team consists of experts from various fields, including artificial intelligence, natural language processing, computer science, and user experience design. We're passionate about creating innovative solutions that improve people's lives and make a positive impact.",
        "contact-us": "If you have any questions, feedback, or just want to say hello, please don't hesitate to reach out. We're always here to listen and help."
    };

    document.querySelectorAll('.about-us-content button[data-section]').forEach(button => {
        button.addEventListener('click', () => {
            const section = button.getAttribute('data-section');
            aboutUsText.textContent = aboutUsSections[section];
        });
    });
});
