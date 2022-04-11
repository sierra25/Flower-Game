//strings of vocabulary words for each level
var levelOne= ["the", "at", "it", "you"];
var levelTwo = [ "buzz", "frog", "dog", "math", "when", "bell"];
var levelThree= ["band", "camp", "age", "school", "bike", "paper", "pencil", "jump"];
var levelFour= ["orange", "yellow","rainbow", "zebra", "november", "december", "young", "problem", "happy", "entrance"];
var levelFive=["curious", "repeat", "rhyme", "jealous","enormous", "searching", "comfortable", "disappointed"];

// prompts the user for the level that they would like to play
var index = prompt("Welcome to Falling Petals! What level(1-5) would you like to play?");  
// the different level names are held in a string      
var levels= [levelOne, levelTwo, levelThree, levelFour, levelFive];
var vocabString= levels[index - 1]




// setting up the game \ initializing conditions
let answer = '';
let maxWrong = 10;
let mistakes = 0;
let guessed = []; //initially nothing has been guessed
let wordStatus = null;

//selects a random string from the list of words. sets the word as the answer variable for the game.
function randomWord() {
  answer =  vocabString[Math.floor(Math.random()*vocabString.length)];
}

// creates the buttons that the user can press
function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML; // displays buttons on screen
}

//is passed the letter that the user clicks on.
function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);
  
  //if the player clicks a letter on the screen then the game will check and keep track of guesses 
  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
    document.getElementById(chosenLetter).style.backgroundColor = "green";
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture(); //updates the picture 
    document.getElementById(chosenLetter).style.backgroundColor = "red";
  }
}

//Changes the image shown/number of petals on the flower if the player guesses incorrectly
function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = 'FlowerLoss'+ mistakes + '.png';
}

//Checks if the word has been correctly guessed and outputs "you won" message to user
function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = '<br>  You Won!!! <br> <br> <br>  '; // I added space between the elements 
  }
}

//Checks if the user has reached the maximum allowed number of wrong guesses and outputs "you Lost" message to user. Displays the correct answer to the user
function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = '<br> The answer was: ' + answer ;
    document.getElementById('keyboard').innerHTML = '<br>  You Lost!!! <br> <br> <br>  ';
  }
}

// Searches the answer variable string for the letter that the user clicked on an then updates the word bar spaces shown on the screen based on their selection
function guessedWord() {
        wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');// if the guessed letter is in the answer then it will return the letter to the word status bar associated with that part of the word on the screen. Else if the letter guessed is not part of the answer it will just retrn a bar line.

  document.getElementById('wordSpotlight').innerHTML = wordStatus; // either adds letter to the space or leaves space empty
}

//Updates the number of mistakes tallied on the screen
function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

// resets the screen and all the initial variable conditions for the player to play the game again
function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = 'FlowerLoss0.png';

  randomWord(); // selects a random word for the player to guess
  guessedWord(); // Searches the answer variable string for the letter that the user clicked on an then updates the word bar spaces shown on the screen based on their select
  updateMistakes(); // updates the number of mistakes tallied on the screen
  generateButtons(); // creates the alphabet buttons on the screen
}
//changes the level of the game and picks another word from new level string
function changeDifficulty(){
        let text;
        index = prompt("What level(1-5) would you like to play?");
        if (index == null || index == "") {
          text = "User cancelled the prompt.Please refresh the page";
        } else {
          reset();
        }
        


};

// shows the answer when player gives up
function showGameword() {
	document.getElementById("keyboard").innerHTML = '<h1>The Correct Answer Is: </h1>' + answer + '<br> <br>';
};         

document.getElementById('maxWrong').innerHTML = maxWrong; // grabs the number of max wrong guesses allowed

randomWord();// selects a random word
generateButtons(); // creates and displays the alphabet buttons on the screen
guessedWord(); // Searches the answer variable string for the letter that the user clicked on an then updates the word bar spaces shown on the screen based on their select