const readline = require('node:readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var numAttempts;
var secretNumber;

function askLimit() {
    rl.question('How many guesses? ', guesses => {
        console.log(`You entered ${guesses}`);
        numAttempts = Number(guesses);
        askRange();
    });
}

function askRange() {
    rl.question('Enter a minimum: ', min => {
        rl.question('Enter a maximum: ', max => {
            console.log(`I'm thinking of a number between ${min} and ${max}...`);
            secretNumber = randomInRange(Number(min), Number(max));
            askGuess();
        });
    });
}

function randomInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min);
}

function askGuess() {
    rl.question('Enter a guess: ', answer => {
        let guess = checkGuess(Number(answer));
        numAttempts--;
        if (guess === true) {
            console.log('You win!');
            rl.close();
        } else {
            if (numAttempts === 0) {
                console.log('You lose!');
                console.log(`The number was ${secretNumber}`);
                rl.close();
            } else {
                askGuess();
            }
        }
    });
}

function checkGuess(number) {
    if (number > secretNumber) {
        console.log("Too high");
        return false;
    } else if (number < secretNumber) {
        console.log("Too low");
        return false;
    } else {
        console.log("Correct!");
        return true;
    }
}

askLimit();