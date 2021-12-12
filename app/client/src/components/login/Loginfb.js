import React from 'react';

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import tw from "twin.macro";
import fbIconImageSrc from "images/facebook-icon.png";
import styled from "styled-components";

const SocialButtonsContainer = tw.div`mt-5 flex flex-col items-center`;
const SocialButton = styled.a`
  ${tw`w-full max-w-xs font-semibold rounded-lg py-3 border text-gray-900 bg-gray-100 hocus:bg-gray-200 hocus:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0`}
  .iconContainer {
    ${tw`bg-white p-2 rounded-full`}
  }
  .icon {
    ${tw`w-4`}
  }
  .text {
    ${tw`ml-4`}
  }
`;

function Loginfb({
  onSuccess=()=>{},
  onFailure=()=>{},
  text='Sign Up With Facebook'
}) {
  return (
    <div>
      <FacebookLogin
      appId="1255043108323733"
      autoLoad={false}
      fields="name,email,picture"
    
      callback={onSuccess}
      onFailure={onFailure}
      // size= 'small'

      render={renderProps => (
        <SocialButtonsContainer>
          <SocialButton key={1} onClick={renderProps.onClick} disabled={renderProps.disabled}>
            <span className="iconContainer">
              <img src={fbIconImageSrc} className="icon" alt="" />
            </span>
            <span className="text">{text}</span>
          </SocialButton>
        </SocialButtonsContainer>         
      )}
      
      />
    </div>
  );
}

export default Loginfb;