async function submitPrompt() {
    const theURL = 'https://miniature-computing-machine-xgwqxqgrgw73pjrp-3874.app.github.dev/potatoes';
    const response = await fetch(theURL);
    console.log(response);
    const data = await response.json();
    console.log(data);
    document.getElementById("server-response").innerText = "Their name is " + data.name + ", they are " + data.age + "lightyears old.";

}
