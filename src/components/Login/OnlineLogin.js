import React, { useEffect, useState } from 'react';
import { auth, googleProvider, githubProvider } from '../fireBase';
import { signInWithPopup } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

function OnlineLogin() {
  const [values, setValues] = useState('');

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((data) => {
        setValues(data.user.email);
        localStorage.setItem('email', data.user.email);
      })
      .catch((error) => {
        console.error('Google login error:', error.message);
      });
  };

  const handleGitHubLogin = () => {
    signInWithPopup(auth, githubProvider)
      .then((data) => {
        setValues(data.user.email);
        localStorage.setItem('email', data.user.email);
      })
      .catch((error) => {
        console.error('GitHub login error:', error.message);
      });
  };

  useEffect(() => {
    setValues(localStorage.getItem('email'));
  }, []);

  return (
    <div>
      {values ? (
        <Navigate to="/" />
      ) : (
        <>
          <button onClick={handleGoogleLogin}>Sign In with Google</button>
          <button onClick={handleGitHubLogin}>Sign In with GitHub</button>
        </>
      )}
    </div>
  );
}

export default OnlineLogin;
