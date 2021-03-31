const addSongBtn = document.querySelector('#addtoPlaylist');

const addSongs = async (e) => {
    addSongBtn.addEventListener('click', async function (e) {
        e.preventDefault()
        console.log('I have been clicked')
        addSongBtn.classList.add('hidden')

        const ID = parseInt(e.target.getAttribute("data-id"));
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
        // const addSongs = await fetch(`/api/songs/addtoPlaylist/${ID}`, {
        //     method: "POST"
        // });
    })
}

function createlistItems(playlist) {
    const ul = document.querySelector('#playlists');

    const li = document.createElement('li')
    const btn = document.createElement('button')

    btn.textContent = playlist.name
    li.appendChild(btn)
    ul.appendChild(li)
}

addSongs();