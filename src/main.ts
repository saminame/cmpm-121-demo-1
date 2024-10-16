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

// Step 5: Purchasing an upgrade
const upgradeButton = document.createElement("button");
upgradeButton.innerHTML = "Buy Life Boost 🦢";
upgradeButton.disabled = true;
upgradeButton.style.marginTop = "20px";
app.append(upgradeButton);

// Step 2:
button.addEventListener("click", () => {
  counter++;
  counterDisplay.innerHTML = `${Math.floor(counter)} 🦢`;
  checkUpgrade();
});

// // Step 3: Automatic clicking
// setInterval(() => {
//   counter++;
//   counterDisplay.innerHTML = `${Math.floor(counter)} 🦢`;
// }, 1000);

// Step 5:
upgradeButton.addEventListener("click", () => {
    if (counter >= 10) {
      counter -= 10;
      counterDisplay.innerHTML = `${Math.floor(counter)} 🦢`;
      checkUpgrade();
    }
  });

// Step 4: Continuous growth
let lastTimestamp: number = 0;

const animate = (timestamp: number) => {
  if (lastTimestamp === 0) {
    lastTimestamp = timestamp;
  }

  const elapsedTime = timestamp - lastTimestamp;
  lastTimestamp = timestamp;

  counter += elapsedTime / 1000;

  counterDisplay.innerHTML = `${Math.floor(counter)} 🦢`;

  requestAnimationFrame(animate);
};

requestAnimationFrame(animate);


const checkUpgrade = () => {
    upgradeButton.disabled = counter <= 10;
  };