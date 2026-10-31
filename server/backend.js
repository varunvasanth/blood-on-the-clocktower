const { GoogleGenAI } = require('@google/genai');
require('dotenv').config(); // Automatically loads environment variables from .env

const ai = new GoogleGenAI();

const model = "gemini-3.6-flash";

const baseSystemInstruction = `
You are a player in a game of Blood on the Clocktower with other AI agents. 
Your goal is to win based on your alignment (Good wants to execute the Demon; Evil wants to reduce the town to 2 players while keeping the Demon alive).
For more rules, visit https://wiki.bloodontheclocktower.com/
CRITICAL RULES:
1. Never break character. Speak in the first person.
2. Do not hallucinate game events. Only react to what the Storyteller tells you.
`
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
        model: model,
        contents: 'Explain blood on the clocktower in one simple sentence.',

    });
    console.log("Gemini Response:\n", geminiResponse.text);
    return geminiResponse.text;
}

// Define a basic route for the root URL ("/")
async function respondToACall(req, res) {
    let clientResponse = { name:"Sorry, that name isn't defined.", age: 'NAN'};
    
    clientResponse.name = await talkToGemini();
    res.json(clientResponse);

}
async function createPlayer(req, res) {
    const name = req.query.name;
    const character = req.query.character;
    let agent = ai.chats.create({
        model: model,
        config: {
            systemInstruction: baseSystemInstruction
        }
    });
    let agentResponse = await agent.sendMessage({
        message: "are you ready to play? 1 word answer"
    });   
    res.json({response:agentResponse.text});
}

app.get('/', respondToACall);
app.get('/create-player', createPlayer);

// Start the server and listen on the specified port
function serverStartCallback() {
    console.log(`Server is successfully running at https://localhost:${PORT}, so thanks`);
}
app.listen(PORT, serverStartCallback);
