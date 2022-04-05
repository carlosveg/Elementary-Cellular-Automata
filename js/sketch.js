const generations = [];

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
  let PrevIndex;
  let NextIndex;
  let Neighbourhood;
  const lastGen = generations[generations.length - 1];
  const nextGen = [];
  const rule = 30;

  const RuleAsBinary = ("0".repeat(8) + rule.toString(2))
    .slice(-8)
    .split("")
    .map(Number);

  const rulesValues = {
    "000": RuleAsBinary[7],
    "001": RuleAsBinary[6],
    "010": RuleAsBinary[5],
    "011": RuleAsBinary[4],
    100: RuleAsBinary[3],
    101: RuleAsBinary[2],
    110: RuleAsBinary[1],
    111: RuleAsBinary[0],
  };

  for (let i = 0; i < lastGen.length; i++) {
    if (i == 0) PrevIndex = lastGen.length - 1;
    else PrevIndex = i - 1;

    if (i == lastGen.length - 1) NextIndex = 0;
    else NextIndex = i + 1;

    Neighbourhood =
      lastGen[PrevIndex].toString() +
      lastGen[i].toString() +
      lastGen[NextIndex].toString();

    nextGen.push(rulesValues[Neighbourhood]);
  }

  generations.push(nextGen);

  if (generations.length > genLength) {
    generations.shift();
  }
}
