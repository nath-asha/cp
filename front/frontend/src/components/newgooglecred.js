import { GoogleLogin,onSignin } from '@react-oauth/google';

function Newgooglecred() {
    function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
      }
  return (
      <div className="App">

          <GoogleLogin

            onSuccess={credentialResponse => {
              console.log(credentialResponse);
            }}
          
            onError={() => {
              console.log('Login Failed');
            }}
          
          />
<a href="#" onclick="signOut();">Sign out</a>

  {/* function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  } */}
      </div>
  );
}

export default Newgooglecred;