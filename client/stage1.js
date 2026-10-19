function submitPlayerAmount(){
    const playerAmount = document.getElementById("player-amount-selector").value;
    localStorage.setItem("player-amount", playerAmount);
}