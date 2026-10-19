const { GoogleGenAI } = require('@google/genai');
require('dotenv').config(); // Automatically loads environment variables from .env

const ai = new GoogleGenAI();

// Import the express module
const express = require('express');

const cors = require('cors');

// Initialize the express application
const app = express();

// Define the port number
const PORT = 3874;

// Enable CORS for your specific frontend domain
app.use(cors({ origin: ['https://varunvasanth.github.io', 'http://127.0.0.1:3000'] }));

// Define the data list
let dataList = [{
    name: 'Arthur',
    age: 42
},{
    name: 'Ford',
    age: 391234
},{
    name: 'Earth',
    age: -1
}]

async function talkToGemini() {
    
    const geminiResponse = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: 'Explain blood on the clocktower in one simple sentence.',

    });
    console.log("Gemini Response:\n", geminiResponse.text);
    return geminiResponse.text;
}

// Define a basic route for the root URL ("/")
async function respondToACall(req, res) {
    let name = req.query.name;
    let clientResponse = { name:"Sorry, that name isn't defined.", age: 'NAN'};
    
    clientResponse.name = await talkToGemini();
    res.json(clientResponse);

}

app.get('/', respondToACall);

// Start the server and listen on the specified port
function serverStartCallback() {
    console.log(`Server is successfully running at https://localhost:${PORT}, so thanks`);
}
app.listen(PORT, serverStartCallback);
