$(document).ready(function () {
    // If on friendsList.
    let friends;
    let deleteFriendBtn;
    if (location.pathname === "/friends") {
        friends = document.querySelectorAll(".friend");
    } else {
        deleteFriendBtn = document.getElementById("deleteFriend");
    }

    // Get friends profile page.
    const getProfile = (e) => {
        e.preventDefault();

        const ID = parseInt(e.target.getAttribute("data-id"));

        window.location.replace(`/profile/${ID}`);
    }

    // Unfriend user from their profile page
    const unfriend = async (e) => {
        e.preventDefault();

        const ID = parseInt(e.target.getAttribute("data-id"));

        const deleteResults = await fetch(`/api/friends/friend/${ID}`, {
            method: "DELETE"
        });

        if (deleteResults.ok) {
            location.reload();
        } else {
            console.log("There was an error unfriending user");
        }
    }

    // Add event listening to each friend div if on friendsList page
    if (location.pathname === "/friends") {
        for (const friend of friends) {
            friend.addEventListener("click", getProfile);
        }
    } else {
        if (deleteFriendBtn) deleteFriendBtn.addEventListener("click", unfriend);
    }
});