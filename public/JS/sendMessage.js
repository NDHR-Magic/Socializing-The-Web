const sendMessageBtn = document.getElementById("sendMessage");

const sendMessage = async (e) => {
    e.preventDefault();

    const ID = parseInt(e.target.getAttribute("data-id"));

    const messageResults = await fetch(`/api/messages/sendMessage/${ID}`, {
        method: "POST"
    });

    if (messageResults.status === 201 || messageResults.status === 302) {
        document.location.replace("/privateMessages");
    } else {
        console.log("error");
    }
}

if (sendMessageBtn) {
    sendMessageBtn.addEventListener("click", sendMessage);
}