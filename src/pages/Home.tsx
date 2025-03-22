/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, useLocation } from 'react-router-dom';

const Home = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { logout } = useAuth0();
  const { state } = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    const params = new URLSearchParams(location.search);
    const error = params.get('error');
    const errorDescription = params.get('error_description');

    if (error === 'access_denied' && errorDescription?.includes('Email not verified')) {
      return <Navigate to="/email-verification" />;
    }

    return <Navigate to="/login" />;
  }

  console.log('user', user);
  const rawCandidateIdentities = user?.candidate_identities ?? [];
  const linkedIdentities = (user?.linked_identities ?? []).map((identity: any) => identity.userId);

  const candidateIdentities = rawCandidateIdentities.filter(
    (identity: any) => !linkedIdentities.includes(identity.user_id)
  );

  if (candidateIdentities.length > 0 && !state?.isLinked) {
    return <Navigate to="/link-account" state={{ identities: candidateIdentities }} />;
  }

  return (
    isAuthenticated && (
      <div className="w-full max-w-screen-md rounded-lg border-blue-200 bg-white/90 px-4 py-6 shadow-xl backdrop-blur-sm">
        <img src={user?.picture} alt={`Profile picture for ${user?.email}`} />
        <p>{user?.email}</p>
        <button
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
        >
          Logout
        </button>
      </div>
    )
  );
};

export default Home;
