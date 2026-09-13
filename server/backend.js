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

// Define a basic route for the root URL ("/")
function respondToACall(req, res) {
    let name = req.query.name;
    let clientResponse = { name:"Sorry, that name isn't defined.", age: 'NAN'};
    for(let i = 0;i<dataList.length;i++){
        if(dataList[i].name === name){
            clientResponse = dataList[i]
        }
    }
    
    res.json(clientResponse);
}

app.get('/potatoes', respondToACall);

// Start the server and listen on the specified port
function serverStartCallback() {
    console.log(`Server is successfully running at https://localhost:${PORT}, so thanks`);
}
app.listen(PORT, serverStartCallback);
