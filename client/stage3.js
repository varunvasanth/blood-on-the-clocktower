const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const baseURL = "http://localhost:3874/";

const names = ["Alice", "Bob", "Carla", "Doug", "Edward"];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {

    // Pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    
    // Swap elements array[i] and array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const selectedCharacters = JSON.parse(shuffle(localStorage.getItem("selected-characters")));
//const selectedCharacters = JSON.parse(shuffle(localStorage.getItem("selected-characters")));
//console.log(selectedCharacters);

function drawCharacterTokens(){

    for(let i = 0; i < selectedCharacters.length; i++){
        console.log(names[i]);
        document.getElementById("player-selector").innerHTML += `<option value='${names[i]}'> ${names[i]}</option>`
        document.getElementById("parent-circle").innerHTML += `
        <div class='child-circle'>
            <img src="./resources/${selectedCharacters[i]}.png">   
        </div>` 
        console.log(selectedCharacters[i]);
    }
}

console.log(selectedCharacters)

async function createAgents(){
  //const baseURL = "https://sturdy-space-cod-57qp5p7vjp7cvrwj.app.github.dev/create-player";
  let responsePromise;
  for(let i = 0; i < selectedCharacters.length; i++){
    responsePromise = fetch(baseURL + `create-player?name=${names[i]}&character=${selectedCharacters[i]}&playerAmount=${selectedCharacters.length}`);
    responsePromise.then(response => response.json()).then(displayPlayerResponse);
    await sleep(2000);
  }
}

function displayPlayerResponse(response){
  console.log(response);
}

function talkToPlayer(){
  const message = document.getElementById("message-text").value;
  const player = document.getElementById("player-selector").value;
  console.log(player);
  const responsePromise = fetch(baseURL + `talk-to-player?message=${message}&player=${player}`);
  responsePromise.then(response => response.json()).then(displayPlayerResponse);

}

drawCharacterTokens();