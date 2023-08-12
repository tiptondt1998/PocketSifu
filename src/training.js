// Import the natural library
const natural = require('natural');
const classifier = new natural.BayesClassifier();
const fs = require('fs');


const trainingData = JSON.parse(fs.readFileSync('./dataset.json', 'utf-8'));

// Train the classifier with example intents and phrases
for (const example of trainingData) {
    classifier.addDocument(example.phrase, example.intent);
  }
  
  // Train the classifier
  classifier.train();
  
  // Now you can use the classifier for intent recognition
  const userInput = 'What is the purpose of the "Grasp the Sparrow\'s Tail" movement?';
  const intent = classifier.classify(userInput);
  console.log('Recognized intent:', intent);