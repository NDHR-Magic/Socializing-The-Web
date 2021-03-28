// Create friend request btn
const addFriendBtn = document.getElementById("addFriend");

// Accept friend request btn
const acceptFriendBtns = document.querySelectorAll(".acceptRequest");

// Function to create friend request
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

// Function to accept friend request.
const acceptRequest = async (e) => {
    e.preventDefault();

    const ID = parseInt(e.target.getAttribute("data-id"));

    const acceptResults = await fetch(`/api/friends/addFriend/${ID}`, {
        method: "POST"
    });

    if (acceptResults.status === 202) {
        location.reload();
    } else if (acceptResults.status === 406) {
        console.log("Already friends. Can't accept request");
    } else {
        console.log("Something went wrong");
        console.log(acceptResults);
    }
}

if (addFriendBtn) addFriendBtn.addEventListener("click", addFriend);
if (acceptFriendBtns) {
    for (const btn of acceptFriendBtns) {
        btn.addEventListener("click", acceptRequest);
    }
}