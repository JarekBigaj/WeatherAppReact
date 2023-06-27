import React, { useContext, useEffect, useState } from 'react'
import { AccountContext } from './Account';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

interface StatusProps {
    onSessionChange: (session: CognitoUserSession | null) => void;
}

const Status = ({onSessionChange}:StatusProps) => {
    const [status, setStatus] = useState<boolean>(false);
    const [session, setSession] = useState<CognitoUserSession | null>(null);

    const context = useContext(AccountContext);

    useEffect(() => {
       (async () => {
            try {
            const sessionData = await context?.getSession();
                setSession(sessionData? sessionData : null);
                onSessionChange(sessionData ? sessionData:null);
            } catch (error) {
            console.log(error);
          }
        })()
    }, []);
    
  return (
    <div>
        {session? "You are logged!" : "Please login"}
    </div>
  )
}

export default Status