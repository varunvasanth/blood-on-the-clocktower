// Import the express module
const express = require('express');

const cors = require('cors');

// Initialize the express application
const app = express();

// Define the port number
const PORT = 3874;

// Enable CORS for your specific frontend domain
app.use(cors({ origin: ['https://varunvasanth.github.io', 'http://127.0.0.1:3000'] }));

// Define a basic route for the root URL ("/")
function respondToACall(req, res) {
    let numberThing = req.query.a;
    res.json({
        name: 'Arthur',
        age: 42
    });
}

app.get('/potatoes', respondToACall);

// Start the server and listen on the specified port
function serverStartCallback() {
    console.log(`Server is successfully running at https://localhost:${PORT}`);
}
app.listen(PORT, serverStartCallback);
