function getValidShuffle(array) {
    let shuffled = [...array];
    let isValid = false;
    let attempts = 0;

    while (!isValid && attempts < 500) {
        attempts++;
        // Fisher-Yates Shuffle
        for (let i = shuffled.length - 1; i > 0; i--) {
            const k = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[k]] = [shuffled[k], shuffled[i]];
        }

        // Checking if one player plays twice
        isValid = true;
        for (let i = 0; i < shuffled.length - 1; i++) {
            if (shuffled[i].player === shuffled[i+1].player) {
                isValid = false;
                break;
            }
        }
    }
    return shuffled;
}



//Helper function to turn a regular YouTube link into an embed link
function getEmbedUrl(url) {
    let videoId = "";
    if (url.includes("v=")) {
        videoId = url.split("v=")[1].split("&")[0];
    } else if (url.includes("be/")) {
        videoId = url.split("be/")[1].split("?")[0];
    }
    return `https://www.youtube.com/embed/${videoId}`;
}

//Load Data
let battleData = JSON.parse(localStorage.getItem('battleData')) || [];
const params = new URLSearchParams(window.location.search);
let step = parseInt(params.get('step')) || 1;

const index1 = (step - 1);
const index2 = index1 + 1;

// Inject Content
if (battleData[index1]) {
    document.getElementById('player-a-name').innerText = battleData[index1].player;
    document.getElementById('video-a').src = getEmbedUrl(battleData[index1].song);
}

if (battleData[index2]) {
    document.getElementById('player-b-name').innerText = battleData[index2].player;
    document.getElementById('video-b').src = getEmbedUrl(battleData[index2].song);
} else {
    // If there's an odd number of songs, Player A wins by default or waits
    document.getElementById('player-b-name').innerText = "No Opponent";
}

// Voting logic
function vote(winnumber) {

    if (winnumber === 1){
        battleData.splice(index2, 1);
    }
    else {
        battleData.splice(index1, 1);
    }

    localStorage.setItem('battleData', JSON.stringify(battleData));

    if (battleData.length > index1 + 1) {
        window.location.href = `battle.html?step=${step + 1}`;
    } else if (battleData.length > 1) {
        // End of round: Go back to step 1 with survivors
        if (battleData[index1].player === battleData[index1].player) {
            window.location.href = "battle.html?step=1";
        }
        else {
            getValidShuffle(battleData);
            window.location.href = "battle.html?step=1";
        }
    } else {
        // Tournament Winner
        window.location.href = "winner.html";
    }
}