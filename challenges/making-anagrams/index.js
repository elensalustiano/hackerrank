'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
  inputString += inputStdin;
});

process.stdin.on('end', function () {
  inputString = inputString.replace(/\s*$/, '')
    .split('\n')
    .map(str => str.replace(/\s*$/, ''));

  main();
});

function readLine() {
  return inputString[currentLine++];
}

// Complete the makeAnagram function below.
function makeAnagram(a, b) {
  const arrayALength = a.length
  const arrayBLength = b.length
  const isArrayALargest = arrayALength > arrayBLength

  let largestArray = isArrayALargest ? a : b
  const smallestArray = isArrayALargest ? b : a

  const equals = smallestArray.split('').reduce((acc, cur) => {
    if (largestArray.includes(cur)) {
      largestArray = largestArray.replace(cur, '')
      return acc + 1
    }

    return acc
  }, 0)

  return (arrayALength - equals) + (arrayBLength - equals)
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const a = readLine();

  const b = readLine();

  const res = makeAnagram(a, b);

  ws.write(res + '\n');

  ws.end();
}
