window.fbAsyncInit = function () {
    FB.init({
        appId: '274174381477005',
        cookie: true,                     // Enable cookies to allow the server to access the session.
        xfbml: true,                     // Parse social plugins on this webpage.
        version: 'v10.0'           // Use this Graph API version for this call.
    });


    FB.getLoginStatus(function (response) {   // Called after the JS SDK has been initialized.
        statusChangeCallback(response);        // Returns the login status.
    });
};

function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
    if (response.status === 'connected') {   // Logged into your webpage and Facebook.
        testAPI();
    } else if (response.status === 'not_authorized') {  // Not logged into your webpage or we are unable to tell.
        window.alert('Please log ' + 'into this webpage.');
    }
    else {
        swal({
            title: `Not Logged In!`,
            text: `You are not logged into Facebook.`,
            icon: 'warning'
        });
    }
}


function checkLoginState() {               // Called when a person is finished with the Login Button.
    FB.getLoginStatus(function (response) {   // See the onlogin handler
        statusChangeCallback(response);
    });
}

// When User Clicks on Log in With Facebook Button
const loginWithFacebook = () => {
    FB.login((response) => {
        if (response.status === 'connected') {   // Logged into your webpage and Facebook.
            testAPI();
        } else if (response.status === 'not_authorized') {  // Not logged into your webpage or we are unable to tell.
            window.alert('Please log ' + 'into this webpage.');
        }
        else {
            swal({
                title: `Not Logged In!`,
                text: `You are not logged into Facebook.`,
                icon: 'warning'
            });
        }
    });
}

// When User Clicks on Logout Button
const logoutFromFacebook = () => {
    FB.logout((response) => {
        swal({
            title: `Logged Out!`,
            text: `User is Logged Out`,
            icon: 'success'
        });

        document.querySelector('#logout_fb').style.display = "none";
        document.querySelector('#signin_user').style.display = "block";
        document.querySelector('#user_info').style.display = "block";

        // Redirecting to User Info Box
        location.href = `${location.href.substr(0, 50)}`;
    });
}

function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
    FB.api('/me', function (response) {
        document.querySelector('#signin_user').style.display = "none";
        document.querySelector('#user_info').style.display = "none";

        document.querySelector('#fb_userName').textContent = response.name;
        document.querySelector('#logout_fb').style.display = "block";
        swal({
            title: `Thanks for Logging in`,
            text: `UserName: ${response.name}`,
            icon: 'success'
        });
    });
}