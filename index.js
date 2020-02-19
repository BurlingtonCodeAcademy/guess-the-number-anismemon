const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

// ----------------------------------------------------------------------------------------------------------------------
// ----------- functions used by main game functions --------------------------------------------------------------------

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
// ----------- binary search function to optimize guessing in computerGuess game ----------------------------------------

function binarySearch(min, max) {
  return Math.floor((max + min) / 2);
}

// ---------- random number generator in playerGuess game ---------------------------------------------------------------

function randomInt(max, min) {
  return Math.floor(min + (Math.random() * (max - min + 1)))
}

// ----------- global variables for common answers ----------------------------------------------------------------------

let yesAnswer = ["yes", "y", "yeah", "yup"]
let noAnswer = ["no", "n", "nah", "nope"]
let highAnswer = ["h", "higher", "high", "up"]
let lowAnswer = ["l", "lower", "low", "down"]

// ----------------------------------------------------------------------------------------------------------------------
// -------------- guessing game setup - select which game to play --------------------------------------------------------

start();

async function start() {

  console.log("Let's play a guessing game! Either you (the human) can guess a number that I (the computer) think of, or I can guess a number you think of.")

  let whichGame = await ask("\nType 'C' if you want me to guess, or 'H' if you want to guess. ");

  // ------------- loop to give you a couple of chances to type 'c' and 'h' if you mistype --------------------------------

  let i = 0
  while (i < 2) {
    if (whichGame.toLowerCase() === 'c') {
      computerGuess()
    } else if (whichGame.toLowerCase() === 'h') {
      playerGuess()
    }
    i++
    whichGame = await ask("\nType 'c' if you want me to guess, or 'h' if you want me to guess. ");
  }
  console.log("\nMaybe next time!")
  process.exit()

  // ---------------------------------------------------------------------------------------------------------------------
  // ----- interactive game where the computer guesses player's number ---------------------------------------------------

  async function computerGuess() {

    // --------------- user input to set max value -----------------------------------------------------------------------

    let max = parseInt(await ask("\nGreat. Please give me the upper range for my guesses. "));

    // ----------- default max if no value selected ----------------------------------------------------------------------

    if (isNaN(max)) {
      max = 100;
    }

    // ------------ other variables needed -------------------------------------------------------------------------------

    let min = 1;
    let guess = binarySearch(min, max);
    let answerYesNo = "";
    let answerHighLow = "";
    let count = 1;

    console.log("\nNow I'll guess a number between 1 and " + max + ".")
    answerYesNo = await ask("\nIs it ... " + guess + "? (Y/N) ")

    // ------------- loop for computer's guesses -------------------------------------------------------------------------- 

    while (!yesAnswer.includes(answerYesNo.toLowerCase())) {
      answerHighLow = await ask("\nIs it higher (H) or lower (L)? ")

      // -------------------- guessing mechanism --------------------------------------------------------------------------

      if (highAnswer.includes(answerHighLow.toLowerCase())) {
        min = guess + 1;

      } else if (lowAnswer.includes(answerHighLow.toLowerCase())) {
        max = guess - 1;
      } else {
        answerHighLow = await ask("\nIs it higher (H) or lower (L)? ")
      }
      guess = binarySearch(min, max)
      answerYesNo = await ask("\nIs it ... " + guess + "? (Y/N) ")
      count += 1;

      // --------------- cheat detector checks if player is giving accurate responses ---------------------------------------

      if (min > max) {
        console.log("\nThere appears to be a problem. Are you sure about your number?");
        process.exit();
      }
    }

    // ------------------ conclusion to game and offer to play the other game ----------------------------------------------

    console.log("\nWow! I guessed it in " + count + " tries!")
    let playOtherGame = await ask("\nNow would you like to guess my number? Y/N ")
    if (yesAnswer.includes(playOtherGame.toLowerCase())) {
      playerGuess()
    } else {
      console.log("\nThanks for playing!")
      process.exit();
    }
  }

  // ---------------------------------------------------------------------------------------------------------------------
  // --------- interactive game where player guesses computer's randomly generated number --------------------------------

  async function playerGuess() {

    // --------- checks that the numbers input are actually numbers -------------------------------------------------------

    let lowerRange = parseInt(await ask("\nPlease give me a minimum value. "));
    let upperRange = parseInt(await ask("\nPlease give me a maximum value. "))
    let i = 1

    while (isNaN(lowerRange) || isNaN(upperRange)) {
      if (isNaN(lowerRange)) {
        lowerRange = parseInt(await ask("\nPlease give me a valid minimum value. "));
      }
      if (isNaN(upperRange)) {
        upperRange = parseInt(await ask("\nPlease give me a valid maximum value. "))
      }
      if (i === 2) {
        process.exit()
      }
      i++
    }

    // ----------- computer generates a random number using the specified range --------------------------------------------

    let compNum = randomInt(upperRange, lowerRange);
    let playerGuess = parseInt(await ask("\nGuess a number. "))
    let count = 1;

    // ------------- loop for player's guesses ---------------------------------------------------------------------------

    while (playerGuess !== compNum) {

      // ------------ checks if guess is within specified range ----------------------------------------------------------

      if (playerGuess > upperRange || playerGuess < lowerRange) {
        console.log("\nYour number is outside the guessing range!")
        playerGuess = parseFloat(await ask("\nPlease guess again. "))

        // ----- player keeps guessing -----------------------------------------------------------------------------------

      } else if (playerGuess < compNum) {
        playerGuess = parseFloat(await ask("\nThe correct number is higher. Guess again. "))
      } else {
        playerGuess = parseFloat(await ask("\nThe correct number is lower. Guess again. "))
      } count += 1;
    }

    // -------- conclusion to game and offer to play other game ---------------------------------------------------------

    console.log("\nCongratulations! You guessed the correct number in " + count + " tries!")
    let playOtherGame = await ask("\nNow would you like me to guess your number? Y/N ")
    if (yesAnswer.includes(playOtherGame.toLowerCase())) {
      computerGuess()
    } else {
      console.log("\nThanks for playing!")
      process.exit()
    }
  }
}
