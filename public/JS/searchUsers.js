const searchUserBtn = document.getElementById("submitUserSearch");
const openSearchBtn = document.getElementById("findUsers");

const searchUsers = async (e) => {
    e.preventDefault();

    const searchInput = document.getElementById("userSearch").value.trim();

    const searchResponse = await fetch("/api/users/find", {
        method: "POST",
        body: JSON.stringify({ username: searchInput }),
        headers: { "Content-Type": "application/json" }
    });

    if (searchResponse.ok) {
        const user = await searchResponse.json();
        location.replace(`/profile/${user.id}`);
    } else {
        document.getElementById("hiddenUserError").classList.remove("hidden");
    }
}
// show form when search users button is clicked
const showForm = (e) => {
    e.preventDefault();
    const form = document.getElementById("userSearchFields");

    // show form by removing hidden class
    form.classList.remove("hidden");

    document.getElementById("cancelUserSearch").addEventListener("click", function () {
        form.setAttribute("class", "hidden");
    });
}

searchUserBtn.addEventListener("click", searchUsers);
openSearchBtn.addEventListener("click", showForm);