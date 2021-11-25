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

let msgHolderEl = document.querySelector("#message"); // DOM-nod: Ger meddelande när spelet är över
let startGameBtnEl = document.querySelector("#startGameBtn"); // DOM-nod: knappen som du startar spelet med
let letterButtonEls; // Array av DOM-noder: Knapparna för bokstäverna
let letterBoxEls = document.querySelector("#letterBoxes > ul"); // Array av DOM-noder: Rutorna där bokstäverna ska stå

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
startGameBtnEl.addEventListener("click", startGame);

function startGame() {
  guesses = 0;
  generateRandomWord();
  createLetterBoxes();
}
// Funktion som slumpar fram ett ord
function generateRandomWord() {
  selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
  console.log(selectedWord);
}

// Funktion som tar fram bokstävernas rutor, antal rutor beror på vilket ord slumptas fram
function createLetterBoxes() {
  letterBoxEls.innerHTML = "";
  for (let i = 0; i < selectedWord.length; i++) {
    const emptyBox = document.createElement("li");
    emptyBox.innerHTML = "<input type ='text' disabled value=''/>";
    letterBoxEls.appendChild(emptyBox);
    console.log(emptyBox);
  }
}

// Funktion som körs när du trycker på bokstäverna och gissar bokstav

// Funktion som ropas vid vinst eller förlust, gör olika saker beroende tillståndet

// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på
