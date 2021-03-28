const rejectBtns = document.querySelectorAll(".rejectRequest");

const rejectRequest = async (e) => {
    e.preventDefault();

    const ID = parseInt(e.target.getAttribute("data-id"));

    const deleteRequest = await fetch(`/api/friends/request/${ID}`, {
        method: "DELETE"
    });

    if (deleteRequest.ok) {
        location.reload();
    } else {
        console.log("There was an error rejecting request");
    }
}

for (const btn of rejectBtns) {
    btn.addEventListener("click", rejectRequest);
}