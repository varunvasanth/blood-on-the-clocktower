async function submitPrompt() {
    const theURL = 'https://miniature-computing-machine-xgwqxqgrgw73pjrp-3874.app.github.dev/potatoes';
    const response = await fetch(theURL);
    const data = await response.json();
    console.log(data);
    alert(data);
}
