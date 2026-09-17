// Music Connections v1.1 freemium progression layer
const FREE_PUZZLE_SEQUENCE = [6, 22, 26, 14, 33, 43, 38, 29, 47, 50];
const FREE_PUZZLE_IDS = new Set(FREE_PUZZLE_SEQUENCE);
const PROGRESS_KEY = "musicConnectionsCompletedPuzzleIds";

// StoreKit is the source of truth for Full Game ownership on iOS.
let hasFullGame = false;
let storeProduct = null;
let storeReady = false;
let purchaseBusy = false;

function ownsFullGame(result) {
    const purchases = result?.purchases || [];

    return purchases.some(
        purchase =>
            purchase.productIdentifier === window.MusicConnectionsStore?.PRODUCT_ID
    );
}
async function initializeStore() {
    const store = window.MusicConnectionsStore;
    if (!store) return;

    try {
        const productResult = await store.getProduct();
        storeProduct = productResult?.product || productResult || null;

        const purchases = await store.getPurchases();
        hasFullGame = ownsFullGame(purchases);
        storeReady = true;

        if (hasFullGame && freeCollectionComplete) {
            freeCollectionComplete = false;
            roundNumber = completedPuzzleIds.size + 1;
            loadRound(chooseNextPuzzleIndex());
        } else if (freeCollectionComplete) {
            showFreeCollectionComplete();
        }
    } catch (error) {
        console.error("StoreKit initialization failed:", error);
        storeReady = false;
        if (freeCollectionComplete) showFreeCollectionComplete();
    }
}

async function purchaseFullGame() {
    if (purchaseBusy || !window.MusicConnectionsStore) return;

    purchaseBusy = true;
    showFreeCollectionComplete("Opening App Store...");

    try {
        const transaction = await window.MusicConnectionsStore.purchaseFullGame();

        if (transaction?.productIdentifier !== window.MusicConnectionsStore.PRODUCT_ID) {
            throw new Error("Purchase returned an unexpected product.");
        }

        hasFullGame = true;
        freeCollectionComplete = false;
        roundNumber = completedPuzzleIds.size + 1;
        loadRound(chooseNextPuzzleIndex());
    } catch (error) {
        console.error("Purchase failed or cancelled:", error);
        showFreeCollectionComplete("Purchase not completed.");
    } finally {
        purchaseBusy = false;
    }
}

async function restoreFullGame() {
    if (purchaseBusy || !window.MusicConnectionsStore) return;

    purchaseBusy = true;
    showFreeCollectionComplete("Checking purchases...");

    try {
        const purchases = await window.MusicConnectionsStore.restorePurchases();

        if (ownsFullGame(purchases)) {
            hasFullGame = true;
            freeCollectionComplete = false;
            roundNumber = completedPuzzleIds.size + 1;
            loadRound(chooseNextPuzzleIndex());
        } else {
            showFreeCollectionComplete("No Full Game purchase found.");
        }
    } catch (error) {
        console.error("Restore failed:", error);
        showFreeCollectionComplete("Could not restore purchases.");
    } finally {
        purchaseBusy = false;
    }
}

function puzzleHasUniqueCards(puzzleEntry) {
    const cards = puzzleEntry.groups.flatMap(group => group.cards);
    return cards.length === 16 && new Set(cards).size === 16;
}

function loadCompletedPuzzleIds() {
    try {
        const saved = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "[]");
        return new Set(Array.isArray(saved) ? saved.filter(Number.isInteger) : []);
    } catch {
        return new Set();
    }
}

let completedPuzzleIds = loadCompletedPuzzleIds();

function saveProgress() {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify([...completedPuzzleIds]));
}

const VALID_PUZZLE_INDEXES = PUZZLES
    .map((puzzleEntry, index) => puzzleHasUniqueCards(puzzleEntry) ? index : -1)
    .filter(index => index !== -1);

const VALID_INDEX_BY_ID = new Map(
    VALID_PUZZLE_INDEXES.map(index => [PUZZLES[index].id, index])
);

if (VALID_PUZZLE_INDEXES.length === 0) {
    throw new Error("No valid puzzles available: every puzzle must contain 16 unique cards.");
}

function getNextFreePuzzleIndex() {
    const nextId = FREE_PUZZLE_SEQUENCE.find(id => !completedPuzzleIds.has(id));
    return nextId === undefined ? null : VALID_INDEX_BY_ID.get(nextId) ?? null;
}

function getUnplayedFullPuzzleIndexes() {
    return VALID_PUZZLE_INDEXES.filter(index => !completedPuzzleIds.has(PUZZLES[index].id));
}

function chooseRandomIndex(indexes) {
    if (indexes.length === 0) return null;
    return indexes[Math.floor(Math.random() * indexes.length)];
}

function chooseNextPuzzleIndex() {
    if (!hasFullGame) return getNextFreePuzzleIndex();

    const unplayed = getUnplayedFullPuzzleIndexes();
    if (unplayed.length > 0) return chooseRandomIndex(unplayed);

    // Once the entire collection has been completed, allow replaying the full library.
    const alternatives = VALID_PUZZLE_INDEXES.filter(index => index !== currentPuzzleIndex);
    return chooseRandomIndex(alternatives.length ? alternatives : VALID_PUZZLE_INDEXES);
}

let currentPuzzleIndex = hasFullGame ? chooseNextPuzzleIndex() : getNextFreePuzzleIndex();
let puzzle = currentPuzzleIndex === null ? [] : PUZZLES[currentPuzzleIndex].groups;
let remainingCards = puzzle.flatMap(group => group.cards);
let selected = [];
let solved = [];
let mistakesRemaining = 4;
let roundOver = currentPuzzleIndex === null;
let roundFailed = false;
let freeCollectionComplete = !hasFullGame && currentPuzzleIndex === null;
let roundNumber = hasFullGame ? completedPuzzleIds.size + 1 : FREE_PUZZLE_SEQUENCE.filter(id => completedPuzzleIds.has(id)).length + 1;
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

function showFreeCollectionComplete(statusText = "") {
    freeCollectionComplete = true;
    roundOver = true;
    board.innerHTML = "";
    solvedGroups.innerHTML = "";
    mistakes.innerHTML = "";

    mistakes.parentElement.style.display = "none";

    const price = storeProduct?.priceString || "";
    const nativeStoreAvailable = !!window.MusicConnectionsStore;

    message.innerHTML = `
        <div class="paywall">
            <div class="paywall-title">YOU'VE COMPLETED THE FREE COLLECTION</div>
            <div class="paywall-copy"><strong>64 more puzzles await.</strong></div>
            ${
                nativeStoreAvailable
                    ? `<button id="unlockFullGameBtn" class="primary paywall-buy" ${purchaseBusy ? "disabled" : ""}>
                           UNLOCK FULL GAME${price ? ` - ${price}` : ""}
                       </button>
                       <button id="restorePurchasesBtn" class="paywall-restore" ${purchaseBusy ? "disabled" : ""}>
                           RESTORE PURCHASES
                       </button>`
                    : `<div class="paywall-web">Full Game available in the iPhone app.</div>`
            }
            ${statusText ? `<div class="paywall-status">${statusText}</div>` : ""}
        </div>
    `;

    document.getElementById("unlockFullGameBtn")?.addEventListener("click", purchaseFullGame);
    document.getElementById("restorePurchasesBtn")?.addEventListener("click", restoreFullGame);

    shuffleBtn.style.display = "none";
    deselectBtn.style.display = "none";
    submitBtn.style.display = "none";
    nextRoundBtn.style.display = "none";
    newGameBtn.style.display = "none";
}
function render() {
    mistakes.parentElement.style.display = "";
    if (freeCollectionComplete) {
        showFreeCollectionComplete();
        return;
    }

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

    roundNumberDisplay.textContent = hasFullGame ? roundNumber : `${Math.min(roundNumber, 10)}/10`;
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
            completedPuzzleIds.add(PUZZLES[currentPuzzleIndex].id);
            saveProgress();
            message.textContent = `ROUND COMPLETE â€” +${pointsEarned} ${pointsEarned === 1 ? "POINT" : "POINTS"}`;

            if (!hasFullGame && getNextFreePuzzleIndex() === null) {
                showFreeCollectionComplete();
                return;
            }
        }
    } else {
        mistakesRemaining--;
        selected = [];
        message.textContent = "Not quite.";

        if (mistakesRemaining === 0) {
            roundOver = true;
            roundFailed = true;
            message.textContent = "ROUND OVER â€” +0 POINTS";
            revealRemainingGroups();
        }
    }
    render();
}

function showSolvedGroup(group, wasSolved = true) {
    const div = document.createElement("div");
    div.className = "solved-group";
    if (!wasSolved) div.classList.add("revealed-group");
    div.innerHTML = `<strong>${group.connection}</strong><span>${group.cards.join(" Â· ")}</span>`;
    solvedGroups.appendChild(div);
}

function revealRemainingGroups() {
    puzzle.forEach(group => {
        if (!solved.includes(group)) showSolvedGroup(group, false);
    });
    remainingCards = [];
}

function loadRound(nextIndex) {
    if (nextIndex === null) {
        showFreeCollectionComplete();
        return;
    }

    currentPuzzleIndex = nextIndex;
    puzzle = PUZZLES[currentPuzzleIndex].groups;
    remainingCards = puzzle.flatMap(group => group.cards);
    selected = [];
    solved = [];
    mistakesRemaining = 4;
    roundOver = false;
    roundFailed = false;
    freeCollectionComplete = false;
    solvedGroups.innerHTML = "";
    message.textContent = "";
    shuffle(remainingCards);
    render();
}

function startNextRound() {
    roundNumber++;
    loadRound(chooseNextPuzzleIndex());
}

function startNewGame() {
    score = 0;
    loadRound(currentPuzzleIndex);
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

if (freeCollectionComplete) showFreeCollectionComplete();
else {
    shuffle(remainingCards);
    render();
}

// Ask StoreKit for the current Apple product and existing entitlement.
// Browser/GitHub Pages builds continue to work as the free edition.
initializeStore();







