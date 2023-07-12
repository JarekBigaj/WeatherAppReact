import React, { useContext, useEffect, useState } from 'react'
import { AccountContext } from './Account';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import styled from 'styled-components';
import CustomNotificationComponent from './helper/CustomNotification';
import { I18nContext } from 'react-i18next';

const Status = styled(({className}) => {
    const {i18n} = useContext(I18nContext)
    const [session, setSession] = useState<boolean | undefined>(false);
    const [isVisible,setIsVisible] = useState<boolean>(false);

    const context = useContext<any>(AccountContext);
    const auth = context?.auth;  

    useEffect(() => {
       (async () => {
            try {
              const sessionData = await context?.getSession();
              const sessionIsValid = sessionData?.isValid();
              setSession(sessionIsValid);
              if(!auth && sessionIsValid) {
                context?.setAuth(sessionData||'');
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
      message={i18n.t(`message.status`)}
      success={session?session:false}
      duration={6000} 
      onClose={handleNotificationClose}/>
      }
        
        {session? 
          <span key={'logged'}>{i18n.t(`message.status`)}</span> 
        : <span key={'not_logged'}>{i18n.t(`message.b_status`)}</span>}
    </div>
  )
})`
  position:absolute;
  top:4em;
`;

export default Status