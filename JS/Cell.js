export default class Cell {
  constructor(alive, rule, lifeColor, deathColor) {
    this.alive = alive;
    this.lifeColor = lifeColor;
    this.deathColor = deathColor;
    this.rule = rule;
    this.ruleFormatted = this.formatRule(rule);

    this.neighbors = [];
    this.nextState = null;
    this.forceRepaint = true;
  } // fin del constructor

  formatRule(rule) {
    const RuleAsBinary = ("0".repeat(8) + rule.toString(2))
      .slice(-8)
      .split("")
      .map(Number);

    return {
      "000": RuleAsBinary[7],
      "001": RuleAsBinary[6],
      "010": RuleAsBinary[5],
      "011": RuleAsBinary[4],
      100: RuleAsBinary[3],
      101: RuleAsBinary[2],
      110: RuleAsBinary[1],
      111: RuleAsBinary[0],
    };
  }

  prepareUpdate() {
    let Neighbourhood = "";

    for (let n of this.neighbors) Neighbourhood += n.alive.toString();

    this.nextState = this.ruleFormatted[Neighbourhood];
    return this.ruleFormatted[Neighbourhood];
  }

  getLifeStyle() {
    return this.lifeColor;
  }

  setLifeStyle(color) {
    this.lifeColor = color;
  }

  getDeathStyle() {
    return this.deathColor;
  }

  setDeathStyle(color) {
    this.deathColor = color;
  }

  setPaintStyles(canvasCtx) {
    canvasCtx.fillStyle = this.alive == 1 ? this.lifeColor : this.deathColor;
  }
}
