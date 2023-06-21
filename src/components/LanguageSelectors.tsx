import React from "react";
import styled from "styled-components";


const LanguageSelectors = styled(({className, changeLanguage}) => {
return (
    <div className={className}>
      <span className='fi fi-pl' onClick={() => changeLanguage('pl')}></span>
      <span className='fi fi-gb' onClick={() => changeLanguage('en')}></span>
    </div>
  );
})`
  position:absolute;
  top:0.25em;
  right:0.25em;
  
  span {
    margin:0.3em;
    font-size:1em;
  }

  span:hover{
    cursor:pointer;
    font-size: 1.5em;
  }
`;

export default LanguageSelectors;
  