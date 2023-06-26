import React, { FormEvent, useState,useContext, useRef, useEffect } from 'react'
import { AccountContext } from './Account';


const Login = () => {
    const userRef = useRef<HTMLInputElement| null>(null);
    const errRef = useRef<HTMLInputElement | null>(null);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [errMsg, setErrMsg] = useState<string>('');
    const [success,setSuccess] = useState<boolean>(false);

    const {authenticate} = useContext<any>(AccountContext);
    
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        authenticate(email,password)
            .then((data:any) => console.log("Logged In",data))
            .catch((err:any) => console.error("Failed Login",err));
    };

    useEffect(() => {
      if(userRef.current) userRef.current.focus();
    }, [])
    

  return (
    <div>
        <form onSubmit={onSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    </div>
  )
}

export default Login;
