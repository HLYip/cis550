import React, { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { Redirect } from 'react-router-dom'
import { withGlobalState } from 'react-globally'

import { postLogin, postLogin2 } from "fetcher";
import { refreshTokenSetup } from "components/login/refreshToken";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import illustration from "images/login-illustration.svg";
import logo from "images/logo.png";
import googleIconImageSrc from "images/google-icon.png";
import twitterIconImageSrc from "images/twitter-icon.png";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
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

const DividerTextContainer = tw.div`my-12 border-b text-center relative`;
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
  ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
`;

function Login(props, {
  logoLinkUrl = "/",
  illustrationImageSrc = illustration,
  headingText = "Sign In To YYDX",
  socialButtons = [
    {
      iconImageSrc: googleIconImageSrc,
      text: "Sign In With Google",
      url: "https://google.com"
    },
    {
      iconImageSrc: twitterIconImageSrc,
      text: "Sign In With Twitter",
      url: "https://twitter.com"
    }
  ],
  submitButtonText = "Sign In",
  SubmitButtonIcon = LoginIcon,
  signupUrl = "/signup",
}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState(false)

  const submit = async (e) => {
    e.preventDefault();
    if (username.length < 3) {
      alert("Your username is incorrect")
    } else if (password.length < 6 || password.length > 18) {
      alert("Your password is incorrect")
    } else {
      const loginResult = await postLogin(username, password)
      if (loginResult.status === 400) {
        if (loginResult.result.message === "Incorrect username.") {
          alert("Your username is incorrect")
        } else {
          alert("Your password is incorrect")
        }
      } else if (loginResult.status !== 200) {
        alert("Internal error. Please notify developers")
      } else {
        window.localStorage.setItem('authenticated', true);
        window.localStorage.setItem('userId', loginResult.result.userId);
        props.setGlobalState(prevGlobalState => (loginResult.result))
        setSuccess(true)
      }
    }
  }

  const onSuccess = async (res) => {
    const loginResult = await postLogin2(res.profileObj.googleId)
    if (loginResult.status === 409) {
      alert("Your google account has not been signed up yet")
    } else if (loginResult.status !== 200) {
      alert("Internal error. Please notify developers")
    } else {
      refreshTokenSetup(res);
      window.localStorage.setItem('authenticated', true);
      window.localStorage.setItem('userId', res.profileObj.googleId);
      setSuccess(true)        
    } 
  };

  const onSuccess1 = async (res) => {
    const loginResult = await postLogin2(res.id)
    if (loginResult.status === 409) {
      alert("Your google account has not been signed up yet")
    } else if (loginResult.status !== 200) {
      alert("Internal error. Please notify developers")
    } else {
      window.localStorage.setItem('authenticated', true);
      window.localStorage.setItem('userId', res.id);
      setSuccess(true)        
    }
    
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login. 😢 Please try again`
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
              <GLogin onSuccess={onSuccess} text='Sign In With Google'/>
              <FLogin onSuccess={onSuccess1} text='Sign In With Facebook'/>
              <DividerTextContainer>
                <DividerText>Or</DividerText>
              </DividerTextContainer>
              <Form>
                <Input type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} />
                <Input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <SubmitButton type="submit" onClick={submit}>
                  <SubmitButtonIcon className="icon" />
                  <span className="text">{submitButtonText}</span>
                </SubmitButton>

                {success &&
                  <Redirect to={{
                    pathname: '/'
                  }}/>
                }

              </Form>
              <p tw="mt-8 text-sm text-gray-600 text-center">
                Dont have an account?{" "}
                <a href={signupUrl} tw="border-b border-gray-500 border-dotted">
                  Sign Up
                </a>
              </p>
            </FormContainer>
          </MainContent>
        </MainContainer>
        <IllustrationContainer>
          <IllustrationImage imageSrc={illustrationImageSrc} />
        </IllustrationContainer>
      </Content>
    </Container>
  </AnimationRevealPage>
)};

export default withGlobalState(Login)