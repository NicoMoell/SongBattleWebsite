const params = new URLSearchParams(window.location.search);
const playernumber = parseInt(params.get('selected_playernumber'));
const songnumber = parseInt(params.get('selected_songnumber'));
const container = document.getElementById('songs_container');
const entrytitle = document.getElementById('entrytext');

entrytitle.innerHTML = "<h2> Please enter the name of your " + playernumber + " players and paste the link of the " + songnumber + " songs for each player below. </h2>";

if ((playernumber * songnumber) % 2 === 0 )
{
    if (playernumber && songnumber > 0) {
        for (let i = 0; i < playernumber; i++) {
            const wrapper = document.createElement('div');
            wrapper.classList.add('songwrappers');
            const playername = document.createElement('input');
            playername.type = 'text';
            playername.placeholder = "Player" + (i + 1);
            playername.id = "p" + i;
            wrapper.appendChild(playername);
            for (let j = 0; j < songnumber; j++) {
                const songlink = document.createElement('input');
                songlink.type = 'text';
                songlink.placeholder = "Paste Link here...";
                songlink.classList.add('dynamic-input');
                songlink.id = "p" + i + "-s" + j;
                wrapper.appendChild(songlink);
            }
            container.appendChild(wrapper);
        }
    }
    else {
        container.innerHTML = "<h2>No number selected. Please go back.</h2>";
    }

}
else {
    container.innerHTML = "<h2>You did not choose an even number of songs. Please go back.</h2>";
}

if ((playernumber * songnumber) % 2 === 0 )
{
    const confirmBtn = document.createElement('button');
    confirmBtn.classList.add('buttons');
    confirmBtn.textContent = "Confirm";
    container.appendChild(confirmBtn);

    confirmBtn.onclick = function() {
        let flatList = [];

        // Gather all data into a flat list
        for (let i = 0; i < playernumber; i++) {
            const playerName = document.getElementById("p" + i).value || "Player " + (i + 1);

            for (let j = 0; j < songnumber; j++) {
                const songLink = document.getElementById("p" + i + "-s" + j).value;
                if (songLink.trim() !== "") {
                    flatList.push({
                        player: playerName,
                        song: songLink.trim()
                    });
                }
            }
        }

        // Shuffle and Validate function
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

        const finalBattleList = getValidShuffle(flatList);

        // Save to LocalStorage
        localStorage.setItem('battleData', JSON.stringify(finalBattleList));

        // Redirect to first battle
        window.location.href = "battle.html?step=1";
    }
}
