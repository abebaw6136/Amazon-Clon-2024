import React, { useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useLocation } from 'react-router-dom';
import classes from './SignUp.module.css';
import { auth } from '../../Utility/firebase'; // Correct import
import { signInWithEmailAndPassword,createUserWithEmailAndPassword } from 'firebase/auth';
import { ClipLoader } from 'react-spinners';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import { type } from '../../Utility/action.type';

function Auth() { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({ signIn: false, signUp: false });

  const [{user}, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation();

  const authHandler = async (e) => {
    e.preventDefault();
    
    const actionType = e.target.name;
    setError("");


    if ( e.target.name === 'signIn') {
       
       

      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo)=> {
         dispatch({ 
          type: type.SET_USER, 
          user: userInfo.user, 
        });
        setLoading({ ...loading, signIn: false });
          navigate(navStateData?.state?.redirect ||"/"); 
        })
        .catch((error) => {
          setError(error.message);
          setLoading({ ...loading, signIn: false });
        });
      
    } else{ 
      setLoading({ ...loading, signUP: true });
      createUserWithEmailAndPassword(auth,email,password)
      .then((userInfo) => {
        dispatch({
           type: type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signUP: false });
          navigate(navStateData?.state?.redirect ||"/"); 
      })
      .catch((error) => {
        setError(error.message);
        setLoading({ ...loading, signUP: false });
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

      <div className={classes.login__container}>
        <h1>Sign In</h1>
        {error && <p className={classes.error}>{error}</p>} 

        <form onSubmit={authHandler} name='signIn'>
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
            name='signIn' 
            className={classes.login__signInButton}
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
          name='signUP' 
          onClick={authHandler} 
          className={classes.login__registerButton}
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

export default Auth;