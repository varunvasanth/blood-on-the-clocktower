document.getElementById("player-amount-indicator").innerText = `This is a ${localStorage.getItem("player-amount")} player game.`

const characterList = [
    "washerwoman",
    "librarian",
    "investigator",
    "chef",
    "empath",
    "fortune-teller",
    "<br>",
    "undertaker",
    "monk",
    "ravenkeeper",
    "virgin",
    "slayer",
    "soldier",
    "mayor",
    "<br>",
    "<br>",
    "butler",
    "saint",
    "recluse",
    "drunk",
    "<br>",
    "<br>",
    "poisoner",
    "spy",
    "baron",
    "scarlet-woman",
    "<br>",
    "<br>",
    "imp"
]
let selectedCharacters = [];
function displayCharacterTokens(){
    document.getElementById("container").innerHTML = "";
    for(let i = 0; i < characterList.length; i++){
        if(characterList[i] === "<br>"){    
            document.getElementById("container").innerHTML += "<br>"
        } else{
            document.getElementById("container").innerHTML += `<div id="${characterList[i]}" class="circle-frame" onclick="characterSelecter(this.id, this.classList.toString()); this.classList.toggle('selected')">
            <div class="circle">          
                <img src="./resources/${characterList[i]}.png" width="20%">
            
            </div>
        </div>`;
        }
    }    
}
function characterSelecter(id, className){
    if(className.includes('selected')){
        selectedCharacters.splice(selectedCharacters.indexOf(id), 1);
    } else{
        selectedCharacters.push(id);
    }
    console.log(selectedCharacters);
}
function submitCharacters(){
    if(selectedCharacters.length == localStorage.getItem("player-amount")){
        
        localStorage.setItem("selected-characters", JSON.stringify(selectedCharacters))
        //console.log(JSON.stringify(selectedCharacters));
        console.log(localStorage.getItem("selected-characters"));
        console.log(selectedCharacters.length);
        console.log(localStorage.getItem("player-amount"))
        document.getElementById("error-indicator").innerText = ""
        window.location.href = './stage3.html'
    }else if(selectedCharacters.length < localStorage.getItem("player-amount")){
        document.getElementById("error-indicator").innerText = "Please choose more characters."
    }else{
        document.getElementById("error-indicator").innerText = "Please choose less characters."
    }

}
displayCharacterTokens();