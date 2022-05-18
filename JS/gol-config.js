import GOL from "./gol.js";

let CURRENT_SIM = null;
let option = null;

document.addEventListener("DOMContentLoaded", function () {
  const cellSize = 10;
  const numberOfCells = 80;
  const canvasSize = numberOfCells * cellSize;
  const rule = 30;
  const chanceOfLife = 0.5;
  const initialOption = "center";

  resetSimulation(canvasSize, cellSize, rule, chanceOfLife, initialOption);
  setupEventListeners(numberOfCells, cellSize, rule, chanceOfLife);
});

function resetSimulation(
  canvasSize,
  cellSize,
  rule,
  initialChanceOfLife,
  initialOption
) {
  const containerCanvas = document.getElementById("canvas");
  const previousCanvas = containerCanvas.querySelector("canvas");

  const chart = document.querySelector("#chart");
  const previousGraph = document.querySelector("#graph");

  if (previousCanvas) containerCanvas.removeChild(previousCanvas);

  if (previousGraph) {
    chart.removeChild(previousGraph);
    const newGraph = document.createElement("div");
    newGraph.setAttribute("id", "graph");
    newGraph.style.width = "100%";
    newGraph.style.height = "50%";
    chart.appendChild(newGraph);
  }

  let cols = canvasSize / cellSize;
  let rows = canvasSize / cellSize;

  CURRENT_SIM = new GOL(
    rows,
    cols,
    cellSize,
    initialChanceOfLife,
    rule,
    initialOption
  );

  CURRENT_SIM.canvas.style.height = canvasSize + "px";
  CURRENT_SIM.canvas.style.width = canvasSize + "px";
  containerCanvas.append(CURRENT_SIM.canvas);
  CURRENT_SIM.repaint();
  CURRENT_SIM.start();

  window.CURRENT_SIM = CURRENT_SIM;
}

function setupEventListeners(
  initialNumberOfCells,
  initialCellSize,
  initialRule,
  initialChanceOfLife
) {
  const rulesForm = document.querySelector("#parameters-section");

  rulesForm.querySelector("#canvasSize").value = initialNumberOfCells;
  rulesForm.querySelector("#cellSize").value = initialCellSize;
  rulesForm.querySelector("#initialRule").value = initialRule;
  rulesForm.querySelector("#percent-life-reset").value = initialChanceOfLife;

  rulesForm.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  let pause = () => {
    if (CURRENT_SIM.paused) {
      CURRENT_SIM.start();
    } else {
      CURRENT_SIM.stop();
    }

    CURRENT_SIM.paused = !CURRENT_SIM.paused;
  };

  window.addEventListener("keydown", (e) => {
    if (e.which === 90) pause();
    if (e.which === 88) {
      CURRENT_SIM.advanceRound();
      CURRENT_SIM.repaint(true);
    }
  });

  document.querySelector("#initialOption").addEventListener("change", (e) => {
    option = e.target.value;
  });

  document
    .querySelector("#pause-play-button")
    .addEventListener("click", (e) => {
      pause();
    });

  document.querySelector("#next-generation").addEventListener("click", (e) => {
    CURRENT_SIM.advanceRound();
    CURRENT_SIM.repaint(true);
  });

  document
    .querySelector("#reset-life-button")
    .addEventListener("click", (e) => {
      const chanceOfLife = rulesForm.querySelector("#percent-life-reset").value;
      let canvasSize = rulesForm.querySelector("#canvasSize").value;
      const cellSize = rulesForm.querySelector("#cellSize").value;
      const rule = document.querySelector("#initialRule").value;
      const option = document.querySelector("#initialOption").value;

      canvasSize = canvasSize * cellSize;

      resetSimulation(canvasSize, cellSize, +rule, chanceOfLife, option);
    });

  document.querySelector("#btnColors").addEventListener("click", (e) => {
    const newLifeColor = document.querySelector("#lifeStyle").value;
    const newDeathColor = document.querySelector("#deathStyle").value;

    CURRENT_SIM.stop();
    CURRENT_SIM.setPixelColors(newLifeColor, newDeathColor);
    CURRENT_SIM.start();
  });
}
