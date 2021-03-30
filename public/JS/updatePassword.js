$(document).ready(function() {

    const updatePasswordButton = $('#updatePasswordButton');
    
    updatePasswordButton.on('click', async function(){
        
        const currentPassword = $('#currentPassword').val();
        const newPassword = $('#newPassword').val();
        
    
        if (currentPassword && newPassword) {
            console.log('password update start')
            //fetch call
            const response = await fetch('api/users/updatepassword', {
                method: 'PUT',
                body: JSON.stringify({currentPassword, newPassword}),
                headers: {
                    'Content-Type': 'application/json'
                }
            
            });
    
        if (response.ok) {
            console.log('password updated');
            document.location.replace("/userProfile");
        } else {
            console.log("response is not ok");
        }
    
        } else {
            console.log("error")
            //change later
        }
    
    })
    
    
    })