// Globala variabler

const wordList = [
  "TEATER",
  "BERG",
  "NUMMER",
  "SKRIVSTIL",
  "APPARAT",
  "FÄRGVAL",
  "KATALOG",
]; // Array: med spelets alla ord
let selectedWord = ""; // Sträng: ett av orden valt av en slumpgenerator från arrayen ovan

let guesses = 0; // Number: håller antalet gissningar som gjorts
let hangmanImg = document.querySelector("#hangman"); // Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`
let points = 0;
let msgHolderEl = document.querySelector("#message"); // DOM-nod: Ger meddelande när spelet är över
let startGameBtnEl = document.querySelector("#startGameBtn"); // DOM-nod: knappen som du startar spelet med
let letterButtonEls = document.querySelectorAll("#letterButtons > li > button"); // Array av DOM-noder: Knapparna för bokstäverna
let letterBoxEls = document.querySelector("#letterBoxes > ul"); // Array av DOM-noder: Rutorna där bokstäverna ska stå

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
startGameBtnEl.addEventListener("click", startGame);

function disableButtons() {
  for (let i = 0; i < letterButtonEls.length; i++) {
    letterButtonEls[i].disabled = true;
  }
}
disableButtons();

function startGame() {
  guesses = 0;
  points = 0;
  generateRandomWord();
  createLetterBoxes();
  for (let i = 0; i < letterButtonEls.length; i++) {
    letterButtonEls[i].disabled = false;
  }
  hangmanImg.src = `images/h0.png`;
}
// Funktion som slumpar fram ett ord
function generateRandomWord() {
  selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
}

// Funktion som tar fram bokstävernas rutor, antal rutor beror på vilket ord slumptas fram
function createLetterBoxes() {
  letterBoxEls.innerHTML = "";
  for (let i = 0; i < selectedWord.length; i++) {
    const emptyBox = document.createElement("li");
    emptyBox.innerHTML = "<input type ='text' disabled value=''/>";
    letterBoxEls.appendChild(emptyBox);
  }
}

// Funktion som körs när du trycker på bokstäverna och gissar bokstav
letterButtonEls.forEach((btn) => {
  btn.addEventListener("click", checkLetter);
});
function checkLetter(e) {
  let state = false;
  let letter = e.target.value;
  e.target.disabled = true;
  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord.charAt(i) === letter) {
      state = true;
    }
  }
  if (state) {
    rightLetter(letter);
  } else {
    wrongLetter();
  }
}

checkLetter();

function rightLetter(letter) {
  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord.charAt(i) === letter) {
      letterBoxEls.children[
        i
      ].innerHTML = `<input type='text' disabled value = '${letter}'/>`;
      points++;
    }
    if (points === selectedWord.length) {
      msgHolderEl.innerHTML = "Bra jobbat du har vunnit, vill du köra igen?";
      for (let i = 0; i < letterButtonEls.length; i++) {
        letterButtonEls[i].disabled = true;
      }
    }
  }
}

function wrongLetter() {
  guesses++;
  hangmanImg.src = `images/h${guesses}.png`;
  if (guesses === 6) {
    msgHolderEl.innerHTML = `Tyvärr du förlorade denna omgång, ordet var ${selectedWord} bättre lycka nästa gång!`;
    for (let i = 0; i < letterButtonEls.length; i++) {
      letterButtonEls[i].disabled = true;
    }
  }
}
