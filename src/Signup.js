import React, { useState } from 'react';
import styled from 'styled-components';
import { auth, provider, githubProvider } from "./components/fireBase"; 
import { signInWithPopup, signOut } from 'firebase/auth';
import { FaGoogle, FaGithub } from 'react-icons/fa';  // Import Google and GitHub icons
import { Button } from './styles/Button';

// ... (Previous code)

const Signup = () => {
  const [user, setUser] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);

  const handleSignInClick = () => {
    setLoginClicked(true);
    setShowOptions(true);
  };

  const handleSignInWithProvider = async (authProvider) => {
    try {
      const { user } = await signInWithPopup(auth, authProvider);
      setUser(user);
      localStorage.setItem("email", user.email);
      setShowOptions(false);
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  const handleSignOutClick = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem("email");
      setLoginClicked(false);
    } catch (error) {
      console.error('Sign out error:', error.message);
    }
  };

  return (
    <Wrapper className='usser'>
      {user ? (
        <>
          <div className='user-container'>
          <img src={user.photoURL} alt="User Profile" className="user-profile-pic"  style={{ height: '50px', width: '50px', borderRadius: "10px"}} />
          <Button onClick={() => handleSignOutClick()}>Logout</Button>
          </div>
          <p>Welcome, {user.email}</p>
        </>
      ) : (
        <>
          {!loginClicked && <Button onClick={handleSignInClick}>Login</Button>}
          {showOptions && (
            <div className='btng'>
              <button className='bttn1' onClick={() => handleSignInWithProvider(provider)}>
                <FaGoogle />  Google
              </button>
              <button className='btttn2' onClick={() => handleSignInWithProvider(githubProvider)}>
                <FaGithub />GitHub
              </button>
            </div>
          )}
        </>
      )}
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .user-container{
    display: flex;
    gap: 5px;
  }

  .btng {
    margin-top: 5px;
    display: flex; /* Add this line to make the buttons display in a flex container */
  }

  .bttn1 {
    background-color: #4285F4;
    color: #fff;
    margin-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center; /* Center text vertically */
  }

  .btttn2 {
    /* Add styles for your GitHub button */
    /* Adjust as needed */
    background-color: #24292e;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center; /* Center text vertically */
  }
`;
export default Signup;

