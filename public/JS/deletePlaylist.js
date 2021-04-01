const deleteBtn = document.getElementById('deleteBtn');

const deletePlaylist = async (e) => {
    e.preventDefault();

    const ID = parseInt(e.target.getAttribute('data-id'));
    const deletePlaylistdata = await fetch(`/api/playlist/${ID}`, {
        method: "DELETE"
    });

    if (deletePlaylistdata.status === 200) {
        window.location.replace("/playlists")
    }
};

deleteBtn.addEventListener("click", deletePlaylist);

