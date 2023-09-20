import React from 'react';
import ChatComponent from './ChatComponent';
import Footer from './Footer';
import "./App.css";

function App() {
  return (
    <div className='body'>
      <h1>Pocket Sifu - Your Virtual Tai Chi Training Assistant</h1>
      <ChatComponent />
      <Footer />
    </div>
  );
}

export default App;


