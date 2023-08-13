// import React, { useState } from 'react';
// import axios from 'axios';

// const apiKey = "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";
// const taiChiKeywords =
// [
// 'tai chi', 
// 'martial arts', 
// 'qi gong', 
// 'movement', 
// 'posture', 
// 'breathing', 
// 'form', 
// 'philosophy',
// 'Forms',
// 'Meditation',
// 'Energy flow',
// 'Balance',
// 'Harmony',
// 'Internal martial arts',
// 'Chi',
// 'Posture correction',
// 'Slow movements',
// 'Breathing exercises',
// 'Mind-body connection',
// 'Self-defense techniques',
// 'Push hands',
// 'Martial philosophy',
// 'Yin and yang',
// 'Centering',
// 'Alignment',
// 'Flowing movements',
// 'Silk reeling',
// 'Relaxation techniques',
// 'Martial arts history',
// 'Martial arts philosophy',
// 'Discipline',
// 'Soft martial arts',
// 'Martial arts benefits',
// 'Martial arts training',
// 'Martial arts principles',
// 'Martial arts techniques',
// 'Empty-handed techniques',
// 'Partner exercises'
// ];

// const hasTaiChiContent = (input) => {
//   const lowerCaseInput = input.toLowerCase();
//   return taiChiKeywords.some(keyword => lowerCaseInput.includes(keyword));
// };

// const ChatComponent = () => {
//   const [userInput, setUserInput] = useState('');
//   const [aiResponses, setAiResponses] = useState([]);

//   const generateResponseFromGPT3 = async (input) => {
//     try {
//       const response = await axios.post(
//         'https://api.openai.com/v1/engines/davinci-codex/completions',
//         {
//           prompt: input,
//           max_tokens: 50, // Adjust the number of tokens based on desired response length
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${apiKey}`,
//           },
//         }
//       );

//       return response.data.choices[0].text;
//     } catch (error) {
//       console.error('Error generating response:', error);
//       return 'An error occurred while generating a response.';
//     }
//   };

//   const handleUserInput = async () => {
//     if (hasTaiChiContent(userInput)) {
//       const aiResponse = await generateResponseFromGPT3(userInput);
//       setAiResponses([...aiResponses, aiResponse]);
//     } else {
//       console.log('User input lacks sufficient Tai Chi content.');
//     }
//     setUserInput('');
//   };

//   return (
//     <div>
//       <div>
//         {aiResponses.map((response, index) => (
//           <div key={index}>{response}</div>
//         ))}
//       </div>
//       <div>
//         <input
//           type="text"
//           placeholder="Enter your message..."
//           value={userInput}
//           onChange={(e) => setUserInput(e.target.value)}
//         />
//         <button onClick={handleUserInput}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default ChatComponent;

import React, { useState } from 'react';
import axios from 'axios';

const apiKey = 'YOUR_OPENAI_API_KEY'; // Replace with your actual API key
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
      const newConversation = [...conversationHistory, { user: userInput, ai: aiResponse }];
      setConversationHistory(newConversation);
    } else {
      console.log('User input lacks sufficient Tai Chi content.');
    }
    setUserInput('');
  };

  return (
    <div>
      <div>
        {conversationHistory.map((conversation, index) => (
          <div key={index}>
            <div>User: {conversation.user}</div>
            <div>AI: {conversation.ai}</div>
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
