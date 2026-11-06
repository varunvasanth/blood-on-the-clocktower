//const { response } = require("express");

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
const selectedCharacters = shuffle(JSON.parse(localStorage.getItem("selected-characters")));
//const selectedCharacters = JSON.parse(shuffle(localStorage.getItem("selected-characters")));
//console.log(selectedCharacters);

function drawCharacterTokens() {

  for (let i = 0; i < selectedCharacters.length; i++) {
    console.log(names[i]);
    document.getElementById("player-selector").innerHTML += `<option value='${names[i]}'> ${names[i]}</option>`
    document.getElementById("token-container").innerHTML += `
        <div class='child-circle'>
            <img src="./resources/${selectedCharacters[i]}.png">   
        </div>`
    console.log(selectedCharacters[i]);
  }
}

console.log(selectedCharacters)

async function createAgents() {
  //const baseURL = "https://sturdy-space-cod-57qp5p7vjp7cvrwj.app.github.dev/create-player";
  for (let i = 0; i < 3; i++) {
    createAgent(names[i], selectedCharacters[i]);

    await sleep(2000);
  }
}

function displayPlayerResponse(response, playerName) {
  document.getElementById("agent-response-display").innerHTML += `<br> ${playerName}: ` + response.response;
  console.log(response.response);
}

function createAgent(playerName, characterName) {
  let responsePromise = fetch(baseURL + `create-player?name=${playerName}&character=${characterName}&playerAmount=${selectedCharacters.length}`);
  responsePromise.then(response => response.json()).then(function handleResponse(response) {
    displayPlayerResponse(response, playerName);
  });
}

function talkToPlayer() {
  const message = document.getElementById("message-text").value;
  const player = document.getElementById("player-selector").value;
  console.log(player);
  const responsePromise = fetch(baseURL + `talk-to-player?message=${message}&player=${player}`);
  responsePromise.then(response => response.json()).then(
    function handleResponse(response) {
      displayPlayerResponse(response, player);
    }
  );

}

function clearText(id) {
  document.getElementById(id).innerHTML = "";
}
drawCharacterTokens();

