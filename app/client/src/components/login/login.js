import { React } from 'react';
import tw from "twin.macro";
import { GoogleLogin } from 'react-google-login';
// refresh token
import googleIconImageSrc from "images/google-icon.png";
import styled from "styled-components";


const SocialButtonsContainer = tw.div`flex flex-col items-center`;
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

const clientId =
  '309902236495-la40njvkv798m3dd2d46nssk3gr6dkmq.apps.googleusercontent.com';

function GLogin({
  onSuccess=()=>{},
  onFailure=()=>{},
  text='Sign Up With Google'
}) {
  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={false}
        autoLoad={false}
        render={renderProps => (
          <SocialButtonsContainer>
            <SocialButton key={1} onClick={renderProps.onClick} disabled={renderProps.disabled}>
              <span className="iconContainer">
                <img src={googleIconImageSrc} className="icon" alt="" />
              </span>
              <span className="text">{text}</span>
            </SocialButton>
          </SocialButtonsContainer>         
        )}
      />
    </div>
  );
}

export default GLogin;