import cardsImages from './data/cards-images.js';

import { shuffleArray } from './helpers/array-helper.js';
import later from './helpers/later.js';

import createCard from './components/card/renderer.js';
import initCard from './components/card/initializer.js';


const nStartGameButton = document.querySelector('#start-game-button');
const nFinishGameButton = document.querySelector('#finish-game-button');
const nCards = document.querySelector('.cards');

let nLastCard = null;


init();


function init() {
    update();

    nStartGameButton.addEventListener('click', startGame);
    nFinishGameButton.addEventListener('click', finishGame);
}



function finishGame() {
    update();
}
function startGame() {
    flipCards();

    nStartGameButton.disabled = true;
    nFinishGameButton.disabled = false;
}


function update() {
    nCards.innerHTML = '';

    shuffleArray(cardsImages);
    showCards();

    nStartGameButton.disabled = false;
    nFinishGameButton.disabled = true;
}


function flipCards() {
    for (let item of nCards.children) {
        showCardBack(item);
    }
}
function showCards() {
    for (let image of cardsImages) {

        let nCard = createCard(image);
        initCard(nCard);

        let nCardBack = nCard.querySelector('.card__back');
        nCardBack.addEventListener('click', () => onCardClicked(nCard));

        nCards.append(nCard);

    }
}

async function onCardClicked(nCard) {
    if (!nLastCard) {
        nLastCard = nCard;
        return;
    }
    if (nLastCard == nCard) return;

    const nLastImage = nLastCard.querySelector('.card__img');
    const nCurImage = nCard.querySelector('.card__img');


    let blockClickOnCardFn = e => e.stopImmediatePropagation();
    nCards.addEventListener('click', blockClickOnCardFn, true);


    await later(1000);


    if (nLastImage.src != nCurImage.src) {
        showCardBack(nLastCard);
        showCardBack(nCard);
    }
    else {
        makeCardActive(nLastCard);
        makeCardActive(nCard);
    }

    
    nLastCard = null;

    nCards.removeEventListener('click', blockClickOnCardFn, true);


    if (isWin()) {
        alert("You've won!");
        finishGame();
    }
}

function showCardBack(nCard) {
    nCard.classList.add('card_flipped');
}
function makeCardActive(nCard) {
    nCard.classList.add('card_active');
}

function isWin() {
    let cards = [...nCards.childNodes];
    return !cards.some(card => card.classList.contains('card_flipped'));
}
