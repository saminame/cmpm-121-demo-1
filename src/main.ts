import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "The Game of Life and Death";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let counter: number = 0;
let growthRate: number = 0;

// Step 1: A button you can click
const button = document.createElement("button");
button.innerHTML = "🥘";
button.style.fontSize = "30px";
button.style.padding = "20px";

app.append(button);

// Step 2: Clicking increases a counter
const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = `${Math.floor(counter)} 🥘`;
app.append(counterDisplay);

// Step 6: Multiple upgrades
interface Upgrade {
  name: string;
  cost: number;
  rate: number;
  count: number;
}

const upgrades: Upgrade[] = [
  { name: "A", cost: 10, rate: 0.1, count: 0 },
  { name: "B", cost: 100, rate: 2.0, count: 0 },
  { name: "C", cost: 1000, rate: 50, count: 0 },
];

const upgradeButtons: HTMLButtonElement[] = [];
const upgradeStatusDisplays: HTMLDivElement[] = [];

upgrades.forEach((upgrade, idx) => {
  const upgradeButton = document.createElement("button");
  upgradeButton.innerHTML = `Buy ${upgrade.name} (✨ ${upgrade.cost})`;
  upgradeButton.disabled = true;
  upgradeButton.style.marginTop = "20px";
  app.append(upgradeButton);
  upgradeButtons.push(upgradeButton);

  const upgradeStatus = document.createElement("div");
  upgradeStatus.innerHTML = `${upgrade.name}: ${upgrade.count} purchased`;
  app.append(upgradeStatus);
  upgradeStatusDisplays.push(upgradeStatus);

  // Step 7: Price increases
  upgradeButton.addEventListener("click", () => {
    if (counter >= upgrade.cost) {
      counter -= upgrade.cost;
      upgrade.count++;
      growthRate += upgrade.rate;
      upgrade.cost = parseFloat((upgrades[idx].cost * Math.pow(1.15, upgrade.count)).toFixed(2));
      upgradeButtons[idx].innerHTML = `Buy ${upgrade.name} (✨ ${upgrade.cost})`;
      counterDisplay.innerHTML = `${Math.floor(counter)} 🥘`;
      upgradeStatus.innerHTML = `${upgrade.name}: ${upgrade.count} purchased`;
      updateGrowthRateDisplay();
      checkUpgrade();
    }
  });
});

// Display current growth rate
const growthRateDisplay = document.createElement("div");
growthRateDisplay.innerHTML = `Growth rate: ${growthRate.toFixed(1)} units/sec`;
app.append(growthRateDisplay);

const updateGrowthRateDisplay = () => {
  growthRateDisplay.innerHTML = `Growth rate: ${growthRate.toFixed(1)} units/sec`;
};

// Step 2:
button.addEventListener("click", () => {
  counter++;
  counterDisplay.innerHTML = `${Math.floor(counter)} 🥘`;
  checkUpgrade();
});

// Step 4: Continuous growth
let lastTimestamp: number = 0;

const animate = (timestamp: number) => {
  if (lastTimestamp === 0) {
    lastTimestamp = timestamp;
  }

  const elapsedTime = timestamp - lastTimestamp;
  lastTimestamp = timestamp;

  counter += growthRate * (elapsedTime / 1000);

  counterDisplay.innerHTML = `${Math.floor(counter)} 🥘`;
  checkUpgrade();

  requestAnimationFrame(animate);
};

requestAnimationFrame(animate);

const checkUpgrade = () => {
  upgradeButtons.forEach((button, idx) => {
    button.disabled = counter < upgrades[idx].cost;
  });
};