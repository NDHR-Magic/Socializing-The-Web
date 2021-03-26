$(document).ready(function() {
    const logoutButton = $("#logoutButton")

    logoutButton.on("click", async function(){

        const response = await fetch('api/users/logout', {
            method: 'POST'
        });

        if (response.ok) {
            document.location.replace("/");
        } else {
            console.log('error');
        }

    })
})