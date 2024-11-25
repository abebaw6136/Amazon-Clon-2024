import React, { useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import classes from './SignUp.module.css';
import { auth as FirebaseAuth } from '../../Utility/firebase'; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { ClipLoader } from 'react-spinners';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import { type } from '../../Utility/action.type';

function AuthComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({ signIn: false, signUp: false });
  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateInputs = () => {
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const authHandler = (e) => {
    e.preventDefault();
    const action = e.target.name;

    if (action === 'signup') {
      if (!validateInputs()) {
        return; // Stop execution if validation fails
      }

      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(FirebaseAuth, email, password)
        .then((userInfo) => {
          console.log("User signed up:", userInfo);
          dispatch({ type: type.SET_USER, user: userInfo.user });
          navigate('/'); // Navigate after successful sign-up
        })
        .catch((error) => {
          console.error("Sign-up error:", error);
          setError(error.message);
        })
        .finally(() => {
          setLoading({ ...loading, signUp: false });
        });
    } else if (action === 'signin') {
      if (!validateInputs()) {
        return; // Stop execution if validation fails
      }

      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(FirebaseAuth, email, password)
        .then((userInfo) => {
          console.log("User signed in:", userInfo);
          dispatch({ type: type.SET_USER, user: userInfo.user });
          navigate('/'); // Navigate after successful sign-in
        })
        .catch((error) => {
          console.error("Sign-in error:", error);
          setError(error.message);
        })
        .finally(() => {
          setLoading({ ...loading, signIn: false });
        });
    }
  };

  return (
    <section className={classes.login}>
      <Helmet>
        <link rel="stylesheet" href="your-stylesheet-url.css" /> 
      </Helmet>

      <img
        src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
        alt="Amazon Web Services Logo"
      />

      <div className={classes.login_container}>
        <h1>Sign In</h1>
        {error && <p className={classes.error}>{error}</p>} 

        <form onSubmit={authHandler} name='signin'>
          <div>
            <label htmlFor='email'>Email</label>
            <input 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              type="email" 
              id='email' 
              required 
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              type='password' 
              id='password' 
              required 
            />
          </div>
          <button 
            type='submit' 
            name='signin' 
            className={classes.login_signInButton}
          >
            {loading.signIn ? (
              <ClipLoader color='#000' size={15} />
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p>
          <label htmlFor='agreement'>
            I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms and Conditions</a> and <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
          </label>
        </p>

        <button 
          type='button' 
          name='signup' 
          onClick={authHandler} 
          className={classes.login_registerButton}
        >
          {loading.signUp ? (
            <ClipLoader color='#000' size={15} />
          ) : (
            'Create Your Amazon Account'
          )}
        </button>

        {error && (
          <small style={{ paddingTop: '5px', color: 'red' }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default AuthComponent;