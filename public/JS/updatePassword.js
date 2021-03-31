$(document).ready(function() {

    const updatePasswordButton = $('#updatePasswordButton');
    
    updatePasswordButton.on('click', async function(){
        
        const currentPassword = $('#currentPassword').val();
        const newPassword = $('#newPassword').val();
        const confirmPassword = $('#confirmPassword').val();
        
    
        if (currentPassword && newPassword && confirmPassword) {
            console.log('password update start')
            if (confirmPassword !== newPassword) {
                $('#newPassword').attr('class', 'input is-danger');
                $('#confirmPassword').attr('class', 'input is-danger');
                $('#passwordMatchError').attr('class', 'has-text-danger');
                return
            } 
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
            console.log(response);
            console.log("response is not ok");
        }
    
        } else {
            console.log("error")
            //change later
        }
    
    })
    
    
    })