import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const apiKey;
const taiChiKeywords = ['tai chi', 'martial arts', 'qi gong', 'movement', 'posture', 'breathing', 'form', 'philosophy'];

const hasTaiChiContent = (input) => {
  const lowerCaseInput = input.toLowerCase();
  return taiChiKeywords.some(keyword => lowerCaseInput.includes(keyword));
};

const ChatComponent = () => {
  const [userInput, setUserInput] = useState('');
  const [conversationHistory, setConversationHistory] = useState([]);

  const generateResponseFromGPT3 = async (input) => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/davinci/completions',
        {
          prompt: input,
          max_tokens: 200,
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

  const handleUserInput = async () => {
    if (hasTaiChiContent(userInput)) {
      const aiResponse = await generateResponseFromGPT3(userInput);
      const newConversation = [{ user: userInput, ai: aiResponse }];
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
      <div className="input-container">
        <input
          className="input-field"
          type="text"
          placeholder="Enter your message. The more specific your message, the better and more relevant your response"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button className="send-button" onClick={handleUserInput}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;
