import React, { SetStateAction, createContext, useState } from 'react';
import { AuthenticationDetails, CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';
import Pool from '../UserPool';
import { useNavigate } from 'react-router-dom';
import { use } from 'i18next';

// Define the type for the context value
interface AccountContextValue {
  authenticate: (username: string, password: string) => Promise<CognitoUserSession>;
  getSession: () => Promise<CognitoUserSession>;
  handleLogout: () => Promise<void>;
  auth: any;
  setAuth: React.Dispatch<React.SetStateAction<string>>;
}

// Initialize the context with an initial value of undefined
const AccountContext = createContext<AccountContextValue | undefined>(undefined);

const Account = (props:any) => {
  const [auth,setAuth] = useState('');

  
  const getSession = async (): Promise<CognitoUserSession> => {
    return await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession((err: any, session: CognitoUserSession) => {
          if (err) {
            reject();
          } else {
            resolve(session);
          }
        });
      } 
    });
  };

  const handleLogout = async (): Promise<void> =>{
    return await new Promise((resolve,reject)=>{
      const user = Pool.getCurrentUser();
      if(user) {
        user.signOut();
        setAuth('');
        resolve();
      } else{
        reject(new Error('No user found!'));
      }
    })
  }

  const authenticate = async (username: string, password: string): Promise<CognitoUserSession> => {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username: username, Pool });

      const authDetails = new AuthenticationDetails({ Username: username, Password: password });

      user.authenticateUser(authDetails, {
        onSuccess: (session: CognitoUserSession) => {
          console.log('onSuccess', session);
          setAuth(session.getAccessToken()?.getJwtToken() || '');
          resolve(session);
        },
        onFailure: (err) => {
          console.error('onFailure', err);
          reject(err);
        },
        newPasswordRequired: (session: CognitoUserSession) => {
          console.log('newPasswordRequired', session);
          resolve(session);
        },
      });
    });
  };
  console.log({auth});
  // Check if the context value is undefined
  if (AccountContext === undefined) {
    throw new Error('AccountContext must be used within an AccountProvider');
  }

  return (
    <AccountContext.Provider value={{ authenticate, getSession,auth,setAuth,handleLogout}}>
      {props.children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };
