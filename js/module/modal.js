import { LocalStorage } from "./localstorage.js";

export class Modal {
    constructor({ handleClickNewGame }) {
        this.LocalStorage = new LocalStorage();
        this.modal = null;
        this.modalOverlay = null;
        this.modalContent = document.querySelector(".modal-content");
        this.body = document.querySelector("body");
        this.scrollWidth = window.innerWidth - this.body.offsetWidth;
        this.handleClickNewGame = handleClickNewGame;
        this._keydownListener = this._keydownListener.bind(this);

        this.body.append(this._createModalBase());
    }
    callModal(type) {
        if (type === "finish") {
            this._createContentFinishGame();
        } else if (type === "stat") {
            this._createContentStat();
        }
    }
    _createContentStat() {
        const dataStat = this.LocalStorage.getStat();

        const title = document.createElement("div");
        title.classList.add("modal-title");
        title.innerText = "Статистика";
        const blockButtons = document.createElement("div");
        blockButtons.classList.add("buttons-block");

        const buttonCloseModal = document.createElement("button");
        buttonCloseModal.classList.add("button--close-modal", "button");
        buttonCloseModal.innerText = "Закрыть";

        const list = document.createElement("ul");
        list.className = "leaderboard";
        if (dataStat.length) {
            dataStat.forEach((item, index) => {
                const listEl = document.createElement("li");
                listEl.className = "leaderboard__row";
                const spanNumber = document.createElement("span");
                spanNumber.className = "leaderboard__rank";
                const spanMoves = document.createElement("span");
                spanMoves.className = "leaderboard__moves";
                const spanTime = document.createElement("span");
                spanTime.className = "leaderboard__date";
                spanNumber.innerText = index + 1;
                spanMoves.innerText = `Количество ходов: ${item.moves}`;
                spanTime.innerText = item.date;
                listEl.append(spanNumber, spanMoves, spanTime);
                list.append(listEl);
            });
        } else {
            const listEl = document.createElement("li");
            const span = document.createElement("span");
            span.innerText = "Статистика игр отсутствует";

            listEl.append(span);
            list.append(listEl);
        }
        blockButtons.append(buttonCloseModal);
        const modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");
        modalContent.append(title, list, blockButtons);
        this.modalContent = modalContent;
        this.modal.append(modalContent);
        this._openModal();

        buttonCloseModal.addEventListener("click", () => this._closeModal());
    }
    _createContentFinishGame() {
        const title = document.createElement("div");
        title.classList.add("modal-title");
        title.innerText = "Поздравляю с победой!";
        const blockButtons = document.createElement("div");
        blockButtons.classList.add("buttons-block");
        const buttonNewGame = document.createElement("button");
        buttonNewGame.classList.add("button--reload", "button");
        buttonNewGame.innerText = "Новая игра";
        const buttonCloseModal = document.createElement("button");
        buttonCloseModal.classList.add("button--close-modal", "button");
        buttonCloseModal.innerText = "Закрыть";

        blockButtons.append(buttonNewGame, buttonCloseModal);

        const modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");
        modalContent.append(title, blockButtons);

        this.modalContent = modalContent;
        this.modal.append(modalContent);
        this._openModal();
        buttonNewGame.addEventListener("click", () => {
            this.handleClickNewGame();
            this._closeModal();
        });
        buttonCloseModal.addEventListener("click", () => this._closeModal());
    }

    _openModal() {
        this.modal.classList.add("modal--visible");
        this.modalOverlay.classList.add("modal-overlay--visible");
        this.body.style.overflow = "hidden";
        this.body.style.paddingRight = `${this.scrollWidth}px`;
        this.modalOverlay.addEventListener("click", (e) => {
            if (e.target == this.modalOverlay) {
                this._closeModal();
            }
        });
        document.addEventListener("keydown", this._keydownListener);
    }
    _closeModal() {
        this.modalOverlay.classList.remove("modal-overlay--visible");
        this.modal.classList.remove("modal--visible");
        this.body.style.overflow = "auto";
        this.body.style.paddingRight = "0px";
        this.modalContent.remove();
        document.removeEventListener("keydown", this._keydownListener);
    }
    _keydownListener(e) {
        if (e.key === "Escape") {
            this._closeModal();
        }
    }
    _createModalBase() {
        const modals = document.createElement("div");
        modals.classList.add("modals");

        const modalOverlay = document.createElement("div");
        modalOverlay.classList.add("modal-overlay");
        this.modalOverlay = modalOverlay;
        const modal = document.createElement("div");
        modal.classList.add("modal");
        this.modal = modal;
        const closeModal = document.createElement("div");
        closeModal.classList.add("modal-close");
        closeModal.innerText = "X";
        closeModal.addEventListener("click", () => {
            this._closeModal();
        });
        modal.append(closeModal);

        modalOverlay.append(modal);
        modals.append(modalOverlay);

        return modals;
    }
}
