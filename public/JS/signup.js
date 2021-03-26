$(document).ready(function() {

    const signupButton = $('#signupButton');
    
    signupButton.on('click', async function(){
        const first_name = $('#firstName').val();
        const last_name = $('#lastName').val();
        const username = $('#username').val();
        const password = $('#password').val();
        const email = $('#email').val();
        
    
        if (first_name && last_name && username && email && password) {
            console.log('if else start')
            //fetch call
            const response = await fetch('api/users/signup', {
                method: 'POST',
                body: JSON.stringify({first_name, last_name, username, email, password}),
                headers: {
                    'Content-Type': 'application/json'
                }
            
            });
    
        if (response.ok) {
            document.location.replace("/member")
        } else {
            console.log("response is not ok");
        }
    
        } else {
            console.log("error")
            //change later
        }
    
    })
    
    
    })