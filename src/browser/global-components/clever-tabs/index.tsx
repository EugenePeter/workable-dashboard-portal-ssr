import React, { useState, useEffect } from "react";
import { useHistory, Switch, Route } from "react-router-dom";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { ApplicationMapper } from "../../global-components";
import styled from "styled-components";
import "react-tabs/style/react-tabs.css";

export interface Idata {
  tab_data: boolean;
  active_tab: {
    application_id: string;
    application_name: string;
  };
  tabs: any;
}
export interface CleverTabsProps<T> {
  data: T;
  component: any;
}

export interface ITabs {
  application_id: string;
  application_name: string;
  component_name: string;
}

const CleverTabs = <T extends Idata>(props: CleverTabsProps<T>) => {
  const [tabIndex, setTabIndex] = useState(0);
  const {
    data: { tab_data, active_tab, tabs },
    component,
  } = props;

  const navigate = useHistory();

  console.log("from where?:", active_tab);

  useEffect(() => {
    if (tabs.length) {
      const currentIndex = tabs?.findIndex(
        (item: any) => item?.application_id === active_tab.application_id
      );
      setTabIndex(currentIndex);
      console.log("CHECKS:", currentIndex);
    }
  }, [tabs, active_tab.application_id]);

  return (
    <>
      <CleverTabsContainer className="clever-tabs_container">
        <StyledTabsParent
          className="tab-parent"
          selectedIndex={tabIndex}
          onSelect={(index) => setTabIndex(index)}
          key="123"
        >
          {
            <StyledTabList className="tab-list" key="432">
              {tabs.map((tab: any, index: number) => (
                <StyledTab
                  className="tab-title"
                  key={tab.application_id}
                  onClick={() => navigate.push(`/${tab.url}`)}
                >
                  {tab.application_name}
                  <CloseTab>x</CloseTab>
                </StyledTab>
              ))}
            </StyledTabList>
          }

          {tabs.map((tab: ITabs, index: number) => {
            const { component_name, application_id } = tab;
            console.log("TAAAAAABS", tab);

            return (
              <StyledTabPanel className="tab-content">
                {component_name && (
                  <ApplicationMapper
                    key={application_id ?? (index || index)}
                    // component_name={component_name}
                    component={component[component_name]}
                  />
                )}
                <Footer>Architected, designed and developed by Eugene Peter Maestrado</Footer>
              </StyledTabPanel>
            );
          })}
        </StyledTabsParent>
      </CleverTabsContainer>
    </>
  );
};

export default CleverTabs;

export const CleverTabsContainer = styled.div`
  padding: 0 1rem 0 1rem;
`;

export const StyledTabPanel = styled(TabPanel)`
  /* height: 100%; */
  position: relative;
  display: flex;
  flex-direction: column;
  /* background-color: red; */
`;

export const StyledTabList = styled(TabList)`
  display: flex;
  padding: 0;
  /* background-color: #a8c1cd; */
  margin: 0;
  margin-bottom: 0;

  .react-tabs__tab--selected {
    background-color: #fff;
    color: #909090 !important;
  }
  /* height: 100%; */
`;
export const StyledTab = styled(Tab)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #a8c1cd;
  list-style-type: none;
  padding: 0 1rem 0 1rem;
  /* height: 2rem; */
  border-radius: 0;
  border-left: 0.2px solid #fff;
  line-height: 40px;
  font-size: small;
  color: #fff;
  cursor: pointer;
  .react-tabs__tab--selected {
    color: #909090 !important;
  }
`;

export const StyledTabsParent = styled(Tabs)`
  /* background-color: blue; */
  height: 100%;
`;

export const Footer = styled.div`
  line-height: 40px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  margin-top: 1rem;
  /* position: absolute; */
  width: 100%;
  bottom: 0;
  /* position: fixed;
  text-align: center; */
  /* align-self: flex-end!important; */
  /* overflow: scroll; */
`;

export const CloseTab = styled.div`
  /* background-color: red;
  height: 1rem;
  width: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px; */
  margin-left: 10px;
`;
