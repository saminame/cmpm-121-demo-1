import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "The Game of Life and Death";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let counter: number = 0;

// Step 1: A button you can click
const button = document.createElement("button");
button.innerHTML = "🦢";
button.style.fontSize = "30px";
button.style.padding = "20px";

app.append(button);

// Step 2: Clicking increases a counter
const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = `${Math.floor(counter)} 🦢`;
app.append(counterDisplay);

button.addEventListener("click", () => {
  counter++;
  counterDisplay.innerHTML = `${Math.floor(counter)} 🦢`;
});

// Step 3: Automatic clicking
setInterval(() => {
    counter++;
    counterDisplay.innerHTML = `${Math.floor(counter)} 🦢`;
  }, 1000);