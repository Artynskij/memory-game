import database from "./data.js";
import { LocalStorage } from "./localstorage.js";

export class Game {
    constructor(handleFinishGame) {
        this.LocalStorage = new LocalStorage();
        this.handleFinishGame = handleFinishGame;
        this.countMovesNode = document.querySelector("#count-game");
        this.countDoneNode = document.querySelector("#count-done");

        this.firstCard = null;

        this.isChecking = false;
        this.moves = 0;
        this.cards = this._createCards();
    }
    _createData() {
        const data = database;
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        const picked = shuffled.slice(0, 8);
        const doubled = [...picked, ...picked];

        const finalCards = doubled.sort(() => Math.random() - 0.5);
        return finalCards;
    }
    _createCards() {
        const field = document.querySelector("#field");
        const newData = this._createData();

        const cards = newData.map((item) => {
            const card = new Card({
                id: item.id,
                imageUrl: item.imgSrc,
                name: item.name,
                onClick: this._handleClick.bind(this),
            });

            field.append(card.element);
            return card;
        });
        return cards;
    }
    _handleClick(card) {
        if (this.isChecking || card.isActive || card.isDone) return;

        card.setActive();

        if (!this.firstCard) {
            this.firstCard = card;

            return;
        }

        this._checkPair(this.firstCard, card);
    }
    _checkPair(firstCard, secondCard) {
        const isMatch =
            firstCard.element.dataset.id === secondCard.element.dataset.id;
        this._plusCountMove();
        if (isMatch) {
            firstCard.setDone();
            secondCard.setDone();
            this._resetTurn();
        } else {
            this.isChecking = true;
            setTimeout(() => {
                firstCard.setDisActive();
                secondCard.setDisActive();
                this._resetTurn();
            }, 800);
        }
        const doneCards = this.cards.filter((item) => item.isDone);
        this.countDoneNode.innerText = doneCards.length / 2;
        if (doneCards.length === 16) {
            this.LocalStorage.setStat(this.moves);
            this.handleFinishGame();
        }
    }
    _resetTurn() {
        this.firstCard = null;
        this.isChecking = false;
    }
    _plusCountMove() {
        this.moves++;
        this.countMovesNode.innerText = this.moves;
    }
    _resetCountMove() {
        this.moves = 0;
        this.countMovesNode.innerText = this.moves;
    }

    newGame() {
        this._resetCountMove();
        this.cards.forEach((item) => item.destroy());
        this.cards = this._createCards();
    }
}

class Card {
    constructor({ imageUrl, id, name, onClick }) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.name = name;
        this.isActive = false;
        this.isDone = false;
        this.element = this._createElement();
        this.onClick = onClick;
    }

    _createElement() {
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.id = this.id;
        card.dataset.name = this.name;

        const cardInner = document.createElement("div");
        cardInner.className = "card-inner";

        const cardBack = document.createElement("div");
        cardBack.className = "card-face card-back";
        const spanBack = document.createElement("span");
        spanBack.innerText = "?";

        const cardFront = document.createElement("div");
        cardFront.className = "card-face card-front";
        const imgFront = document.createElement("img");
        imgFront.src = this.imageUrl;
        imgFront.alt = this.name;

        const maskDone = document.createElement("div");
        maskDone.className = "mask-done";
        const spanDone = document.createElement("span");
        spanDone.innerText = "✓";

        cardBack.append(spanBack);
        cardFront.append(imgFront);
        maskDone.append(spanDone);

        cardInner.append(cardBack);
        cardInner.append(cardFront);
        cardInner.append(maskDone);

        card.append(cardInner);

        card.addEventListener("click", () => this.onClick(this));

        return card;
    }

    setActive() {
        if (this.isActive || this.isDone) return;

        this.isActive = true;

        this.element.classList.add("active");
    }

    setDisActive() {
        if (this.isDone) return;
        this.isActive = false;
        this.element.classList.remove("active");
    }

    setDone() {
        this.isDone = true;
        this.element.classList.add("done");
    }

    destroy() {
        this.element.remove();
    }
}
