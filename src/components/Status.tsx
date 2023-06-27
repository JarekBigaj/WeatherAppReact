import React, { useContext, useEffect, useState } from 'react'
import { AccountContext } from './Account';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import styled from 'styled-components';

const Status = styled(({className}) => {
    const [session, setSession] = useState<boolean | undefined>(false);
    const context = useContext(AccountContext);
    const auth = context?.auth;
    console.log("auth from status before use effect:",{auth})
    useEffect(() => {
       (async () => {
            try {
              const sessionData = await context?.getSession();
              const sessionIsValid = sessionData?.isValid();
              setSession(sessionIsValid);
              console.log("from status",{auth});
            } catch (error) {
            console.log(error);
          }
        })()
      return () => {
        setSession(false);
      }
    }, [auth]);

  return (
    <div className={className}>
        {session? "You are logged!" : "Please login"}
    </div>
  )
})`
  position:absolute;
  top:4em;
`;

export default Status