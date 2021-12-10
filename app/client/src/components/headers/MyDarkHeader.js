import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { withGlobalState } from 'react-globally'

import { postLogout } from "fetcher.js";

import Header, { NavLink, NavLinks, PrimaryLink as PrimaryLinkBase, LogoLink, NavToggle, DesktopNavLinks } from "./light.js";

const PrimaryLink = tw(PrimaryLinkBase)`rounded-full`


function DarkHeader(props, {
    page = 1,
    pagesize = 16
  }) {
     const StyledHeader = styled(Header)`
     ${tw`pt-8 max-w-none w-full`}
     ${NavToggle}.closed {
         ${tw`text-gray-100 hover:text-primary-500`}
     }
     `;
     const buttonRoundedCss = tw`rounded-full`;
 
     const logout = async () => {
      const logoutResult = await postLogout();
      if (logoutResult.status !== 200) {
        console.log(logoutResult)
        alert('Error. Please contact developers')
      } else {
        window.localStorage.setItem('authenticated', false);
        window.localStorage.setItem('userId', '');
        props.setGlobalState(prevGlobalState => ({
          authenticated: false,
          prefer_health: 1,
          userId: "",
          username: "",
        }))
      }
    }

    const defaultNav = (<NavLinks key={0}>
      <NavLink href="/health">Health</NavLink>
      <NavLink href="/explore">Explore</NavLink>
      <NavLink href="/about">About</NavLink>
    </NavLinks>)

     const navLinks = [
     defaultNav,
     <NavLinks key={1}>
         <NavLink href="/login" tw="lg:ml-12!">
             Login
         </NavLink>
         <PrimaryLink css={buttonRoundedCss} href="/signup">
             Sign Up
         </PrimaryLink>
     </NavLinks>
     ];

     const navLinks2 = [
       defaultNav,
        <NavLinks key={1}>
          <NavLink tw="lg:ml-12!" onClick={logout}>
            Logout
          </NavLink>
          <PrimaryLink css={buttonRoundedCss} href="#">
            Collection
          </PrimaryLink>
        </NavLinks>
      ];
 
     if (window.localStorage.getItem('authenticated')==='true') {
        return (
          <StyledHeader links={navLinks2} />
        )
      }
      return (
          <StyledHeader links={navLinks} />
      );
   };

   export default withGlobalState(DarkHeader)