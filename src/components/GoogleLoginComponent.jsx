import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginComponent = ({ onLoginSuccess }) => {
  const handleSuccess = (response) => {
    console.log("Login successful:", response);
    if (onLoginSuccess) onLoginSuccess(response);
  };

  const handleFailure = (error) => {
    console.error("Login failed:", error);
  };

  return (
    <div>
      <h3>Sign in with Google</h3>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleFailure}
      />
    </div>
  );
};

export default GoogleLoginComponent;