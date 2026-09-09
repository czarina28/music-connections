let currentPuzzleIndex = Math.floor(Math.random() * PUZZLES.length);
let puzzle = PUZZLES[currentPuzzleIndex].groups;
let remainingCards = puzzle.flatMap(group => group.cards);
let selected = [];
let solved = [];
let mistakesRemaining = 4;
let roundOver = false;
let roundFailed = false;
let roundNumber = 1;
let score = 0;

const board = document.getElementById("board");
const solvedGroups = document.getElementById("solvedGroups");
const mistakes = document.getElementById("mistakes");
const message = document.getElementById("message");
const roundNumberDisplay = document.getElementById("roundNumber");
const scoreDisplay = document.getElementById("score");
const nextRoundBtn = document.getElementById("nextRoundBtn");
const newGameBtn = document.getElementById("newGameBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const deselectBtn = document.getElementById("deselectBtn");
const submitBtn = document.getElementById("submitBtn");

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function render() {
    board.innerHTML = "";
    remainingCards.forEach(card => {
        const button = document.createElement("button");
        button.className = "card";
        button.textContent = card;
        if (selected.includes(card)) button.classList.add("selected");
        button.addEventListener("click", () => selectCard(card));
        board.appendChild(button);
    });

    mistakes.innerHTML = "";
    for (let i = 0; i < mistakesRemaining; i++) {
        const dot = document.createElement("span");
        dot.className = "mistake-dot";
        mistakes.appendChild(dot);
    }

    roundNumberDisplay.textContent = roundNumber;
    scoreDisplay.textContent = score;

    shuffleBtn.style.display = roundFailed ? "none" : "inline-block";
    deselectBtn.style.display = roundFailed ? "none" : "inline-block";
    submitBtn.style.display = roundFailed ? "none" : "inline-block";
    nextRoundBtn.style.display = roundOver && !roundFailed ? "inline-block" : "none";
    newGameBtn.style.display = roundFailed ? "inline-block" : "none";
}

function selectCard(card) {
    if (roundOver) return;
    if (selected.includes(card)) selected = selected.filter(item => item !== card);
    else {
        if (selected.length >= 4) return;
        selected.push(card);
    }
    message.textContent = "";
    render();
}

function submitGuess() {
    if (roundOver) return;
    if (selected.length !== 4) {
        message.textContent = "Select four cards.";
        return;
    }

    const match = puzzle.find(group =>
        group.cards.every(card => selected.includes(card)) &&
        selected.every(card => group.cards.includes(card))
    );

    if (match) {
        solved.push(match);
        remainingCards = remainingCards.filter(card => !match.cards.includes(card));
        showSolvedGroup(match);
        selected = [];
        message.textContent = "Correct.";

        if (solved.length === 4) {
            const pointsEarned = mistakesRemaining;
            score += pointsEarned;
            roundOver = true;
            message.textContent = `ROUND COMPLETE — +${pointsEarned} ${pointsEarned === 1 ? "POINT" : "POINTS"}`;
        }
    } else {
        mistakesRemaining--;
        selected = [];
        message.textContent = "Not quite.";

        if (mistakesRemaining === 0) {
            roundOver = true;
            roundFailed = true;
            message.textContent = "ROUND OVER — +0 POINTS";
            revealRemainingGroups();
        }
    }
    render();
}

function showSolvedGroup(group, wasSolved = true) {
    const div = document.createElement("div");
    div.className = "solved-group";
    if (!wasSolved) div.classList.add("revealed-group");
    div.innerHTML = `<strong>${group.connection}</strong><span>${group.cards.join(" · ")}</span>`;
    solvedGroups.appendChild(div);
}

function revealRemainingGroups() {
    puzzle.forEach(group => {
        if (!solved.includes(group)) showSolvedGroup(group, false);
    });
    remainingCards = [];
}

function chooseDifferentPuzzle() {
    let nextIndex;
    do {
        nextIndex = Math.floor(Math.random() * PUZZLES.length);
    } while (PUZZLES.length > 1 && nextIndex === currentPuzzleIndex);
    return nextIndex;
}

function loadRound(nextIndex) {
    currentPuzzleIndex = nextIndex;
    puzzle = PUZZLES[currentPuzzleIndex].groups;
    remainingCards = puzzle.flatMap(group => group.cards);
    selected = [];
    solved = [];
    mistakesRemaining = 4;
    roundOver = false;
    roundFailed = false;
    solvedGroups.innerHTML = "";
    message.textContent = "";
    shuffle(remainingCards);
    render();
}

function startNextRound() {
    roundNumber++;
    loadRound(chooseDifferentPuzzle());
}

function startNewGame() {
    roundNumber = 1;
    score = 0;
    loadRound(chooseDifferentPuzzle());
}

submitBtn.addEventListener("click", submitGuess);
deselectBtn.addEventListener("click", () => {
    if (roundOver) return;
    selected = [];
    message.textContent = "";
    render();
});
shuffleBtn.addEventListener("click", () => {
    if (roundOver) return;
    shuffle(remainingCards);
    selected = [];
    render();
});
nextRoundBtn.addEventListener("click", startNextRound);
newGameBtn.addEventListener("click", startNewGame);

shuffle(remainingCards);
render();