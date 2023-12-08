import React, { useEffect, useState } from 'react';
import styles from './Login.module.css';
import InputControl from '../inputControl/InputControl';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../fireBase';
// ... (imports)

const Login = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
      email: '',
      pass: '',
    });
    const [errorMsg, setErrorMsg] = useState('');
    const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');
  
    // Check if the user is already logged in when the component mounts
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsLoggedIn(true);
          setUserEmail(user.email);
        } else {
          setIsLoggedIn(false);
          setUserEmail('');
        }
      });
  
      
      // Cleanup the listener to avoid memory leaks
      return () => unsubscribe();
    }, []);
  
    const handleSubmission = () => {
      if (!values.email || !values.pass) {
        setErrorMsg('Fill in all fields');
        return;
      }
      setErrorMsg('');
      setSubmitBtnDisabled(true);
  
      signInWithEmailAndPassword(auth, values.email, values.pass)
        .then(async (res) => {
          setSubmitBtnDisabled(false);
          setIsLoggedIn(true);
          // Email will be updated through onAuthStateChanged
        })
        .catch((err) => {
          setSubmitBtnDisabled(false);
          setErrorMsg(err.message);
        });
    };

    const handleLogout = async () => {
      try {
        await signOut(auth);
        setIsLoggedIn(false);
        setUserEmail('');
        // Redirect or update state after successful logout
        navigate('/');
      } catch (error) {
        // Handle error if needed
        console.error('Error during logout:', error.message);
      }
    };
  
    return (
      <div className={styles.container}>
        <div className={styles.innerBox}>
          <h1 className={styles.heading}>Login</h1>
  
          <InputControl
            label="Email"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, email: event.target.value }))
            }
            placeholder="Enter Your Email"
          />
  
          <InputControl
            label="Password"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, pass: event.target.value }))
            }
            placeholder="Enter Password"
          />
  
          <div className={styles.footer}>
            <b className={styles.error}> {errorMsg} </b>
            <button disabled={submitBtnDisabled} onClick={handleSubmission}>
              Login
            </button>
  
            {isLoggedIn && (
              <>
                <button onClick={handleLogout}>Logout</button>
              </>
            )}
  
  
            <p>
              Create an account?{' '}
              <span>
                <Link to="/register">Register</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Login;
  
