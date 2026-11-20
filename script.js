const clickBtn = document.getElementById('click-btn');
const upgradeBtn = document.getElementById('upgrade-btn');
const autoUpgradeBtn = document.getElementById('auto-upgrade-btn');
const scoreEl = document.getElementById('score');
const totalClicksEl = document.getElementById('total-clicks');
const pointsPerSecondEl = document.getElementById('points-per-second');
const clickPowerEl = document.getElementById('click-power');
const achievementEl = document.getElementById('achievement');

let score = 0;
let totalClicks = 0;
let clickPower = 1;
let upgradeCost = 10;
let autoPower = 0;
let autoUpgradeCost = 50;
let achievementUnlocked = false;

function loadGame() {
    const savedGame = localStorage.getItem('clickerSave');

    if (savedGame) {
        try {
            const data = JSON.parse(savedGame);

            score = data.score ?? 0;
            totalClicks = data.totalClicks ?? 0;
            clickPower = data.clickPower ?? 1;
            upgradeCost = data.upgradeCost ?? 10;
            autoPower = data.autoPower ?? 0;
            autoUpgradeCost = data.autoUpgradeCost ?? 50;
            achievementUnlocked = data.achievementUnlocked ?? false;

        } catch (error) {
            console.log('Ошибка загрузки сохранения');
        }
    }
}

function saveGame() {
    const gameData = {
        score,
        totalClicks,
        clickPower,
        upgradeCost,
        autoPower,
        autoUpgradeCost,
        achievementUnlocked
    };

    localStorage.setItem('clickerSave', JSON.stringify(gameData));
}

function updateInterface() {
    scoreEl.textContent = score;
    totalClicksEl.textContent = totalClicks;
    pointsPerSecondEl.textContent = autoPower;
    clickPowerEl.textContent = clickPower;

    upgradeBtn.disabled = score < upgradeCost;
    upgradeBtn.textContent = `Улучшить клик (${upgradeCost} очков)`;

    autoUpgradeBtn.disabled = score < autoUpgradeCost;
    autoUpgradeBtn.textContent = `Купить автоклик (${autoUpgradeCost} очков)`;

    achievementEl.hidden = !achievementUnlocked;

    saveGame();
}


function checkAchievement() {
    if (score >= 50 && !achievementUnlocked) {
        achievementUnlocked = true;
    }
}

clickBtn.addEventListener('click', () => {
    score += clickPower;
    totalClicks++;

    checkAchievement();
    updateInterface();
});

upgradeBtn.addEventListener('click', () => {
    if (score >= upgradeCost) {
        score -= upgradeCost;
        clickPower++;

        upgradeCost *= 2;

        updateInterface();
    }
});


autoUpgradeBtn.addEventListener('click', () => {
    if (score >= autoUpgradeCost) {
        score -= autoUpgradeCost;

        autoPower++;

        autoUpgradeCost *= 2;

        updateInterface();
    }
});


setInterval(() => {
    if (autoPower > 0) {
        score += autoPower;

        checkAchievement();
        updateInterface();
    }
}, 1000);


loadGame();
updateInterface();