import React, { useState } from 'react';
import axios from 'axios';

const apiKey = "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";
const taiChiKeywords = ['tai chi', 'martial arts', 'qi gong', 'movement', 'posture', 'breathing', 'form', 'philosophy'];

const hasTaiChiContent = (input) => {
  const lowerCaseInput = input.toLowerCase();
  return taiChiKeywords.some(keyword => lowerCaseInput.includes(keyword));
};

const ChatComponent = () => {
  const [userInput, setUserInput] = useState('');
  const [aiResponses, setAiResponses] = useState([]);

  const generateResponseFromGPT3 = async (input) => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/davinci-codex/completions',
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

  const handleUserInput = async () => {
    if (hasTaiChiContent(userInput)) {
      const aiResponse = await generateResponseFromGPT3(userInput);
      setAiResponses([...aiResponses, aiResponse]);
    } else {
      console.log('User input lacks sufficient Tai Chi content.');
    }
    setUserInput('');
  };

  return (
    <div>
      <div>
        {aiResponses.map((response, index) => (
          <div key={index}>{response}</div>
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

