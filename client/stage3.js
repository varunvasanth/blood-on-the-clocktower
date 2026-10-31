const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
   
    console.log(shuffle(selectedCharacters));
    for(let i = 0; i < selectedCharacters.length; i++){
        document.getElementById("parent-circle").innerHTML += `
        <div class='child-circle'>
            <img src="./resources/${selectedCharacters[i]}.png">   
        </div>`
        console.log(selectedCharacters[i]);
    }
}
async function createAgents(){
  //const baseURL = "https://sturdy-space-cod-57qp5p7vjp7cvrwj.app.github.dev/create-player";
  const baseURL = "http://localhost:3874/create-player";
  let responsePromise;
  for(let i = 0; i < selectedCharacters.length; i++){
    responsePromise = fetch(baseURL);
    responsePromise.then(response => response.json()).then(createPlayerCallback);
    await sleep(2000);
  }
}
function createPlayerCallback (response){
  console.log(response);
}
drawCharacterTokens();
createAgents();