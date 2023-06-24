import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EMAIL_REGEX } from '../helper/regexExpressions';



const Register = styled(() => {
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
    

  return (
    <div>Register</div>
  )
})`
    
`

export default Register