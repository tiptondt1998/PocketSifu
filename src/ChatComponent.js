import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import your CSS file for styling
import openai, {model, response, Completion} from 'openai';

const apiKey = 'apiKey'; // Replace with your actual API key
const taiChiKeywords = ['tai chi', 'martial arts', 'qi gong', 'movement', 'posture', 'breathing', 'form', 'philosophy'];

const hasTaiChiContent = (input) => {
  const lowerCaseInput = input.toLowerCase();
  return taiChiKeywords.some(keyword => lowerCaseInput.includes(keyword));
};

const ChatComponent = () => {
  const [userInput, setUserInput] = useState('');
  const [aiResponses, setAiResponses] = useState([]);
  const [conversationHistory, setConversationHistory] = useState([]);

  const generateResponseFromGPT3 = async (input) => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          prompt: input,
          max_tokens: 50, // Adjust the number of tokens based on desired response length
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
        }
       );

      return response.data.choices[0].text;
    } catch (error) {
      console.error('Error generating response:', error);
      return 'An error occurred while generating a response.';
    }
  };

// ... (previous code)

const handleUserInput = async () => {
  if (hasTaiChiContent(userInput)) {
    const aiResponse = await generateResponseFromGPT3(userInput);
    const newConversation = [{ user: userInput, ai: aiResponse }]; // Replace existing conversation
    setConversationHistory(newConversation);
  } else {
    console.log('User input lacks sufficient Tai Chi content.');
  }
  setUserInput('');
};


  return (
    <div>
      <div className="conversation-container">
        {conversationHistory.map((conversation, index) => (
          <div key={index} className="conversation">
            <div className="user">User: {conversation.user}</div>
            <div className="ai">AI: {conversation.ai}</div>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button onClick={handleUserInput}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;
