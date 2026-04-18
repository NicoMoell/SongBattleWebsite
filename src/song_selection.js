const params = new URLSearchParams(window.location.search);
const playernumber = parseInt(params.get('selected_playernumber'));
const songnumber = parseInt(params.get('selected_songnumber'));
const container = document.getElementById('songs_container');
const entrytitle = document.getElementById('entrytext');

entrytitle.innerHTML = "<h2> Please enter the name of your " + playernumber + " players and paste the link of the " + songnumber + " songs for each player below. </h2>";
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

const confirm = document.createElement('button');
confirm.classList.add('buttons');
confirm.textContent = "Confirm";
container.appendChild(confirm);