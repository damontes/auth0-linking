/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth0 } from '@auth0/auth0-react';
import { useLocation, useNavigate } from 'react-router-dom';

const domain = import.meta.env.VITE_AUTH0_DOMAIN;

const LinkAccount = () => {
  const { user, getAccessTokenSilently, loginWithPopup, getIdTokenClaims, logout } = useAuth0();
  const { state } = useLocation();
  const navigate = useNavigate();

  const { identities } = state ?? {};

  const linkAccount = async (identity: any) => {
    const primaryToken = await getAccessTokenSilently({
      authorizationParams: {
        audience: `https://${domain}/api/v2/`,
        scope: 'update:current_user_identities',
      },
    });

    await loginWithPopup({
      authorizationParams: {
        connection: identity.connection, // Use the specific connection
        prompt: 'login',
        scope: 'openid profile email',
      },
    });

    const idTokenClaims = await getIdTokenClaims();
    const secondaryIdToken = idTokenClaims?.__raw;

    const response = await fetch(`https://${domain}/api/v2/users/${user?.sub}/identities`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${primaryToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        link_with: secondaryIdToken,
      }),
    });

    if (response.ok) {
      navigate('/', {
        state: {
          identities: [],
          isLinked: true,
        },
      });
      return;
    }

    alert('Failed to link account');
  };

  return (
    <div className="w-full max-w-screen-md rounded-lg border-blue-200 bg-white/90 px-4 py-6 shadow-xl backdrop-blur-sm">
      <h2 className="text-center text-lg font-semibold">LinkAccount</h2>
      <ul className="flex flex-col gap-y-2 py-4">
        {identities.map((identity: any, idx: number) => (
          <li
            className="flex justify-between rounded-md border border-gray-300 px-4 py-2"
            key={idx}
          >
            <p>{identity.provider}</p>
            <button
              className="cursor-pointer text-sm text-blue-600 hover:text-blue-800"
              onClick={() => linkAccount(identity)}
            >
              Link
            </button>
          </li>
        ))}
      </ul>

      <button
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        onClick={() => logout()}
      >
        Logout
      </button>
    </div>
  );
};

export default LinkAccount;
