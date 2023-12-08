import React, { useState } from 'react';
import styles from './Register.module.css';
import InputControl from '../inputControl/InputControl';
import { Link, useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../fireBase';


const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false);

  const handleSubmission = () => {
    if(!values.name || !values.email || !values.pass){
      setErrorMsg("fill all fields");
      return;
    }
    setErrorMsg("");
    setSubmitBtnDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass).then( async(res )=>{
      setSubmitBtnDisabled(false);
      const user = res.user;
      await updateProfile(user, {
        displayName: values.name,
      });
      navigate('/');
    }
    ).catch((err)=>{
      setSubmitBtnDisabled(false);
      setErrorMsg(err.message);
    });

  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Register</h1>
        <InputControl label="Name" 
        placeholder="Enter Your name"
        onChange={(event) =>
          setValues((prev) => ({ ...prev, name: event.target.value }))
        }
        />

        <InputControl label="Email" 
        placeholder="Enter email address"
        onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />

        <InputControl label="Password" 
        placeholder="Enter Password"
        onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
        />

        <div className={styles.footer}>
          <b className={styles.error}> {errorMsg} </b>
          <button onClick={handleSubmission} disabled={submitBtnDisabled}   >
          Sign up</button>
          <p>
            Already have an account ? {" "}
            <span>
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
