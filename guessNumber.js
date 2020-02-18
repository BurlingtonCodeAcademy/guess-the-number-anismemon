const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
    return new Promise((resolve, reject) => {
        rl.question(questionText, resolve);
    });
}
// -------------------------------------------------------------------------------
// function to generate the computer's guess

function randomInt(max, min) {
    return Math.floor(min + (Math.random() * (max - min + 1)))
}

// -------------------------------------------------------------------------------
// main game function here

start();

async function start() {
    console.log("Let's play a game where I (the computer) think of an integer in a range that you give me and you (the human) try to guess it.")

    await ask("Press ENTER when you're ready. ");

    // variables here

    let lowerRange = parseInt(await ask("Please give me a minimum value. "));
    let upperRange = parseInt(await ask("Now give me a maximum value. "));
    let compNum = randomInt(upperRange, lowerRange);
    let playerGuess = await ask("Guess a number. ")
    let count = 1;

    // player's guessing loop

    while (playerGuess !== compNum) {


        // checks if guess is within specified range

        if (playerGuess > upperRange || playerGuess < lowerRange) {
            console.log("Your number is outside the guessing range!")
            playerGuess = parseFloat(await ask("Please guess again. "))

            // valid guesses here

        } else if (playerGuess < compNum) {
            playerGuess = parseFloat(await ask("The correct number is higher. Guess again. "))
        } else {
            playerGuess = parseFloat(await ask("The correct number is lower. Guess again. "))
        } count += 1;
    }
    console.log("Congratulations! You guessed the correct number in " + count + " tries!")

    process.exit()
}  
