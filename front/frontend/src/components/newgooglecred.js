import { GoogleLogin } from '@react-oauth/google';

function Newgooglecred() {

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

      </div>
  );
}

export default Newgooglecred;