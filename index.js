const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

// functions are here

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

function binarySearch(min, max) {
  return Math.floor((max + min) / 2);

}
start();

async function start() {
  console.log("Let's play a game where you (the human) think of a number between 1 and n and I (the computer) try to guess it.")

  await ask("Press ENTER when you're ready. ");

  // variables within the async function are here

  let b = parseInt(await ask("Great. Please give me the upper range for my guesses. "));
  
  // I tried to set the default here, but it doesn't work
  // if (b !== Number) {
  //   b = 100;
  // }

  let a = 1;
  let firstGuess = binarySearch(a, b);
  let secondGuess = '';
  let answerYesNo = "";
  let answerHighLow = "";
  let min = Math.min(a, b);
  let max = Math.max(a, b);
  let count = 1;

  console.log("Now I'll guess a number between 1 and " + b + ".")
  answerYesNo = await ask("Is it ... " + firstGuess + "? (Y/N) ")

  // guessing loop here but it does not work correctly for all numbers and I don't know why

  while (answerYesNo.toUpperCase() === "N" || answerYesNo.toUpperCase() === "NO") {
    answerHighLow = await ask("Is it higher (H) or lower (L)? ")

    if (answerHighLow.toUpperCase() === "H") {
      min = Math.max(a, firstGuess)
      a = secondGuess;

    } else {
      max = Math.min(b, firstGuess)
      b = secondGuess;

    } secondGuess = binarySearch(min, max)
    answerYesNo = await ask("Is it ... " + secondGuess + "? (Y/N) ")
    count += 1;
    firstGuess = secondGuess;

  }
  console.log("Wow! I guessed it in " + count + " tries!")

  process.exit();

}
