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

    useEffect(() => {
       (async () => {
            try {
              const sessionData = await context?.getSession();
              const sessionIsValid = sessionData?.isValid();
              setSession(sessionIsValid);
              if(!auth && sessionIsValid) {
                const accessToken = sessionData?.getAccessToken();
                const jwtToken = accessToken?.getJwtToken();
                context?.setAuth(jwtToken||'');
              } else{
                setIsVisible(true);
              }
              
            } catch (error) {
            console.log(error);
          }
        })()
      return () => {
        setSession(false);
      }
    }, [auth]);

    console.log({session},{auth},{isVisible})

    const handleNotificationClose = () => {
      setIsVisible(false);
    };

  return (
    <div className={className}>
      {isVisible && 
      <CustomNotificationComponent 
      isVisible={isVisible} 
      message={'You are logged!'}
      success={session?session:false}
      duration={6000} 
      onClose={handleNotificationClose}/>
      }
        
        {session? <span key={'logged'}>You are logged!</span> : <span key={'not_logged'}>Please login</span>}
    </div>
  )
})`
  position:absolute;
  top:4em;
`;

export default Status