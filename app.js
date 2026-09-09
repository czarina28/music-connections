const puzzle = [
    {
        connection: "YARDBIRDS GUITARISTS",
        explanation: "Guitarists who played with The Yardbirds",
        cards: [
            "Eric Clapton",
            "Jeff Beck",
            "Jimmy Page",
            "Top Topham"
        ]
    },
    {
        connection: "VELVET UNDERGROUND",
        explanation: "Members of The Velvet Underground",
        cards: [
            "Lou Reed",
            "John Cale",
            "Moe Tucker",
            "Sterling Morrison"
        ]
    },
    {
        connection: "BOWIE PERSONAS",
        explanation: "Personas associated with David Bowie",
        cards: [
            "Ziggy Stardust",
            "Aladdin Sane",
            "Thin White Duke",
            "Major Tom"
        ]
    },
    {
        connection: "WOODSTOCK PERFORMERS",
        explanation: "Artists who performed at Woodstock in 1969",
        cards: [
            "Janis Joplin",
            "Jimi Hendrix",
            "Joe Cocker",
            "Richie Havens"
        ]
    }
];

let remainingCards = puzzle.flatMap(group => group.cards);
let selected = [];
let solved = [];
let mistakesRemaining = 4;
let gameOver = false;

const board = document.getElementById("board");
const solvedGroups = document.getElementById("solvedGroups");
const mistakes = document.getElementById("mistakes");
const message = document.getElementById("message");

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

        if (selected.includes(card)) {
            button.classList.add("selected");
        }

        button.addEventListener("click", () => selectCard(card));
        board.appendChild(button);
    });

    mistakes.innerHTML = "";

    for (let i = 0; i < mistakesRemaining; i++) {
        const dot = document.createElement("span");
        dot.className = "mistake-dot";
        mistakes.appendChild(dot);
    }
}

function selectCard(card) {
    if (gameOver) return;

    if (selected.includes(card)) {
        selected = selected.filter(item => item !== card);
    } else {
        if (selected.length >= 4) return;
        selected.push(card);
    }

    message.textContent = "";
    render();
}

function submitGuess() {
    if (gameOver) return;

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

        remainingCards = remainingCards.filter(
            card => !match.cards.includes(card)
        );

        showSolvedGroup(match);

        selected = [];
        message.textContent = "Correct.";

        if (solved.length === 4) {
            message.textContent = "You found all four connections!";
            gameOver = true;
        }

    } else {
        mistakesRemaining--;
        selected = [];
        message.textContent = "Not quite.";

        if (mistakesRemaining === 0) {
            message.textContent = "Game over.";
            gameOver = true;
            revealRemainingGroups();
        }
    }

    render();
}

function showSolvedGroup(group) {
    const div = document.createElement("div");
    div.className = "solved-group";

    div.innerHTML = `
        <strong>${group.connection}</strong>
        <span>${group.cards.join(" · ")}</span>
    `;

    solvedGroups.appendChild(div);
}

function revealRemainingGroups() {
    puzzle.forEach(group => {
        if (!solved.includes(group)) {
            showSolvedGroup(group);
        }
    });

    remainingCards = [];
}

document.getElementById("submitBtn").addEventListener("click", submitGuess);

document.getElementById("deselectBtn").addEventListener("click", () => {
    selected = [];
    message.textContent = "";
    render();
});

document.getElementById("shuffleBtn").addEventListener("click", () => {
    shuffle(remainingCards);
    selected = [];
    render();
});

shuffle(remainingCards);
render();