const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
    return new Promise((resolve, reject) => {
        rl.question(questionText, resolve);
    });
}

start();

async function start() {
    console.log("Let's play a game where I (the computer) think of a number in a range that you give me and you (the human) try to guess it.")

    await ask("Press ENTER when you're ready. ");
    lowerRange = parseInt(await ask("Please give me a starting point. "));
    
    upperRange = parseInt(await ask("Now give me an ending point. "));
    
    let compNum = randomInt(upperRange, lowerRange);
    console.log(compNum) // this is just so that you can see the computer's number

    function randomInt(max, min) {
        return Math.floor(min + (Math.random() * (max - min + 1)))
    }
    num = await ask("Guess a number. ")
    
    let count = 1;

    while (num !== compNum) {
        if (num < compNum) {
            num = await ask("The correct number is higher. Guess again. ")
        } else {
            num = await ask("The correct number is lower. Guess again. ")
        } count += 1;

    }
    console.log("Congratulations! You guessed the correct number in " + count + " tries!")

    process.exit()
}  
