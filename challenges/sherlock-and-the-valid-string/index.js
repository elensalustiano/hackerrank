'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
  inputString += inputStdin;
});

process.stdin.on('end', _ => {
  inputString = inputString.replace(/\s*$/, '')
    .split('\n')
    .map(str => str.replace(/\s*$/, ''));

  main();
});

function readLine() {
  return inputString[currentLine++];
}

// Complete the isValid function below.
function isValid(s) {
  let currentLetter, differents = 0

  const lettersCount = s.split('').reduce((acc, cur) => {
    const times = acc[cur] || 0
    acc[cur] = times + 1

    return acc
  }, {})

  for (const key in lettersCount) {
    const value = lettersCount[key]

    if (currentLetter && value !== lettersCount[currentLetter]) differents += 1
    else currentLetter = key

    if (differents > 1) return 'NO'
  }
  return 'YES'
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const s = readLine();

  let result = isValid(s);

  ws.write(result + "\n");

  ws.end();
}
