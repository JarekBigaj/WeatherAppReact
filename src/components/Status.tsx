import React, { useContext, useEffect, useState } from 'react'
import { AccountContext } from './Account';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import styled from 'styled-components';
import CustomNotificationComponent from './helper/CustomNotification';

const Status = styled(({className}) => {
    const [session, setSession] = useState<boolean | undefined>(false);
    const [isVisible,setIsVisible] = useState<boolean>(false);

    const context = useContext(AccountContext);
    const auth = context?.auth;
    console.log("auth from status before use effect:",{auth})
    useEffect(() => {
       (async () => {
            try {
              const sessionData = await context?.getSession();
              const sessionIsValid = sessionData?.isValid();
              setSession(sessionIsValid);
              setIsVisible(true);
              console.log("from status",{auth});
            } catch (error) {
            console.log(error);
          }
        })()
      return () => {
        setSession(false);
      }
    }, [auth]);

    const handleNotificationClose = () => {
      setIsVisible(false);
    };

  return (
    <div className={className}>
        <CustomNotificationComponent 
        isVisible={isVisible} 
        message={'You are logged!'}
        success={session?session:false}
        duration={6000} 
        onClose={handleNotificationClose}/>
        {session? "You are logged!" : "Please login"}
    </div>
  )
})`
  position:absolute;
  top:4em;
`;

export default Status