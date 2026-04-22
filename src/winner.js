function getEmbedUrl(url) {
    let videoId = "";
    if (url.includes("v=")) {
        videoId = url.split("v=")[1].split("&")[0];
    } else if (url.includes("be/")) {
        videoId = url.split("be/")[1].split("?")[0];
    }
    return `https://www.youtube.com/embed/${videoId}`;
}


let battleData = JSON.parse(localStorage.getItem('battleData')) || [];

document.getElementById('winner-name').innerText = battleData[0].player;
document.getElementById('winner').src = getEmbedUrl(battleData[0].song);