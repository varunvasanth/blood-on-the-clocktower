// Import the express module
const express = require('express');

// Initialize the express application
const app = express();

// Define the port number
const PORT = 3874;

// Define a basic route for the root URL ("/")
function respondToACall(req, res) {
    let numberThing = req.query.a;
    res.send({
        name: 'Varun',
        age: 42
    });
}

app.get('/potatoes', respondToACall);

// Start the server and listen on the specified port
function serverStartCallback() {
    console.log(`Server is successfully running at https://localhost:${PORT}`);
}
app.listen(PORT, serverStartCallback);
