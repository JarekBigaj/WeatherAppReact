import React, { useContext, useEffect, useState } from 'react'
import { AccountContext } from './Account';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

const Status = () => {
    const [status, setStatus] = useState<boolean>(false);

    const context = useContext(AccountContext);

    useEffect(() => {
        context?.getSession()
            .then((session: CognitoUserSession) => {
                console.log("Session: ", session);
                setStatus(true);
            });
      }, []);

  return (
    <div>
        {status? "You are logged!" : "Please login"}
    </div>
  )
}

export default Status