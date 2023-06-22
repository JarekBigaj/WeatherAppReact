import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import React, { FormEvent, useState } from 'react'
import UserPool from '../UserPool';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user = new CognitoUser({
            Username:email,
            Pool: UserPool
        }); 

        const authDetails = new AuthenticationDetails({
            Username:email,
            Password: password
        });

        user.authenticateUser(authDetails, {
            onSuccess: (data) => {
                console.log("onSuccess",data);
            },
            onFailure: (err) =>{
                console.error("onFailure",err);
            },
            newPasswordRequired: (data) =>{
                console.log("newPasswordRequired",data);
            }
        })
    };
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

export default Login