import React, { FormEvent, useState,useContext, useRef, useEffect } from 'react'
import { AccountContext } from './Account';
import styled from 'styled-components';
import CustomNotificationComponent from './helper/CustomNotification';
import { Link } from 'react-router-dom';


const Login = styled(({className}) => {
    const userRef = useRef<HTMLInputElement| null>(null);
    const errRef = useRef<HTMLInputElement | null>(null);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [errMsg, setErrMsg] = useState<string>('');
    const [isVisible,setIsVisible] = useState<boolean>(false)
    const [success,setSuccess] = useState<boolean>(false);

    const {authenticate} = useContext<any>(AccountContext);
    
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      authenticate(email,password)
          .then((data:any) => console.log("Logged In",data))
          .catch((err:any) => {
            setErrMsg(err.message);
            setIsVisible(true);
          });
      setSuccess(true);
    };

    useEffect(() => {
      if(userRef.current) userRef.current.focus();
    }, [])

    useEffect(()=>{
      setErrMsg('');
    },[email,password]);
    

  const handleNotificationClose = () => {
    setErrMsg('');
    setIsVisible(false);
  };
  return (
    <section className={className}>
      <CustomNotificationComponent 
        isVisible={isVisible} 
        message={errMsg} 
        duration={6000} 
        onClose={handleNotificationClose}/>
      <h1 className='title'>Sign In</h1>
      <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            ref={userRef}
            autoComplete='off'
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Need a account? <br/>
          <span className='line'>
            <Link to={'/signup'}>Sign Up</Link>
          </span>
        </p>
    </section>
  )
})`
position:relative;
width: 100%;
margin-top: 4em;
margin-left:auto;
margin-right:auto;
max-width: 28em;
min-height: 26em;
display: flex;
flex-direction: column;
justify-content: flex-start;
padding: 1.5rem;
background-color: rgba(0,0,0,0.35);
color:white;


.title{
  color:white;
  margin-bottom:0.2em;
}

form{
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: space-evenly;
  flex-grow: 1;
  padding-bottom: 1rem;
}

input[type="text"],
input[type="password"],
button,
textarea {
  font-family: 'Nunito', sans-serif;
  font-size: 22px;
  padding: 0.25rem;
  border-radius: 0.5rem;
}

label,
button {
  margin-top: 1rem;
}

button {
  background-color: var(--color-element);
  color: var(--color-text);
  border: none;
  border-radius: 0.4em;
  padding: 0.5em 1em;
  cursor: pointer;
}
button:disabled{
  background-color: #95979792;
  color: #0000006e;
  pointer-events:none;
}
button:hover{
 background-color:hsl(154.6875, 27.58620689655171%, 60%);
}

.instructions {
  font-size: 0.75rem;
  border-radius: 0.5rem;
  background: var(--color-container);
  color: var(--color-text);
  padding: 0.25rem;
  position: relative;
  bottom: -0.2em;
}

.instructions > svg {
  margin-right: 0.25rem;
}

.offscreen {
  position: absolute;
  left: -9999em;
}

.hide {
  display: none;
}

.valid {
  color: limegreen;
  margin-left: 0.25rem;
}

.invalid {
  color: red;
  margin-left: 0.25rem;
}

.errmsg {
  background-color: lightpink;
  color: firebrick;
  font-weight: bold;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}

.line {
  display: inline-block;
}

@media screen and (max-width:600px) {
width: calc(100% - 1em);
}
`

export default Login;
