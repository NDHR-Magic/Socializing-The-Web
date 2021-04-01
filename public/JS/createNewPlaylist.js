const createPlaylistBtn = document.querySelector('#createBtn');
const playlistSubmitBtn = document.querySelector('#playlistSubmit');
const form = document.getElementById('form')

function getForm() {
    console.log('I have been clicked')
    form.classList.remove('hidden')
    playlistSubmitBtn.classList.remove('hidden')
}

const createPlaylist = async (e) => {
    e.preventDefault();

    let name = document.getElementById('playlistTitle').value

    if (name) {
        const playlistRes = await fetch("/api/playlist", {
            method: 'POST',
            body: JSON.stringify({ name }),
            headers: { 'Content-Type': 'application/json' }
        });

        console.log(playlistRes)
        if (playlistRes.ok) {
            window.location.replace("/songs");
        }
    } else {
        const p = document.createElement("p");
        p.textContent = "Fill out title."
        p.setAttribute("class", "red has-text-centered ml-5");

        document.getElementById("form").appendChild(p);
    }
}

createPlaylistBtn.addEventListener('click', getForm);
playlistSubmitBtn.addEventListener('click', createPlaylist);

