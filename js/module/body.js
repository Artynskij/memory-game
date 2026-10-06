export class Body {
    constructor({ handleClickNewGame, handleOpenStat }) {
        this.handleClickNewGame = handleClickNewGame;
        this.handleOpenStat = handleOpenStat;
        this.createBody();
    }
    _createHeader() {
        const header = document.createElement("header");
        header.classList.add("header");
        const container = document.createElement("div");
        container.classList.add("container");
        const logo = document.createElement("a");
        logo.classList.add("logo");
        logo.href = "./index.html";
        const logoImg = document.createElement("img");
        logoImg.alt = "logo";
        logoImg.src = "./img/icons/favicon.png";
        const buttonNewGame = document.createElement("button");
        buttonNewGame.classList.add("button", "button--new__game");
        buttonNewGame.innerText = "Новая игра";
        buttonNewGame.addEventListener("click", this.handleClickNewGame);
        const buttonStat = document.createElement("button");
        buttonStat.classList.add("button", "button--stat");
        buttonStat.innerText = "Таблица лидерова";
        buttonStat.addEventListener("click", () => this.handleOpenStat());
        logo.append(logoImg);

        const countGame = document.createElement("div");
        countGame.classList.add("count-game");
        const firstSpan = document.createElement("span");
        firstSpan.innerText = "Ходов:";
        const secondSpan = document.createElement("span");
        secondSpan.id = "count-game";
        secondSpan.innerText = 0;
        countGame.append(firstSpan, secondSpan);

        const doneCard = document.createElement("div");
        doneCard.classList.add("done-cards");
        const doneFirstSpan = document.createElement("span");
        doneFirstSpan.innerText = "Найдено: ";
        const doneSecondSpan = document.createElement("span");
        doneSecondSpan.id = "count-done";
        doneSecondSpan.innerText = 0;
        const doneThirdSpan = document.createElement("span");
        doneThirdSpan.innerText = "/8";
        const doneFourSpan = document.createElement("span");
        doneFourSpan.innerText = " пар.";
        doneCard.append(
            doneFirstSpan,
            doneSecondSpan,
            doneThirdSpan,
            doneFourSpan,
        );

        container.append(logo, buttonNewGame, buttonStat, countGame, doneCard);

        header.append(container);
        return header;
    }
    _createMain() {
        const main = document.createElement("main");
        const container = document.createElement("div");
        container.classList.add("container");
        const field = document.createElement("div");
        field.classList.add("field");
        field.id = "field";

        container.append(field);
        main.append(container);
        return main;
    }
    _createFooter() {
        const footer = document.createElement("footer");
        const container = document.createElement("div");
        container.classList.add("container");
        const linkGit = document.createElement("a");
        linkGit.classList.add("underline-hover", "link__git");
        linkGit.href = "https://github.com/artynskij";
        linkGit.innerText = "GitHub";
        const linkRs = document.createElement("a");
        linkRs.href = "https://rs.school/";
        const imgRs = document.createElement("img");
        imgRs.src = "./img/icons/rs-logo.svg";
        imgRs.alt = "RS School logo";
        imgRs.width = "80";

        const yearText = document.createElement("p");
        yearText.innerText = "© 2026";

        linkRs.append(imgRs);

        container.append(linkGit);
        container.append(linkRs);
        container.append(yearText);

        footer.append(container);
        return footer;
    }

    createBody() {
        const body = document.querySelector("body");
        const wrapper = document.createElement("div");
        wrapper.className = "wrapper";

        const header = this._createHeader();
        const main = this._createMain();
        const footer = this._createFooter();

        wrapper.append(header);
        wrapper.append(main);
        wrapper.append(footer);
        body.prepend(wrapper);
    }
}
