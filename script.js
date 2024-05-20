const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");

let cards,
  interval,
  firstCard = false,
  secondCard = false;

const items = [
  { name: "bee", image: "bee.png" },
  { name: "beetle", image: "beetle.png" },
  { name: "bird", image: "bird.png" },
  { name: "chameleon", image: "chameleon.png" },
  { name: "crocodile", image: "crocodile.png" },
  { name: "ladybug", image: "ladybug.png" },
  { name: "snail", image: "snail.png" },
  { name: "tarantula", image: "tarantula.png" },
  { name: "anaconda", image: "anaconda.png" },
  { name: "dragonfly", image: "dragonfly.png" },
  { name: "butterfly", image: "butterfly.png" },
  { name: "flamingo", image: "flamingo.png" },
];

let seconds = 0,
  minutes = 0;

let movesCount = 0,
  winCount = 0;

const timeGenerator = () => {
  seconds += 1;
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  const minuteValue = minutes < 10 ? `0${minutes}` : minutes;
  const secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  timeValue.innerHTML = `<span>Time</span>: ${minuteValue}:${secondsValue}`;
};

const generateRandom = (size = 4) => {
  let tempArray = [...items];
  let cardArray = [];
  size = (size * size) / 2;

  for (let i = 0; i < size; i++) {
    const random = Math.floor(Math.random() * tempArray.length);
    cardArray.push(tempArray[random]);
    tempArray.splice(random, 1);
  }
  return cardArray;
};

const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
};

const checkWin = () => {
  winCount += 1;
  if (winCount === (gameContainer.querySelectorAll(".card-container").length) / 2) {
    result.innerHTML = `<span>You Won!</span> in ${movesCount} moves`;
    clearInterval(interval);
  }
};

const matrixGenerator = (cardArray, size = 4) => {
    gameContainer.innerHTML = "";
    let cardValues = [...cardArray, ...cardArray];
    cardValues.sort(() => Math.random() - 0.5);
    for (let i = 0; i < size * size; i++) {
      gameContainer.innerHTML += `
        <div class="card-container" data-card-value="${cardValues[i].name}">
          <div class="card-before">?</div>
          <div class="card-after">
            <img src="${cardValues[i].image}" class="image"/>
          </div>
        </div>`;
    }
    gameContainer.style.gridTemplateColumns = `repeat(${size}, auto)`;
  
    let flippedCards = 0; 
  
    const cards = document.querySelectorAll('.card-container');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        if (flippedCards < 2 && !card.classList.contains('flipped')) { 
          card.classList.add('flipped');
          flippedCards++;
  
          if (!firstCard) {
            firstCard = card;
          } else {
            movesCounter();
            secondCard = card;
            if (firstCard.getAttribute('data-card-value') === secondCard.getAttribute('data-card-value')) {
              firstCard = null;
              secondCard = null;
              flippedCards = 0; 
              checkWin();
            } else {
              setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                firstCard = null;
                secondCard = null;
                flippedCards = 0;
              }, 900);
            }
          }
        }
      });
    });
  };
  

const initializer = () => {
  result.innerHTML = "";
  movesCount = 0;
  winCount = 0;
  moves.innerHTML = `<span>Moves:</span> 0`;
  timeValue.innerHTML = `<span>Time:</span> 00:00`;
  let cardValues = generateRandom();
  matrixGenerator(cardValues);
  clearInterval(interval);
  seconds = 0;
  minutes = 0;
  interval = setInterval(timeGenerator, 1000);
};

startButton.addEventListener("click", initializer);
stopButton.addEventListener("click", () => {
  clearInterval(interval);
  result.innerHTML = `<span class="stoped"> Game Stoped!</span>`;
});

initializer();
