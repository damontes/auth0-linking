import { useAuth0 } from '@auth0/auth0-react';
import { ShipIcon } from '../icons';

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="w-full max-w-md rounded-lg border-blue-200 bg-white/90 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col gap-y-1 p-6">
        <div className="mb-2 flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white">
            <ShipIcon className="h-6 w-6" />
          </div>
        </div>
        <h1 className="text-center text-2xl font-bold text-blue-900">Welcome Aboard</h1>
        <h2 className="text-center text-blue-700">Sign in to access your cruise experience</h2>
      </div>
      <div className="flex flex-col gap-y-4 px-6 pb-6">
        <button
          type="submit"
          className="w-full cursor-pointer rounded-md bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          onClick={() => loginWithRedirect()}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
