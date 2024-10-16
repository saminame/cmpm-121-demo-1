import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "The Game of Life and Death";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Step 1: A button you can click
const button = document.createElement("button");
button.innerHTML = "🦢";
button.style.fontSize = "30px";
button.style.padding = "20px";

app.append(button);

