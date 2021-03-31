const deleteNoteBtns = document.querySelectorAll(".noteDelete")


const deleteNote = async (e) => {
    e.preventDefault();

    const ID = parseInt(e.target.getAttribute("data-note_id"));

    const deleteNoteData = await fetch(`/api/notes/${ID}`, {
        method: "DELETE"
    });
    if (deleteNoteData.status === 200) {
        window.location.reload()
    }
};

if (deleteNoteBtns) {
    for (const btn of deleteNoteBtns) {
        btn.addEventListener("click", deleteNote);
    }
}