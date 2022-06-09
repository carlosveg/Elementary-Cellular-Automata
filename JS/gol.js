import Cell from "./Cell.js";
import { Chart } from "./chartConfig.js";

export default class GOL {
  constructor(
    rows,
    cols,
    pixelSize,
    initialChanceOfLife,
    initialRule,
    initialOption,
    lifeColor,
    deathColor
  ) {
    this.rows = rows;
    this.cols = cols;
    this.pixelSize = pixelSize;
    this.mouseIsDown = false;
    this.paused = false;
    this.intervalId = 1;
    this.generations = 0;
    this.population = 0;
    this.rule = initialRule;
    this.lifeColor = lifeColor;
    this.deathColor = deathColor;

    this.grid = [];
    this.setup(initialChanceOfLife, initialRule, initialOption);

    // Configuración del canvas
    let width = this.pixelSize * this.cols;
    let height = this.pixelSize * this.rows;
    this.canvas = document.createElement("canvas");
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvasCtx = this.canvas.getContext("2d", { alpha: false });

    // Para la gráfica
    this.chart = new Chart("graph", "Gráfica de densidades");
    this.chart2 = new Chart("graph", "Gráfica de densidades (log10)");
  } // fin del constructor

  setup(initialChanceOfLife, initialRule, initialOption) {
    const generation1 = [];

    if (initialOption === "center") {
      for (let i = 0; i < this.rows; i++)
        generation1.push(
          i === Math.floor(this.cols / 2)
            ? new Cell(1, initialRule, this.lifeColor, this.deathColor)
            : new Cell(0, initialRule, this.lifeColor, this.deathColor)
        );
    } else {
      for (let i = 0; i < this.rows; i++) {
        let alive = Math.random() < initialChanceOfLife;

        generation1.push(
          alive
            ? new Cell(1, initialRule, this.lifeColor, this.deathColor)
            : new Cell(0, initialRule, this.lifeColor, this.deathColor)
        );
      }
    }

    this.grid.push(generation1);

    for (let j = 0; j < generation1.length; j++) {
      generation1[j].neighbors = this.getNeighbors(j);
    }
  }

  start() {
    if (this.intervalId) {
      return;
    }

    this.intervalId = setInterval(() => {
      if (this.generations < this.rows) {
        this.advanceRound();
        this.repaint();
      }
    }, 20);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  getNeighbors(cell) {
    const neighbors = [];
    let index;

    for (let i = cell - 1; i <= cell + 1; i++) {
      index = i;

      if (index <= 0) index = this.cols - 1;
      else if (index >= this.cols - 1) index = 0;

      neighbors.push(this.grid[this.generations][index]);
    }

    return neighbors;
  }

  advanceRound() {
    if (this.mouseIsDown) return;
    let nextGen = [];
    const index = this.generations;

    for (let j = 0; j < this.cols; j++) {
      const nextState = this.grid[index][j].prepareUpdate();
      const newCell = new Cell(
        nextState,
        this.rule,
        this.lifeColor,
        this.deathColor
      );
      nextGen.push(newCell);
    }

    this.generations++;

    this.grid.push(nextGen);

    for (let j = 0; j < this.cols; j++) {
      nextGen[j].neighbors = this.getNeighbors(j);
    }

    this.population = this.grid
      .flat()
      .filter((cell) => cell.alive === 1).length;

    /* this.chart.updateChart(this.generations, this.population);
    this.chart2.updateChart(this.generations, Math.log10(this.population)); */

    document.querySelector("#generations").innerHTML = this.generations + "";
    document.querySelector("#population").innerHTML = this.population + "";
  }

  repaint(force = false) {
    if (this.mouseIsDown && !force) return;

    for (let j = 0; j < this.grid.length; j++) {
      const gen = this.grid[j];
      for (let i = 0; i < gen.length; i++) {
        if (gen[i].alive === 1) {
          this.paintPixel(j, i);
        } else this.paintPixel(j, i);
      }
    }
  }

  paintPixel(row, col) {
    this.grid[row][col].setPaintStyles(this.canvasCtx);
    this.canvasCtx.fillRect(
      col * this.pixelSize,
      row * this.pixelSize,
      this.pixelSize,
      this.pixelSize
    );
  }
}
