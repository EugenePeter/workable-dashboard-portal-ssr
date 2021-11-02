import React, { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { checkAuthorization, logout } from "../hooks/use-request";

export const ProtectedRoutesContext = createContext<any | null>(null);
export const ProtectedRoutesActions = createContext<any | null>(null);

export interface data {
  value: string;
  name?: string;
  secondary_name?: string;
}
interface AddVacanciesActions {
  handleLogin: (data: data) => void;
  handleLogout: (data: data) => void;
}

const ProtectedRoutesProvider: React.FC<any> = (props) => {
  const { children } = props;
  if (typeof window === "undefined") {
    return <></>;
  } else {
  }

  const [isAuthenticated, setAuthenticated] = useState(false);
  const [company_id, setCompanyId] = useState();

  const URL = useLocation().pathname;
  useEffect(() => {
    // if (URL === "/") {
    //   checkAuthorization().then(({ isAuthorize, company_id }) => {
    //     console.log("checkAuthorization:", isAuthorize);
    //     setAuthenticated(isAuthorize);
    //     setCompanyId(company_id);
    //   });
    // }
    checkAuthorization().then(({ isAuthorize, company_id }) => {
      console.log("checkAuthorization:", isAuthorize);
      setAuthenticated(isAuthorize);
      setCompanyId(company_id);
    });
  }, [URL]);

  console.log("IS AUTH:", isAuthenticated);

  const actionsProp: AddVacanciesActions = {
    handleLogin: (e: any) => {
      e.preventDefault();
      setAuthenticated(true);
    },

    handleLogout: () => {
      logout();
    },
  };
  return (
    <>
      <ProtectedRoutesContext.Provider value={{ isAuthenticated, company_id }}>
        <ProtectedRoutesActions.Provider value={{ actionsProp, setAuthenticated, setCompanyId }}>
          {children}
        </ProtectedRoutesActions.Provider>
      </ProtectedRoutesContext.Provider>
    </>
  );
  // return <ProtectedRoutesContext.Provider value={{ isAuthenticated, actionsProp, setAuthenticated }}>{children}</ProtectedRoutesContext.Provider>;
};

export default ProtectedRoutesProvider;
