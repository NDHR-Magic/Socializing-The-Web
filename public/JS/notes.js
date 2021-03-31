const noteSubmitBtn = document.getElementById("noteSubmit");
const deleteNoteBtn = document.querySelectorAll("noteDelete");

const createNote = async (e) => {
    e.preventDefault();

    const title = document.getElementById("noteTitle").value.trim();
    const description = document.getElementById("noteDescription").value.trim();

    console.log("test");

    if (title && description) {
        const noteResponse = await fetch("/api/notes/", {
            method: "POST",
            body: JSON.stringify({ title, description }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (noteResponse.ok) {
            window.location.replace("/member");
        } else {

        }
    } else {
        const p = document.createElement("p");
        p.textContent = "Fill out title and description."
        p.setAttribute("class", "red has-text-centered ml-5");

        document.getElementById("form").appendChild(p);
    }
}

if (noteSubmitBtn) {
    noteSubmitBtn.addEventListener("click", createNote);
};


