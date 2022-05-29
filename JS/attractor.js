export default class Attractor {
  constructor(rule, n) {
    this.rule = rule;
    this.n = n;
    this.ruleFormatted = this._formatRule(rule);
    this.totalCombinations = Math.pow(2, n);
    this.nodesVisited = [];
    this.nodes = [];
    this.edges = [];
  }

  _formatRule(rule) {
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

  _getCombinations(n) {
    const combinations = [];

    for (let i = 0; i < this.totalCombinations; i++) {
      const combination = ("0".repeat(n) + i.toString(2))
        .slice(-n)
        .split("")
        .map(Number);
      combinations.push(combination);
    }

    return combinations;
  }

  _nextState(combination, ruleValues) {
    let cadena = "";
    let cadenota = "";
    let index;

    for (let i = 0; i < this.n; i++) {
      for (let j = i - 1; j <= i + 1; j++) {
        index = j;
        if (j < 0) index = this.n - 1;
        if (j >= this.n) index = 0;
        cadena += combination[index];
      }
      cadenota += ruleValues[cadena];
      cadena = "";
    }

    return cadenota;
  }

  _getRelations() {
    const combinations = this._getCombinations(this.n);

    for (const combination of combinations) {
      const combinationDecimal = parseInt(combination.join(""), 2);

      let node = new Object();
      node.id = combinationDecimal;
      node.label = combinationDecimal.toString();
      this.nodes.push(node);

      const nextState = this._nextState(combination, this.ruleFormatted);

      let edge = new Object();
      edge.from = parseInt(combination.join(""), 2);
      edge.to = parseInt(nextState, 2);
      this.edges.push(edge);
    }
  }

  _getData() {
    const combinations = this._getCombinations(this.n);
    const from = [];
    const to = [];

    for (const combination of combinations) {
      const nextState = this._nextState(combination, this.ruleFormatted);
      from.push(parseInt(combination.join(""), 2) + 1);
      to.push(parseInt(nextState, 2) + 1);
    }

    return { from, to };
  }
}
