import { useAuth0 } from '@auth0/auth0-react';

const EmailVerification = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="w-full max-w-screen-md rounded-lg border-blue-200 bg-white/90 px-4 py-6 shadow-xl backdrop-blur-sm">
      <h1>Email Verification Required</h1>
      <p>
        You need to verify your email before logging in. Please check your inbox for a verification
        link.
      </p>
      <p>If you haven't received an email, check your spam folder or request a new one.</p>
      <button onClick={() => loginWithRedirect()} className="rounded bg-blue-500 p-2 text-white">
        Login
      </button>
    </div>
  );
};

export default EmailVerification;
