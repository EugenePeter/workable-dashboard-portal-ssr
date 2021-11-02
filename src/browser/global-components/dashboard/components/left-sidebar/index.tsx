import React, { useContext, useEffect, useRef } from "react";
import { LeftSideBarWrapper } from "../styles";
import { Sender } from "xstate";
import styled from "styled-components";
import { useHistory, useParams, Switch, Route, NavLink, useLocation } from "react-router-dom";

import Branding from "./Branding";

import { ProtectedRoutesActions } from "../../../../protected-routes/ProtectedRoutesProvider";

export interface LeftSideBarProps {
  menus: [];
  send: Sender<any>;
  active_tab: any;
}

export interface Imenu {
  component_name: string;
  application_id: string;
  application_name: string;
  url: string;
}

const LeftSideBar: React.FC<LeftSideBarProps> = (props) => {
  const { menus, send, active_tab = {} } = props;
  const { application_id } = active_tab;
  const { setAuthenticated, actionsProp } = useContext(ProtectedRoutesActions);

  const navigate = useHistory();

  const URL = useLocation().pathname;
  const ref = useRef(null);

  const handleMenuItemClicked = (menu_item: any) => {
    console.log("MENU ITEMS:", menu_item);
    menu_item &&
      send({
        type: "OPEN_TAB",
        payload: menu_item,
      });
    // ref.current = menu_item;
    // navigate.push(`/${menu_item.url}`);
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem("token");
    actionsProp.handleLogout();
    navigate.push("/");
  };

  const reload = async () => {
    const url = URL.replace("/", "");
    const tab = menus.filter((item: any) => item.url === url);
    // if (!tab.application.id!) null;
    return tab;
    // new Promise((resolve, reject) => {
    //   resolve(tab);
    // });
  };

  useEffect(() => {
    const url = URL.replace("/", "");
    const tab = url && menus.filter((item: any) => item.url === url);
    tab || url === "" 
    ? handleMenuItemClicked(tab[0]) : navigate.push("/page-not-found");
    console.log("nana", tab);
  }, [URL, menus]);

  return (
    <LeftSideBarWrapper className="left-side-bar-wrapper">
      <Branding />
      {menus &&
        menus.map((item: any, index: any) => (
          <StyledNavLink to={`/${item.url}`} key={item.application_id}>
            <StyledMenu
              // key={item.application_id}
              onClick={() => handleMenuItemClicked(item)}
              application_id={application_id}
              className="left-menus"
            >
              {item.application_name}
            </StyledMenu>
          </StyledNavLink>
        ))}
      <h3 style={{ marginLeft: "1.2rem", cursor: "pointer" }} onClick={handleLogout}>
        SIGN OUT
      </h3>
    </LeftSideBarWrapper>
  );
};

export default LeftSideBar;

export interface IStyledMenu {
  application_id: string;
}
export const StyledMenu = styled.div<IStyledMenu>`
  line-height: 2rem;
  color: ${({ key, application_id }) => (key === application_id ? "blue" : "gray")};
  margin-left: 1.2rem;
`;

export const StyledNavLink = styled(NavLink)`
  list-style-type: none;
  color: gray;
`;
