import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EMAIL_REGEX, NAME_REGEX, PWD_REGEX } from '../helper/regexExpressions';



const Register = styled(({className}) => {
    const userRef = useRef<HTMLInputElement| null>(null);
    const errRef = useRef<HTMLInputElement | null>(null);

    const [email, setEmail] = useState<string>('');
    const [validEmail, setValidEmail] = useState<boolean>(false);
    const [emailFocus, setEmailFocus] = useState<boolean>(false);

    const [name, setName] = useState<string>('');
    const [validName, setValidName] = useState<boolean>(false);
    const [nameFocus, setNameFocus] = useState<boolean>(false);

    const [password, setPassword] = useState<string>('');
    const [validPassword, setValidPassword] = useState<boolean>(false);
    const [passwordFocus, setPasswordFocus] = useState<boolean>(false);
    
    const [matchPassword, setMatchPassword] = useState<string>('');
    const [validMatchPassword, setValidMatchPassword] = useState<boolean>(false);
    const [matchPasswordFocus, setMatchPasswordFocus] = useState<boolean>(false);

    const [errMsg,setErrMsg] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
      if(userRef.current) userRef.current.focus();
    }, []);

    useEffect(()=>{
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
    },[email]);

    useEffect(()=>{
        const result = NAME_REGEX.test(name);
        console.log({result});
        console.log({name});
        setValidName(result);
    },[name]);

    useEffect(()=> {
      const result = PWD_REGEX.test(password);
      console.log({result});
      console.log({password});
      setValidPassword(result);
      const match = password === matchPassword;
      setValidMatchPassword(match);
    },[password,matchPassword])
    
    useEffect(() => {
      setErrMsg('');
    }, [email,name,password,matchPassword])
    

  return (
    <section className={className}>
      <p ref={errRef} className={errMsg? "notification is-danger is-light" : "offscreen"} aria-live='assertive'>
        {errMsg}
      </p>
      <h1 className='title'>Register</h1>
      <form>
        <label htmlFor='email'>
          Email:
          <span className={validEmail? "valid":"hide"}>
            <FontAwesomeIcon icon={faCheck}/>
          </span>
          <span className={validEmail || !email ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes}/>
          </span>
        </label>
        <input
          type='text'
          id='email'
          ref={userRef}
          autoComplete='off'
          onChange={(event:any)=>setEmail(event.target.value)}
          required
          aria-invalid={validEmail? "false":"true"}
          aria-describedby='emailnote'
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}/>
        <p id='emailnote' className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle}/>
          Please enter a valid email address<br/>
          in the format name@example.com.
        </p>

        <label htmlFor='name'>
          Name:
          <span className={validName? "valid":"hide"}>
            <FontAwesomeIcon icon={faCheck}/>
          </span>
          <span className={validName || !name ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes}/>
          </span>
        </label>
        <input
          type='text'
          id='name'
          ref={userRef}
          autoComplete='off'
          onChange={(event:any)=>setName(event.target.value)}
          required
          aria-invalid={validName? "false":"true"}
          aria-describedby='namenote'
          onFocus={() => setNameFocus(true)}
          onBlur={() => setNameFocus(false)}/>
        <p id='namenote' className={nameFocus && name && !validName ? "instructions" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle}/>
          Please enter a valid name.<br/>
          Between 4 and 24 characters.<br/>
          Should start with uppercase letter.
        </p>
        
        <label htmlFor='password'>
          Password:
          <span className={validPassword? "valid":"hide"}>
            <FontAwesomeIcon icon={faCheck}/>
          </span>
          <span className={validPassword || !password ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes}/>
          </span>
        </label>
        <input
          type='password'
          id='password'
          onChange={(event:any)=>setPassword(event.target.value)}
          required
          aria-invalid={validPassword? "false":"true"}
          aria-describedby='passwordnote'
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}/>
        <p id='passwordnote' className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle}/>
          8 to 24 characters.<br/>
          Must include uppercase and lowercase letters, a number <br/>
          and a spacial character.<br/>
          Allowed special character : 
          <span aria-label="at symbol">@</span><span aria-label="exclamation mark">!</span>
          <span aria-label="dollar sign">$</span><span aria-label="percent">%</span>
          <span aria-label="hashtag">#</span>
        </p>
      </form>
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
  border-radius:1em;
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
    background-color: #ffcc00;
    color: #222;
    border: none;
    border-radius: 0.4em;
    padding: 10px 20px;
    cursor: pointer;
}

.instructions {
    font-size: 0.75rem;
    border-radius: 0.5rem;
    background: #000;
    color: #fff;
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

export default Register