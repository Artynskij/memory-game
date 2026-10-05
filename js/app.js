import { Body } from "./module/body.js";
import { Game } from "./module/game.js";
import { Modal } from "./module/modal.js";

const body = new Body({
    handleClickNewGame: handleClickNewGame,
    handleOpenStat: handleOpenStat,
});

const modal = new Modal({ handleClickNewGame: handleClickNewGame });
const game = new Game(handleFinishGame);

function handleClickNewGame() {
    game.newGame();
}
function handleOpenStat() {
    modal.callModal("stat");
}
function handleFinishGame() {
    setTimeout(() => modal.callModal("finish"), 500);
}
