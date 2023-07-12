import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';

interface CustomNotificationProps {
  message: string;
  duration?: number;
  success?: boolean;
  onClose?: () => void;
  isVisible: boolean;
}

const CustomNotificationComponent: React.FC<CustomNotificationProps> = ({
  message,
  duration = 3000,
  success,
  onClose,
  isVisible
}) => {
  const [visible, setVisible] = useState(false);

  const notificationClassName = useMemo(() => {
    if(success && visible){ return 'notification is-success is-light'};
    return visible ? 'notification is-danger is-light' : '';
  }, [visible]);

  useEffect(() => {
    setVisible(isVisible);

    const timeout = setTimeout(() => {
      setVisible(false);
      if (onClose) {
        onClose();
      }
    }, duration);

    return () => clearTimeout(timeout);
  }, [isVisible, duration, onClose]);

  return visible ? 
    <CustomNotification className={notificationClassName} aria-live='assertive'>
      <button className="delete" onClick={() => {
        if (onClose) {
          onClose();
        }
        setVisible(false);
      }}></button>
      {message}
    </CustomNotification> : null;
};



const CustomNotification = styled.div`
  position:fixed;
  top:3em;
  right:1em;
  z-index:999;
  width:20em;
  .delete{
    position:absolute;
    top:0;
    background-color:gray;
    color:black;
    font-size:0.25em;
  }
  .delete:hover{
    background-color: #666666;
  }
`;

export default CustomNotificationComponent;
