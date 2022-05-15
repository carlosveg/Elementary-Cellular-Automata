import Cell from "./Cell.js";
import { Chart } from "./chartConfig.js";

export default class GOL {
  constructor(rows, cols, pixelSize, initialChanceOfLife, initialRule) {
    this.rows = rows;
    this.cols = cols;
    this.pixelSize = pixelSize;
    this.mouseIsDown = false;
    this.paused = false;
    this.intervalId = 1;
    this.generations = 0;
    this.population = 0;
    this.rule = initialRule;

    this.grid = [];
    this.setup(initialChanceOfLife, initialRule);

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

  setup(initialChanceOfLife, initialRule) {
    const generation1 = [];

    for (let i = 0; i < this.rows; i++) {
      generation1.push(
        i === Math.floor(this.cols / 2)
          ? new Cell(1, initialRule)
          : new Cell(0, initialRule)
      );
    }

    this.grid.push(generation1);

    for (let j = 0; j < generation1.length; j++) {
      generation1[j].neighbors = this.getNeighbors(j);
    }

    console.log(generation1);
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
      if (cell === 0) index = this.cols - 1;
      else if (cell === this.cols - 1) index = 0;
      neighbors.push(this.grid[this.generations][index]);
    }

    //console.log(neighbors);

    return neighbors;
  }

  advanceRound() {
    if (this.mouseIsDown) return;
    let nextGen = [];
    const index = this.generations;

    //console.log(index, this.grid.length, this.grid[index]);

    for (let j = 0; j < this.cols; j++) {
      const nextState = this.grid[index][j].prepareUpdate();
      const newCell = new Cell(nextState, this.rule);
      nextGen.push(newCell);
      //console.log(newCell);
    }

    //console.log(nextGen, nextGen.length);
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

  getGenerations() {
    return this.generations;
  }

  getPopulation() {
    return this.population;
  }

  repaint(force = false) {
    if (this.mouseIsDown && !force) return;

    /* let byColor = {};
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let pixel = this.grid[i][j];

        if (
          !force &&
          !pixel.forceRepaint &&
          pixel.alive === pixel.previousState
        ) {
          continue; // No se repinta si no cambió su estado
        }

        let color = pixel.alive ? pixel.getLifeStyle() : pixel.getDeathStyle();
        if (byColor[color] === undefined) {
          byColor[color] = [];
        }

        byColor[color].push([i, j]);
        pixel.forceRepaint = false;
      }
    }

    for (let color in byColor) {
      this.canvasCtx.fillStyle = color;

      for (let [row, col] of byColor[color]) {
        this.paintPixel(row, col);
      }
    } */
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

  resetLife(initialCondition) {
    this.generations = 0;

    /* this.grid.forEach((row) => {
      row.forEach((pixel) => {
        pixel.previousState = pixel.alive;
        pixel.alive = Math.random() < chanceOfLife;
      });
    }); */

    this.setup(initialCondition);
    this.repaint();
  }

  setPixelColors(lifeStyle, deathStyle) {
    this.grid.forEach((row) => {
      row.forEach((pixel) => {
        pixel.setLifeStyle(lifeStyle);
        pixel.setDeathStyle(deathStyle);
        pixel.forceRepaint = true;
      });
    });
  }
}
