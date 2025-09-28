const coin = document.getElementById('coin');
const flipbutton = document.getElementById('flipbutton');
const result = document.getElementById('result');
const headsCount = document.getElementById('headsCount');
const tailsCount = document.getElementById('tailsCount');
const historyList = document.getElementById('historyList');
const clearButton = document.getElementById('clearButton');

let heads = 0;
let tails = 0;

let history = [];
let isFlipping = false;

function flipCoin() {
    if (isFlipping) return;

    isFlipping = true;
    flipbutton.disabled = true;
    result.textContent = '';
    coin.classList.add('flipping');

    const isHeads = Math.random() < 0.5;

    setTimeout(() => {
        if (isHeads) {
            result.textContent = "🎉 Heads! 🎉";
            heads++;
            headsCount.textContent = heads;
            coin.style.transform = 'rotateY(0deg)';
            addToHistory('heads');
        } else {
            result.textContent = "🎉 Tails! 🎉";
            tails++;
            tailsCount.textContent = tails;
            coin.style.transform = 'rotateY(180deg)';
            addToHistory('tails');
        }

        coin.classList.remove('flipping');
        isFlipping = false;
        flipbutton.disabled = false;
    }, 2000);
}

function addToHistory(outcome) {
    history.unshift(outcome);
    if (history.length > 20) history = history.slice(0, 20);

    historyList.innerHTML = history.map(r => `
        <span class="history-item ${r}">${r[0].toUpperCase()}</span>
    `).join("") || '<span style="color: #888; font-style: italic;">No Flip Yet</span>';
}

function clearHistory() {
    heads = 0;
    tails = 0;
    history = [];

    headsCount.textContent = '0';
    tailsCount.textContent = '0';
    result.textContent = '';
    coin.style.transform = 'rotateY(0deg)';
    historyList.innerHTML = '<span style="color: #888; font-style: italic;">No Flip Yet</span>';
}

flipbutton.onclick = flipCoin;
coin.onclick = flipCoin;
clearButton.onclick = clearHistory;