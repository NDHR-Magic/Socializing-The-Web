const noteSubmitBtn = document.getElementById("noteSubmit");
const deleteNoteBtn = document.querySelectorAll("noteDelete");
const linkSongBtn = document.getElementById("linkSong");
const submitSongBtn = document.getElementById("submitSong");
const rejectLinkBtn = document.getElementById("rejectLink");

// New note's id
let noteId;

const createNote = async (e) => {
    e.preventDefault();

    const title = document.getElementById("noteTitle").value.trim();
    const description = document.getElementById("noteDescription").value.trim();

    if (title && description) {
        const noteResponse = await fetch("/api/notes/", {
            method: "POST",
            body: JSON.stringify({ title, description }),
            headers: { 'Content-Type': 'application/json' }
        });

        const noteJSON = await noteResponse.json();

        if (noteResponse.ok) {
            noteId = noteJSON.id;
            document.getElementById("form").setAttribute("class", "hidden");
            document.getElementById("songForm").classList.remove("hidden");

        } else {

        }
    } else {
        const p = document.createElement("p");
        p.textContent = "Fill out title and description."
        p.setAttribute("class", "red has-text-centered ml-5");

        document.getElementById("form").appendChild(p);
    }
}

// function to link song to note (Causes form to show on page)
const linkSong = (e) => {
    e.preventDefault();

    document.getElementById("songSearchForm").classList.remove("hidden");
}

// Actual function to do the linking of song
const submitSong = async (e) => {
    e.preventDefault();

    const songName = document.getElementById("songInput").value.trim();

    const linkSongResponse = await fetch("/api/notes/addSong", {
        method: "POST",
        body: JSON.stringify({ songName, noteId }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (linkSongResponse.status === 200) {
        document.location.replace("/userProfile");
    } else {
        const p = document.createElement("p");
        p.textContent = "Could not find song"
        p.setAttribute("class", "red has-text-centered ml-5");

        document.getElementById("songForm").appendChild(p);
    }
}

const rejectSong = (e) => {
    e.preventDefault();

    document.location.replace("/member");
}

// Add event listeners to buttons if they exist
if (noteSubmitBtn) noteSubmitBtn.addEventListener("click", createNote);
if (linkSongBtn) linkSongBtn.addEventListener("click", linkSong);
if (submitSongBtn) submitSongBtn.addEventListener("click", submitSong);
if (rejectLinkBtn) rejectLinkBtn.addEventListener("click", rejectSong);