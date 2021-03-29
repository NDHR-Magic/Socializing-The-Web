const searchUserBtn = document.getElementById("submitUserSearch");

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

searchUserBtn.addEventListener("click", searchUsers);