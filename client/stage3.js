function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {

    // Pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    
    // Swap elements array[i] and array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
//const selectedCharacters = JSON.parse(shuffle(localStorage.getItem("selected-characters")));
//console.log(selectedCharacters);
function drawCharacterTokens(){
    const selectedCharacters = JSON.parse(shuffle(localStorage.getItem("selected-characters")));
   
    console.log(shuffle(selectedCharacters));
    for(let i = 0; i < selectedCharacters.length; i++){
        document.getElementById("parent-circle").innerHTML += `
        <div class='child-circle'>
            <img src="./resources/${selectedCharacters[i]}.png">   
        </div>`
        console.log(selectedCharacters[i]);
    }
}
drawCharacterTokens();