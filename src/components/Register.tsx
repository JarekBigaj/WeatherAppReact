import React, { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EMAIL_REGEX, NAME_REGEX, PWD_REGEX } from '../helper/regexExpressions';
import { Link, useNavigate } from 'react-router-dom';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import UserPool from '../UserPool';
import CustomNotificationComponent from './helper/CustomNotification';
import { I18nContext } from 'react-i18next';

const Register = styled(({className}) => {
  const {i18n} = useContext(I18nContext);
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

    const [isVisible,setIsVisible] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
      if(userRef.current) userRef.current.focus();
    }, []);

    useEffect(()=>{
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    },[email]);

    useEffect(()=>{
        const result = NAME_REGEX.test(name);
        setValidName(result);
    },[name]);

    useEffect(()=> {
      const result = PWD_REGEX.test(password);
      setValidPassword(result);
      const match = password === matchPassword;
      setValidMatchPassword(match);
    },[password,matchPassword])
    
    useEffect(() => {
      setErrMsg('');
    }, [email,name,password,matchPassword])
    
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const attributes = [
        new CognitoUserAttribute({
          Name: 'name',
          Value: name
        })
      ];
  
      UserPool.signUp(email, password, attributes, [], (err, data) => {
        if (err) {
          console.log(err);
          setErrMsg(err.message);
          setIsVisible(true);
        }
        setSuccess(true);
      });
    };

    const handleNotificationClose = () => {
      setErrMsg('');
      setIsVisible(false);
    };

  return (
    <>
      {success ? (
        <section className={className}>
            <h1 className='title'>{i18n.t(`text.success`)}</h1>
            <br/>
            <p>
                <Link to={'/login'}>{i18n.t(`text.signin`)}!</Link>
            </p>
        </section>
      ):(
      <section className={className}>
        <CustomNotificationComponent 
          isVisible={isVisible}
          message={errMsg}
          duration={6000}
          onClose={handleNotificationClose}
        />
        <h1 className='title'>{i18n.t(`text.register`)}</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='email'>
            {i18n.t(`text.email`)}:
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
            {i18n.t(`text.email_note`)}
          </p>

          <label htmlFor='name'>
            {i18n.t(`text.name`)}:
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
            autoComplete='off'
            onChange={(event:any)=>setName(event.target.value)}
            required
            aria-invalid={validName? "false":"true"}
            aria-describedby='namenote'
            onFocus={() => setNameFocus(true)}
            onBlur={() => setNameFocus(false)}/>
          <p id='namenote' className={nameFocus && name && !validName ? "instructions" : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle}/>
            {i18n.t(`text.name_note`)}
          </p>

          <label htmlFor='password'>
            {i18n.t(`text.password`)}:
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
            {i18n.t(`text.password_note`)} 
            <span aria-label="at symbol">@</span><span aria-label="exclamation mark">!</span>
            <span aria-label="dollar sign">$</span><span aria-label="percent">%</span>
            <span aria-label="hashtag">#</span>
          </p>

          <label htmlFor='confirm_password'>
            {i18n.t(`text.confirm_password`)}:
            <span className={validMatchPassword && matchPassword? "valid":"hide"}>
              <FontAwesomeIcon icon={faCheck}/>
            </span>
            <span className={validMatchPassword || !matchPassword ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes}/>
            </span>
          </label>
          <input
            type='password'
            id='confirm_password'
            onChange={(event:any)=>setMatchPassword(event.target.value)}
            required
            aria-invalid={validMatchPassword? "false":"true"}
            aria-describedby='confirmnote'
            onFocus={() => setMatchPasswordFocus(true)}
            onBlur={() => setMatchPasswordFocus(false)}/>
          <p id='confirmnote' className={matchPasswordFocus && !validMatchPassword ? "instructions" : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle}/>
            {i18n.t(`text.match_password`)}
          </p>
          <button disabled={!validEmail||!validName||!validPassword||!validMatchPassword ? true:false}>
            {i18n.t(`text.signup`)}
          </button>
        </form>
        <p>
          {i18n.t(`text.registration_question`)} <br/>
          <span className='line'>
            <Link to={'/login'}>{i18n.t(`text.signin`)}</Link>
          </span>
        </p>
      </section>
    )}
    </>
  )
})`
  position:relative;
  width: 100%;
  margin-top: 5em;
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
  white-space: pre-line;

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

export default Register