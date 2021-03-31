const deleteNoteBtn = document.getElementById("noteDelete");


const deleteNote = async (e) => {
    e.preventDefault();

    const ID = parseInt(e.target.getAttribute("data-note_id"));

    const deleteNoteData = await fetch(`/api/notes/${ID}`, {
        method: "DELETE"
    });     
};

if (deleteNoteBtn){
    deleteNoteBtn.addEventListener("click", deleteNote)
}