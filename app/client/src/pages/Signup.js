import React, { useState } from "react";
import { Redirect } from 'react-router-dom'
import tw from "twin.macro";
import { withGlobalState } from 'react-globally'
import styled from "styled-components";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';

import { postSignup, postLogin } from "fetcher";
import { refreshTokenSetup } from "components/login/refreshToken";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import illustration from "images/signup-illustration.svg";
import logo from "images/logo.svg";
import googleIconImageSrc from "images/google-icon.png";
import twitterIconImageSrc from "images/twitter-icon.png";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";
import GLogin from "components/login/login"
import FLogin from "components/login/Loginfb"

const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;


const DividerTextContainer = tw.div`my-8 border-b text-center relative`;
const DividerText = tw.div`leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 bg-transparent`;

const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
`;

function Signup(props, {
  logoLinkUrl = "/",
  illustrationImageSrc = illustration,
  headingText = "Sign Up For Treact",
  socialButtons = [
    {
      iconImageSrc: googleIconImageSrc,
      text: "Sign Up With Google",
      url: "https://google.com"
    },
    {
      iconImageSrc: twitterIconImageSrc,
      text: "Sign Up With Twitter",
      url: "https://twitter.com"
    }
  ],
  submitButtonText = "Sign Up",
  SubmitButtonIcon = SignUpIcon,
  prefer_health = "* Would you care about the extent to which the dining area is affected by coronavirus?",
  signInUrl = "/login"
}){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [health, setHealth] = useState(true)
  const [success, setSuccess] = useState(false)

  const submit = async (e) => {
    e.preventDefault();
    if (username.length < 3) {
      alert("Username should be at least 3 characters")
    } else if (password.length < 6 || password.length > 18) {
      alert("Password should be 6-18 characters")
    } else if (password !== password2) {
      alert("Your passwords don't match")
    } else {
      const signUpResult = await postSignup(true, "", username, password, health)
      if (signUpResult.status === 409) {
        alert("Your username has already existed")
      } else if (signUpResult.status !== 200) {
        alert("Internal error. Please notify developers")
      } else {
        const loginResult = await postLogin(username, password)
        if (loginResult.status === 200) {
          window.localStorage.setItem('authenticated', true);
          window.localStorage.setItem('userId', loginResult.result.userId);
          props.setGlobalState(prevGlobalState => (loginResult.result))
        } 
        setSuccess(true)        
      }
    }
  }

  const onSuccess = async (res) => {
    const signUpResult = await postSignup(false, res.profileObj.googleId, res.profileObj.givenName, "google-login", true)
    if (signUpResult.status === 409) {
      alert("Your google account has already been signed up")
    } else if (signUpResult.status !== 200) {
      alert("Internal error. Please notify developers")
    } else {
      refreshTokenSetup(res);
      window.localStorage.setItem('authenticated', true);
      window.localStorage.setItem('userId', res.profileObj.googleId);
      setSuccess(true)        
    }
  };

  const onSuccess1 = async (res) => {
    const signUpResult = await postSignup(false, res.id, res.name, "facebook-login", true)
    if (signUpResult.status === 409) {
      alert("Your facebook account has already been signed up")
    } else if (signUpResult.status !== 200) {
      alert("Internal error. Please notify developers")
    } else {
      window.localStorage.setItem('authenticated', true);
      window.localStorage.setItem('userId', res.id);
      setSuccess(true)        
    }
  };

  const onFailure = (res) => {
    console.log('Sign up failed: res:', res);
    alert(
      `Failed to sign up. 😢 Please try again`
    );
  };

  return (
    <AnimationRevealPage>
    <Container>
      <Content>
        <MainContainer>
          <LogoLink href={logoLinkUrl}>
            <LogoImage src={logo} />
          </LogoLink>
          <MainContent>
            <Heading>{headingText}</Heading>
            <FormContainer>
              <GLogin onSuccess={onSuccess} onFailure={onFailure}/>
              <FLogin onSuccess={onSuccess1} onFailure={onFailure}/>
              <DividerTextContainer>
                <DividerText>Or</DividerText>
              </DividerTextContainer>
              <Form>
                <Input type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)} value={username} required />
                <Input type="password" placeholder="Password" minLength={6} maxLength={12} onChange={(e)=>setPassword(e.target.value)} value={password} required />
                <Input type="password" placeholder="Confirm Your Password" minLength={6} maxLength={12} onChange={(e)=>setPassword2(e.target.value)} value={password2} required />
                <DividerTextContainer />
                <p tw="text-sm text-gray-600 text-center font-extrabold">
                  {prefer_health}
                </p>
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                  <p tw="text-sm text-gray-600 font-extrabold">No</p>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label = ""
                      onChange={(e)=>setHealth(e.target.checked)} 
                    />
                  <p tw="text-sm text-gray-600 font-extrabold">Yes</p>     
                </Stack>
                <SubmitButton type="submit" onClick={submit}>
                  <SubmitButtonIcon className="icon" />
                  <span className="text">{submitButtonText}</span>
                </SubmitButton>

                {success &&
                  <Redirect to={{
                    pathname: '/',
                  }}/>
                }
                
                <p tw="mt-8 text-sm text-gray-600 text-center">
                  Already have an account?{" "}
                  <a href={signInUrl} tw="border-b border-gray-500 border-dotted">
                    Sign In
                  </a>
                </p>
              </Form>
            </FormContainer>
          </MainContent>
        </MainContainer>
        <IllustrationContainer>
          <IllustrationImage imageSrc={illustrationImageSrc} />
        </IllustrationContainer>
      </Content>
    </Container>
  </AnimationRevealPage>
  )
};

export default withGlobalState(Signup)