//funkcije za save i load

export function saveBoard() {
    const board = document.querySelector(".kanbanBoard");
    if (board) {
        localStorage.setItem("kanbanBoardHTML", board.innerHTML);
    }
}

export function loadBoard() {
    const board = document.querySelector(".kanbanBoard");
    const saved = localStorage.getItem("kanbanBoardHTML");
    if (board && saved) {
        board.innerHTML = saved;
    }
}