import "./style.css";
import imageSource from "./images/button.png"; // Found this from Picsart

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Potion Brewing";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let counter: number = 0;
let growthRate: number = 0;

// Step 1: A button you can click
// D1.d Inspiration - https://github.com/scso-ucsc/Incremental-Game-Development
const brewPotionButton = document.createElement("img");
brewPotionButton.src = imageSource;
brewPotionButton.id = "potion";
brewPotionButton.style.cursor = "pointer";
brewPotionButton.style.width = "150px";
brewPotionButton.style.height = "150px";
brewPotionButton.style.padding = "20px";

app.append(brewPotionButton);

// Step 2: Clicking increases a counter
const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = `${Math.floor(counter)} potions`;
app.append(counterDisplay);

// Step 9: Data-driven design
interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "Apprentice",
    cost: 10,
    rate: 0.1,
    description: "A young helper to brew potions with you.",
  },
  {
    name: "Cauldron",
    cost: 100,
    rate: 2.0,
    description: "A sturdy cauldron for brewing potions faster.",
  },
  {
    name: "Alchemy Lab",
    cost: 1000,
    rate: 50,
    description: "An advanced lab for mass potion production.",
  },
  {
    name: "Potion Master",
    cost: 5000,
    rate: 150,
    description:
      "A seasoned alchemist who greatly speeds up potion production.",
  },
  {
    name: "Magic Fountain",
    cost: 20000,
    rate: 500,
    description:
      "A mystical fountain that provides an endless flow of magical potions.",
  },
];

interface Upgrade {
  name: string;
  cost: number;
  rate: number;
  count: number;
  description: string;
}

const upgrades: Upgrade[] = availableItems.map((item) => ({
  ...item,
  count: 0,
}));

const upgradeButtons: HTMLButtonElement[] = [];
const upgradeStatusDisplays: HTMLDivElement[] = [];

upgrades.forEach((upgrade, idx) => {
  const upgradeButton = document.createElement("button");
  upgradeButton.innerHTML = `${upgrade.name == "Apprentice" || upgrade.name == "Potion Master" ? "Hire" : "Buy"} ${upgrade.name} (✨ ${upgrade.cost}) ~ ${upgrade.description}`;

  upgradeButton.disabled = true;
  upgradeButton.style.marginTop = "20px";
  app.append(upgradeButton);
  upgradeButtons.push(upgradeButton);

  const upgradeStatus = document.createElement("div");

  if (upgrade.name == "Apprentice" || upgrade.name == "Potion Master") {
    upgradeStatus.innerHTML = `${upgrade.name}: ${upgrade.count} hired`;
  } else {
    upgradeStatus.innerHTML = `${upgrade.name}: ${upgrade.count} purchased`;
  }

  app.append(upgradeStatus);
  upgradeStatusDisplays.push(upgradeStatus);

  // Step 7: Price increases
  upgradeButton.addEventListener("click", () => {
    if (counter >= upgrade.cost) {
      counter -= upgrade.cost;
      upgrade.count++;
      growthRate += upgrade.rate;
      upgrade.cost = parseFloat(
        (availableItems[idx].cost * Math.pow(1.15, upgrade.count)).toFixed(2),
      );

      if (upgrade.name == "Apprentice" || upgrade.name == "Potion Master") {
        upgradeButtons[idx].innerHTML =
          `Hire ${upgrade.name} (✨ ${upgrade.cost}) ~ ${upgrade.description}`;
        upgradeStatus.innerHTML = `${upgrade.name}: ${upgrade.count} hired`;
      } else {
        upgradeButtons[idx].innerHTML =
          `Buy ${upgrade.name} (✨ ${upgrade.cost}) ~ ${upgrade.description}`;
        upgradeStatus.innerHTML = `${upgrade.name}: ${upgrade.count} purchased`;
      }

      counterDisplay.innerHTML = `${Math.floor(counter)} 🧪`;
      updateGrowthRateDisplay();
      checkUpgrade();
    }
  });
});

// Display current growth rate
const growthRateDisplay = document.createElement("div");
growthRateDisplay.innerHTML = `<br>Potion brewing rate: ${growthRate.toFixed(1)} potions/sec`;
app.append(growthRateDisplay);

const updateGrowthRateDisplay = () => {
  growthRateDisplay.innerHTML = `<br>Potion brewing rate: ${growthRate.toFixed(1)} potions/sec`;
};

// Step 2:
button.addEventListener("click", () => {
  counter++;
  counterDisplay.innerHTML = `${Math.floor(counter)} 🧪`;
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

  counterDisplay.innerHTML = `${Math.floor(counter)} 🧪`;
  checkUpgrade();

  requestAnimationFrame(animate);
};

requestAnimationFrame(animate);

const checkUpgrade = () => {
  upgradeButtons.forEach((brewPotionButton, idx) => {
    brewPotionButton.disabled = counter < upgrades[idx].cost;
  });
};
