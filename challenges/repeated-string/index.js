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

function getNumberOfA(s) {
  const match = s.match(/a/gi)
  return match && match.length || 0
}

// Complete the repeatedString function below.
function repeatedString(s, n) {
  const sLength = s.length
  const numberToMult = parseInt(n / sLength, 10)

  const lengthLetters = numberToMult * sLength
  let numberOfA = getNumberOfA(s) * numberToMult

  if (lengthLetters < n) {
    const rest = n - lengthLetters
    console.log(s.substr(0, rest))
    numberOfA += getNumberOfA(s.substr(0, rest))
  }

  return numberOfA
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const s = readLine();

  const n = parseInt(readLine(), 10);

  let result = repeatedString(s, n);

  ws.write(result + "\n");

  ws.end();
}
