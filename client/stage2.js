document.getElementById("player-amount-indicator").innerText = `This is a ${localStorage.getItem("player-amount")} player game.`

let characterList = [
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
    "butler",
    "saint",
    "recluse",
    "drunk",
    "<br>",
    "poisoner",
    "spy",
    "baron",
    "scarlet-woman",
    "<br>",
    "imp"
]
function displayCharacterTokens(){
    document.getElementById("container").innerHTML = "";
    for(let i = 0; i < characterList.length; i++){
        if(characterList[i] === "<br>"){    
            document.getElementById("container").innerHTML += "<br>"
        } else{
            document.getElementById("container").innerHTML += `<div class="circle-frame" onclick="this.classList.toggle('selected')">
            <div class="circle">          
                <img src="./resources/${characterList[i]}.png" width="20%">
            
            </div>
        </div>`;
        }
    }    
}
displayCharacterTokens();