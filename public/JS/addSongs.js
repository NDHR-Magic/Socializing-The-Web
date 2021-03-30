const addSongBtn = document.querySelectorAll('#addtoPlaylist');
console.log(addSongBtn)
const addSongs = async () => {
    addSongBtn.forEach(song => {
        song.addEventListener('click', function () {
            console.log('I have been clicked')
        })
    })

}

addSongs();