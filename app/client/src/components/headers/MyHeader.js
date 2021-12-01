import React from "react";
import tw from "twin.macro";
import styled from "styled-components";


import Header, { NavLink, NavLinks, PrimaryLink as PrimaryLinkBase, LogoLink, NavToggle, DesktopNavLinks } from "../headers/light.js";

const PrimaryLink = tw(PrimaryLinkBase)`rounded-full`

function DefaultHeader() {
    const StyledHeader = styled(Header)`
    ${tw`pt-8 max-w-none w-full`}
    ${DesktopNavLinks} ${NavLink}, ${LogoLink} {
        ${tw`text-gray-100 hover:border-gray-300 hover:text-gray-300`}
    }
    ${NavToggle}.closed {
        ${tw`text-gray-100 hover:text-primary-500`}
    }
    `;
    const buttonRoundedCss = tw`rounded-full`;
    const navLinks = [
    //   <NavLinks key={1}>
    //     <NavLink href="/#">About</NavLink>
    //     <NavLink href="/#">Blog</NavLink>
    //     <NavLink href="/#">Pricing</NavLink>
    //     <NavLink href="/#">Contact Us</NavLink>
    //   </NavLinks>,
      <NavLinks key={1}>
        <NavLink href="/#" tw="lg:ml-12!">
          Login
        </NavLink>
        <PrimaryLink css={buttonRoundedCss} href="/#">
          Sign Up
        </PrimaryLink>
      </NavLinks>
    ];

    return (
        <StyledHeader links={navLinks} />
    );
  };

 function DarkHeader(
   page = 1,
   pagesize = 16
 ) {
    const StyledHeader = styled(Header)`
    ${tw`pt-8 max-w-none w-full`}
    ${NavToggle}.closed {
        ${tw`text-gray-100 hover:text-primary-500`}
    }
    `;
    const buttonRoundedCss = tw`rounded-full`;

    
    const navLinks = [
    // <NavLinks key={0}>
    //     <NavLink href="/#">About</NavLink>
    //     <NavLink href="/#">Blog</NavLink>
    //     <NavLink href="/#">Pricing</NavLink>
    //     <NavLink href="/#">Contact Us</NavLink>
    // </NavLinks>,
    <NavLinks key={1}>
        <NavLink href="/#" tw="lg:ml-12!">
            Login
        </NavLink>
        <PrimaryLink css={buttonRoundedCss} href="/#">
            Sign Up
        </PrimaryLink>
    </NavLinks>
    ];

    return (
      <div>
        <StyledHeader links={navLinks}/>
      </div>
        
    );
  };

export {
    DefaultHeader,
    DarkHeader
  }