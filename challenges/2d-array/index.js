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

// Complete the hourglassSum function below.
function hourglassSum(arr) {
  const itemToSum = 3
  let totalSum = undefined

  arr.forEach((row, rowIndex) => {
    const rowLength = arr.length
    row.forEach((elemA, index) => {
      const lineLength = row.length
      if (index + itemToSum <= lineLength && rowIndex + itemToSum <= rowLength) {
        const secondIndex = index + 1
        const thirdIndex = index + 2

        const rowD = rowIndex + 1
        const rowE = rowIndex + 2

        const elemB = row[secondIndex]
        const elemC = row[thirdIndex]
        const elemD = arr[rowD][secondIndex]
        const elemE = arr[rowE][index]
        const elemF = arr[rowE][secondIndex]
        const elemG = arr[rowE][thirdIndex]

        const elemSum = elemA + elemB + elemC + elemD + elemE + elemF + elemG

        if (totalSum === undefined || totalSum < elemSum) {
          totalSum = elemSum
        }
      }
    })
  })

  return totalSum
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  let arr = Array(6);

  for (let i = 0; i < 6; i++) {
    arr[i] = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));
  }

  let result = hourglassSum(arr);

  ws.write(result + "\n");

  ws.end();
}
