function submitPlayerAmount() {
    const playerAmount = document.getElementById("player-amount-selector").value;
    if (playerAmount != 0) {
        localStorage.setItem("player-amount", playerAmount);
        location.href = "./stage2.html"
    } else {
        document.getElementById("error-display").innerText = "Please select an option."
    }
}