const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

function randomInt(max, min) {
  return Math.floor(min + (Math.random() * (max - min + 1)))

}
start();

async function start() {
  console.log("Let's play a game where you (the human) think of a number between 1 and 100 and I (the computer) try to guess it.")
  let answerReady = await ask("Press ENTER when you're ready.");
  let firstGuess = '';
  if (answerReady === "") {
    // let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
    // console.log('You entered: ' + secretNumber);
    firstGuess = await ask("Is it ... " + randomInt(1, 100) + "? (Y/N) ")
  } else {
    firstGuess = await ask("Is it ... " + randomInt(1, 100) + "? (Y/N) ")
  } if (firstGuess.toUpperCase() === "Y" || firstGuess.toUpperCase() === "YES") {
    console.log("Great job! You guessed it on the first try!")
  }
  // Now try and complete the program.


  // Added in my randomn number function with variable min / max

  process.exit();


}
