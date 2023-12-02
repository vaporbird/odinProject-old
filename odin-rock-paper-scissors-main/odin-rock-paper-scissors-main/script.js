const JOCK = 1;
const TEACHER = 2;
const NERD = 3;
const IVANCHO = 4;
const NOT_PICKED = 0;

const PLAYER_WIN = 1;
const TIE = 0;
const COMPUTER_WIN = -1;

let tieCount = 0;
let winCount = 0;
let loseCount = 0;
let state = 0;

const playerClass =
  NOT_PICKED; /* 0-unselected, 1-jock, 2- teacher, 3-nerd, 4-ivancho */

document
  .querySelector('.jock')
  .addEventListener('click', () => pickClassAndUpdate(JOCK));
document
  .querySelector('.teacher')
  .addEventListener('click', () => pickClassAndUpdate(TEACHER));
document
  .querySelector('.nerd')
  .addEventListener('click', () => pickClassAndUpdate(NERD));
document
  .querySelector('.ivancho')
  .addEventListener('click', () => pickClassAndUpdate(IVANCHO)); // button clicks

document.addEventListener('keypress', (keypress) => {
  const { key } = keypress;
  passwordState(key);
});

function passwordState(key) {
  if (state == 0 && key == 'v') {
    state = 1;
    return;
  }
  if (state == 1 && key == 'a') {
    state = 2;
    return;
  }
  if (state == 2 && key == 'n') {
    removeEventListener('keypress', () => passwordState((event) => event.key));
    document.querySelector('.ivancho').disabled = false;
    return;
  }
  state = 0;
}

function gameEnded() {
  return winCount >= 5 || loseCount >= 5 || tieCount >= 5;
}

function pickClassAndUpdate(playerClass) {
  switch (defineRoundWinner(playerClass, genRndComputerClass())) {
    case PLAYER_WIN:
      winCount++;
      break;
    case COMPUTER_WIN:
      loseCount++;
      break;
    case TIE:
      tieCount++;
      break;
  }
  if (gameEnded()) {
    defineMatchWinner();
    document.querySelector('.jock').disabled = true;
    document.querySelector('.teacher').disabled = true;
    document.querySelector('.nerd').disabled = true;
    document.querySelector('.ivancho').disabled = true;
  }
  document.querySelector(
    '.score'
  ).innerHTML = `WINS: ${winCount}, LOSES: ${loseCount}, TIES: ${tieCount}`;
}

function genRndComputerClass() {
  return Math.floor(Math.random() * 3 + 1);
}

function defineMatchWinner() {
  if (winCount >= 5) {
    document.querySelector(
      '.gameOver'
    ).innerHTML = `GAME OVER:<br> YOU WIN BY ACHIEVING ${winCount} WINS!<br>REFRESH PAGE TO PLAY AGAIN!`;
    return;
  }
  if (loseCount >= 5) {
    document.querySelector(
      '.gameOver'
    ).innerHTML = `GAME OVER:<br> YOU LOSE BY GETTING ${loseCount} LOSES!<br>REFRESH PAGE TO PLAY AGAIN!`;
    return;
  }
  if (winCount > loseCount) {
    document.querySelector(
      '.gameOver'
    ).innerHTML = `GAME OVER:<br> YOU WIN BY ACHIEVING ${tieCount} TIES AND HAVING MORE WINS!<br>REFRESH PAGE TO PLAY AGAIN!`;
    return;
  }
  if (winCount < loseCount) {
    document.querySelector(
      '.gameOver'
    ).innerHTML = `GAME OVER:<br> YOU LOSE BY ACHIEVING ${tieCount} TIES AND HAVING LESS WINS!<br>REFRESH PAGE TO PLAY AGAIN!`;
    return;
  }
  document.querySelector(
    '.gameOver'
  ).innerHTML = `GAME OVER:<br> YOU TIED BY ACHIEVING ${tieCount} TIES AND HAVING EQUAL WINS AND LOSES!<br>REFRESH PAGE TO PLAY AGAIN!`;
}

/* 1 = player win, 0 = tie, -1 = computer win */
function defineRoundWinner(playerClass, computerClass) {
  switch (playerClass) {
    case JOCK:
      switch (computerClass) {
        case JOCK:
          document.querySelector('.fightResult').innerHTML =
            'You go train for the next football match together! (T)';
          return TIE;
        case TEACHER:
          document.querySelector('.fightResult').innerHTML =
            'You failed your finals! (L)';
          return COMPUTER_WIN;
        case NERD:
          document.querySelector('.fightResult').innerHTML =
            'You stuck him in a locker! (W)';
          return PLAYER_WIN;
        default:
          document.querySelector('.fightResult').innerHTML = '';
          return;
      }

    case TEACHER:
      switch (computerClass) {
        case JOCK:
          document.querySelector('.fightResult').innerHTML =
            'You made him repeat the year! (W)';
          return PLAYER_WIN;
        case TEACHER:
          document.querySelector('.fightResult').innerHTML =
            'You try to fix the multimedia together ! (T)';
          return TIE;
        case NERD:
          document.querySelector('.fightResult').innerHTML =
            "He's got higher-degree than you at 16! (L)";
          return COMPUTER_WIN;
        default:
          document.querySelector('.fightResult').innerHTML = '';
          return;
      }

    case NERD:
      switch (computerClass) {
        case JOCK:
          document.querySelector('.fightResult').innerHTML =
            'You got stuck in a locker! (L)';
          return COMPUTER_WIN;
        case TEACHER:
          document.querySelector('.fightResult').innerHTML =
            'This mere mortal could not outsmart you! (W)';
          return PLAYER_WIN;
        case NERD:
          document.querySelector('.fightResult').innerHTML =
            'You go play DnD and WoW together! (T)';
          return TIE;
        default:
          document.querySelector('.fightResult').innerHTML = '';
          return;
      }
    case IVANCHO:
      document.querySelector('.fightResult').innerHTML =
        'You are the ultimate human being in terms of strenth, smarts and beauty. Nobody can challenge you! (W) ';
      return 1;
    default:
  }
}

/* document.querySelector("teacher").addEventListener("click", () => console.log(123)); */

/* function winnerIs (playerClass, computerClass) {

    switch(playerClass) {
        case jock:
            switch(computerClass){
                case jock: 
                    return("You go train for the next football match together! (T)");
                case teacher: 
                    return("You failed your finals! (L)");
                case nerd:
                    return("You stuck him in a locker! (W)");
                default: 
                    return("Could not correctly select computerClass");
            }

        case teacher:
            switch(computerClass){
                case jock: 
                    return("You made him repeat the year! (W)");
                case teacher:
                        return("You try to fix the multimedia together ! (T)");
                case nerd:
                    return("He's got higher-degree than you at 16! (L)");
                default: 
                    return("Could not correctly select computerClass");
            }

            case nerd:
            switch(computerClass){
                case jock:
                    return("You got stuck in a locker! (L)");
                case teacher: 
                    return("This mere mortal could not outsmart you! (W)");
                case nerd:   
                return("You go play DnD and WoW together! (T)");
                default: 
                    return("Could not correctly select computerClass");
            } 
            case ivancho:
                return("You are the ultimate human being in terms of strenth, smarts and beauty. Nobody can challenge you! (W) ")
    }
} 

let computerClass = genRndComputerClass();

playerClass = document.querySelector("jock").addEventListener("click", winnerIs(1,genRndComputerClass()));
playerClass = document.querySelector("teacher").addEventListener("click", winnerIs(2,genRndComputerClass()));
playerClass = document.querySelector("nerd").addEventListener("click", ("click", winnerIs(3,genRndComputerClass())));
playerClass = document.querySelector("ivancho").addEventListener("click", ("click", winnerIs(4,genRndComputerClass())));



document.addEventListener("click", myFunction);

function myFunction() {
  document.getElementById("demo").innerHTML = "Hello World"; */
/* } */
