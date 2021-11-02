import React, { useContext } from "react";
import { SignIn, SignUp } from "../../atomic";

import { Switch, Route, withRouter, useHistory, useLocation } from "react-router-dom";

import { ProtectedRoutesContext } from "../../protected-routes/ProtectedRoutesProvider";

import axios from "axios";

import {
  Header,
  Title,
  SubTitle,
  HeroRow,
  Modifiers,
  ContainerNarrow,
  ButtonWrapper,
  HeroMainButton,
  SignInSignUpSlot,
  HeroSection,
} from "./styles";

const LandingPage = () => {
  const { isSignUpSuccess } = useContext(ProtectedRoutesContext);
  const navigate = useHistory();
  //@ts-ignore
  const URL = useLocation().pathname;
  console.log("URL: ", URL);
  console.log("isSignUpSuccess", isSignUpSuccess);

  const handleGetStarted = () => {
    navigate.push("signin");
  };

  const checkAuthorization = async () => {
    console.log("im running inside check authorization");
    try {
      const { data } = await axios.get("http://localhost:1010/currentuser");
      console.log("SERVER PAYLOAD:", data);
    } catch (e) {
      console.log("current user ERROR:", e.response);
      console.error(JSON.stringify(e, undefined, 2));
    }
  };
  checkAuthorization();

  return (
    <>
      <Modifiers />
      <HeroSection className="hero-section">
        <SignInSignUpSlot>
          <Switch>
            <Route exact path="/signin">
              <SignIn />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
            <Route exact path="/">
              <HeroRow>
                <Header>
                  <Title>
                    <h1 className="letter-spaced--wider condense">WORKABLE</h1>
                    <h3>Your best resource in finding gigs and industry professionals</h3>
                  </Title>
                  <SubTitle>
                    <h2 className="condense">CONNECT WITH</h2>
                    <h1 className="letter-spaced--wider condense">2000+</h1>
                    <h3>curated buyers and service suppliers.</h3>
                  </SubTitle>
                  <ContainerNarrow>
                    <ButtonWrapper>
                      <HeroMainButton onClick={handleGetStarted}>Get started</HeroMainButton>
                    </ButtonWrapper>
                  </ContainerNarrow>
                </Header>
              </HeroRow>
            </Route>
          </Switch>
          {/* {URL === "/" && (
            <HeroRow>
              <Header>
                <Title>
                  <h1 className="letter-spaced--wider condense">WORKABLE</h1>
                  <h3>Your best resource in finding gigs and industry professionals</h3>
                </Title>
                <SubTitle>
                  <h2 className="condense">CONNECT WITH</h2>
                  <h1 className="letter-spaced--wider condense">2000+</h1>
                  <h3>curated buyers and service suppliers.</h3>
                </SubTitle>
                <ContainerNarrow>
                  <ButtonWrapper>
                    <HeroMainButton onClick={handleGetStarted}>Get started</HeroMainButton>
                  </ButtonWrapper>
                </ContainerNarrow>
              </Header>
            </HeroRow>
          )} */}
        </SignInSignUpSlot>
      </HeroSection>
    </>
  );
};

export default withRouter(LandingPage);
