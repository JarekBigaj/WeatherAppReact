import React, { createContext } from 'react';
import { AuthenticationDetails, CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';
import Pool from '../UserPool';

// Define the type for the context value
interface AccountContextValue {
  authenticate: (username: string, password: string) => Promise<CognitoUserSession>;
  getSession: () => Promise<CognitoUserSession>;
}

// Initialize the context with an initial value of undefined
const AccountContext = createContext<AccountContextValue | undefined>(undefined);

const Account = (props:any) => {
  
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

  const authenticate = async (username: string, password: string): Promise<CognitoUserSession> => {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username: username, Pool });

      const authDetails = new AuthenticationDetails({ Username: username, Password: password });

      user.authenticateUser(authDetails, {
        onSuccess: (session: CognitoUserSession) => {
          console.log('onSuccess', session);
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

  // Check if the context value is undefined
  if (AccountContext === undefined) {
    throw new Error('AccountContext must be used within an AccountProvider');
  }

  return (
    <AccountContext.Provider value={{ authenticate, getSession }}>
      {props.children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };
