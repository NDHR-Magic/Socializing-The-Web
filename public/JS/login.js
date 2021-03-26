$(document).ready(function() {

const loginButton = $('#loginButton')

loginButton.on('click', async function(){

    const email = $('#emailInput').val()
    const password = $('#passwordInput').val()

    if (email && password) {
        //fetch call
        const response = await fetch('api/users/login', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        
        });

    if (response.ok) {
        document.location.replace("/member")
    } else {
        alert("response is not ok");
    }

    } else {
        console.log("error")
        //change later
    }

})


})