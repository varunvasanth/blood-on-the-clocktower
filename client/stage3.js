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

function drawCharacterTokens() {

  for (let i = 0; i < selectedCharacters.length; i++) {
    console.log(names[i]);
    document.getElementById("direct-message-player-selector").innerHTML += `<option value='${names[i]}'> ${names[i]}</option>`
    document.getElementsByClassName("private-chat-player-selector")[0].innerHTML += `<option value='${names[i]}'> ${names[i]}</option>`
    document.getElementsByClassName("private-chat-player-selector")[1].innerHTML += `<option value='${names[i]}'> ${names[i]}</option>`

    document.getElementById("token-container").innerHTML += `
        <div class='child-circle'>
            <img src="./resources/${selectedCharacters[i]}.png">   
        </div>`
    console.log(selectedCharacters[i]);
  }
}

async function createAgents() {
  //const baseURL = "https://sturdy-space-cod-57qp5p7vjp7cvrwj.app.github.dev/create-player";
  for (let i = 0; i < selectedCharacters.length; i++) {
    createAgent(names[i], selectedCharacters[i]);

    await sleep(2000);
  }
}

function displayPlayerResponse(response, playerName) {
  document.getElementById("agent-response-display").innerHTML += `<br> ${playerName}: ` + response.response;
  console.log(response.response);
  return response.response;
}

function createAgent(playerName, characterName) {
  let responsePromise = fetch(baseURL + `create-player?name=${playerName}&character=${characterName}&playerAmount=${selectedCharacters.length}`);
  responsePromise.then(response => response.json()).then(function handleResponse(response) {
    displayPlayerResponse(response, playerName);
  });
}

function talkToPlayer() {
  const message = document.getElementById("message-text").value;
  const player = document.getElementById("direct-message-player-selector").value;
  console.log(player);
  const responsePromise = fetch(baseURL + `talk-to-player?message=${message}&player=${player}`);
  responsePromise.then(response => response.json()).then(
    function handleResponse(response) {
      const test = displayPlayerResponse(response, player);
      console.log(test);
    }
  );

}

function clearText(id) {
  document.getElementById(id).innerHTML = "";
}

async function handlePrivateChat() {
  const player1 = document.getElementById("private-chat-player-1").value;
  const player2 = document.getElementById("private-chat-player-2").value;
  let currentMessage;

  //First message
  let responsePromise = await fetch(baseURL + `talk-to-player?message=You are in a private chat with ${player2}. What do you wish to say to them? Respond with "END" at the end of any reply if you are ready for the conversation to end.&player=${player1}`);
  let data = await responsePromise.json();
  currentMessage = displayPlayerResponse(data, player1 + " to " + player2);

  //First reply
  responsePromise = await fetch(baseURL + `talk-to-player?message=You are in a private chat with ${player1}. They said: ${currentMessage}. What do you wish to say to them? Respond with "END" at the end of any reply if you are ready for the conversation to end.&player=${player2}`);
  data = await responsePromise.json();
  currentMessage = displayPlayerResponse(data, player2 + " to " + player1);

  //Continuing conversation
  while (currentMessage.slice(-3) !== "END") {

    responsePromise = await fetch(baseURL + `talk-to-player?message=They said: ${currentMessage}. What do you wish to say to them?&player=${player1}`);
    data = await responsePromise.json();
    currentMessage = displayPlayerResponse(data, player1 + " to " + player2);

    responsePromise = await fetch(baseURL + `talk-to-player?message=They said: ${currentMessage}. What do you wish to say to them?&player=${player2}`);
    data = await responsePromise.json();
    currentMessage = displayPlayerResponse(data, player2 + " to " + player1);
  }
}
drawCharacterTokens();

