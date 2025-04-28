import { GoogleLogin } from "@react-oauth/google";

const MentorGoogleSignIn = ({ onSuccess, onFailure }) => {
    const clientId = process.env.REACT_APP_CLIENT_ID;

    const handleSuccess = (response) => {
        console.log('Google Sign-In Success:', response);
        if (onSuccess) {
            onSuccess(response);
        }
    };

    const handleFailure = (error) => {
        console.error('Google Sign-In Error:', error);
        if (onFailure) {
            onFailure(error);
        }
    };

    return (
        <div>
            <h2>Mentor Google Sign-In</h2>
            <GoogleLogin
                clientId={clientId}
                buttonText="Sign in with Google"
                onSuccess={handleSuccess}
                onFailure={handleFailure}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
};

export default MentorGoogleSignIn;