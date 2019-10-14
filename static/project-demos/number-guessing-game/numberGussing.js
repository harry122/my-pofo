let inpt = document.querySelector('input[type=text]');
let guesses = document.querySelector('.guesses');
let lastResult = document.querySelector('.lastResult');
let lowOrHi = document.querySelector('.lowOrHi');
let sbBtn = document.querySelector('.guessSubmit');

let randomNumber = Math.floor(Math.random() * 100);
let counter = 1;


console.log(randomNumber);
function guessResult() {
    let val = Number(inpt.value);

    if(counter == 1) {
        guesses.innerText = `Previous Guesses: `;
    }

    guesses.innerText += ` ${val}`;

    if(counter == 10) {
        lastResult.innerText = 'Game Over!';
        lastResult.style.backgroundColor = 'red'
        sbBtn.disabled = true;
        startGame();
    }
    else if(val == randomNumber) {
        lastResult.innerText = 'You guessed it correctly!';
        lowOrHi.innerText = '';
        lastResult.style.backgroundColor = 'green'
        sbBtn.disabled = true;
        startGame()
    }else{
        lastResult.innerText = 'Wrong';
        lastResult.style.backgroundColor = 'red';

        if(val > randomNumber) {
            lowOrHi.innerText = 'Guess is too high';
        }else {
            lowOrHi.innerText = 'Guess is too low';
        }
    }
    counter++;
    inpt.value = '';
    inpt.focus();
}


function resetGame() {
    randomNumber = Math.floor(Math.random() * 100);
    counter = 1;
    lastResult.innerText = '';
    lowOrHi.innerText = '';
    lastResult.style.backgroundColor = '';
    guesses.innerText = '';
    document.body.removeChild(btn);
    sbBtn.disabled = false;

}

let btn;

function startGame() {
    btn = document.createElement('button');
    btn.innerText = 'Start Again';

    btn.addEventListener('click', resetGame);
    document.body.appendChild(btn);


}

sbBtn.addEventListener('click', guessResult);
