const addFriendBtn = document.getElementById("addFriend");

const addFriend = async (e) => {
    e.preventDefault();

    const ID = parseInt(e.target.getAttribute("data-id"));

    const addResults = await fetch(`/api/friends/request/${ID}`, {
        method: "POST"
    });

    if (addResults.status === 200) {
        location.reload();
    } else if (addResults.status === 412) {
        console.log("Error: Already friends or have a pending friend request with this user");
    } else {
        console.log("Something went wrong");
        console.log(addResults.message);
    }
}

if (addFriendBtn) addFriendBtn.addEventListener("click", addFriend);