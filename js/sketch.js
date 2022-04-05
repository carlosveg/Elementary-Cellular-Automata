const generations = [];

const rules = {
  "000": 0,
  "001": 1,
  "010": 1,
  "011": 0,
  100: 1,
  101: 1,
  110: 0,
  111: 0,
};

const genLength = 300;

function setup() {
  const canvas = createCanvas(800, 800);
  canvas.parent("#canvas");

  const generation1 = [];

  for (let i = 0; i < genLength; i++) {
    generation1.push(i === genLength / 2 ? 1 : 0);
  }

  generations.push(generation1);
  Document;

  setInterval(nextGeneration, 50);
}

function draw() {
  background(0);

  let s = width / genLength;
  fill(255);
  for (let j = 0; j < generations.length; j++) {
    const gen = generations[j];
    for (let i = 0; i < gen.length; i++) {
      if (gen[i] === 1) {
        rect(i * s, j * s, s, s);
      }
    }
  }
}

function nextGeneration() {
  const lastGen = generations[generations.length - 1];
  const nextGen = [];
  let PrevIndex;
  let NextIndex;
  let Neighbourhood;
  const rule = 30;
  let RuleAsBinary = rule.toString(2);

  while (RuleAsBinary.length < 8) RuleAsBinary = "0" + RuleAsBinary;
  RuleAsBinary = Array.from(RuleAsBinary).map(Number);

  /* for (let i = 0; i < lastGen.length; i++) {
    let rule = "";

    for (let j = i - 1; j <= i + 1; j++) {
      if (j < 0) {
        rule += lastGen[lastGen.length - 1];
      } else if (j >= lastGen.length) {
        rule += lastGen[0];
      } else rule += lastGen[j];
    }

    nextGen.push(rules[rule]);
  } */

  for (let i = 0; i < lastGen.length; i++) {
    if (i == 0) PrevIndex = lastGen.length - 1;
    else PrevIndex = i - 1;

    if (i == lastGen.length - 1) NextIndex = 0;
    else NextIndex = i + 1;

    Neighbourhood =
      lastGen[PrevIndex].toString() +
      lastGen[i].toString() +
      lastGen[NextIndex].toString();

    switch (Neighbourhood) {
      case "111":
        nextGen.push(RuleAsBinary[0]);
        break;
      case "110":
        nextGen.push(RuleAsBinary[1]);
        break;
      case "101":
        nextGen.push(RuleAsBinary[2]);
        break;
        first;
      case "100":
        nextGen.push(RuleAsBinary[3]);
        break;
      case "011":
        nextGen.push(RuleAsBinary[4]);
        break;
      case "010":
        nextGen.push(RuleAsBinary[5]);
        break;
      case "001":
        nextGen.push(RuleAsBinary[6]);
        break;
      case "000":
        nextGen.push(RuleAsBinary[7]);
        break;
    }
  }

  generations.push(nextGen);

  if (generations.length > genLength) {
    generations.shift();
  }
}
