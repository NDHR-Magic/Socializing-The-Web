const addSongBtn = document.querySelector('#addtoPlaylist');
let addToPlaylistBtns;
let songId;

const addSong = async (e) => {
    e.preventDefault()
    console.log('I have been clicked')
    addSongBtn.classList.add('hidden')

    const ID = parseInt(e.target.getAttribute("data-id"));
    songId = ID;

    const getPlaylist = await fetch(`/api/playlist/`, {
        method: "GET"
    })

    if (getPlaylist.status === 200) {
        const playlistData = await getPlaylist.json()
        console.log(playlistData)

        for (const playlist of playlistData) {
            createlistItems(playlist)
        }
    }

    addToPlaylistBtns = document.querySelectorAll(".addToList");
    if (addToPlaylistBtns) {
        for (const btn of addToPlaylistBtns) {
            btn.addEventListener("click", selectPlayList);
        }
    }
}

const selectPlayList = async (e) => {
    e.preventDefault();

    const playlistID = parseInt(e.target.getAttribute("data-playlist"));

    const addResponse = await fetch(`/api/songs/addtoPlaylist/${songId}`, {
        method: "POST",
        body: JSON.stringify({ playlistID }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (addResponse.status === 200) {
        const ul = document.querySelector('#playlists');

        const p = document.createElement("p");
        p.setAttribute("class", "green");
        p.textContent = "Song added to playlist"

        ul.append(p);
    } else if (addResponse.status === 304) {
        const ul = document.querySelector('#playlists');

        const p = document.createElement("p");
        p.setAttribute("class", "red");
        p.textContent = "Song already in playlist"

        ul.append(p);
    } else {
        console.log("bad");
    }
}

function createlistItems(playlist) {
    const ul = document.querySelector('#playlists');

    const li = document.createElement('li')
    const btn = document.createElement('button');
    btn.setAttribute("class", "addToList py-2");
    btn.setAttribute("data-playlist", playlist.id);
    li.setAttribute("class", "mb-3");

    btn.textContent = playlist.name
    li.appendChild(btn)
    ul.appendChild(li)
}

addSongBtn.addEventListener('click', addSong);