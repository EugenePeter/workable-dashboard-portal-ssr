import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProtectedRoutesProvider from "./ProtectedRoutesProvider";
import ProtectedRoutesConsumer from "./ProtectedRoutesConsumer";
import { checkAuthorization } from "../hooks/use-request";

const ProtectedRoutes: React.FC<any> = (props) => {
  const { ...rest } = props;

  return (
    <ProtectedRoutesProvider {...rest}>
      <ProtectedRoutesConsumer {...rest} />
    </ProtectedRoutesProvider>
  );
};

export default ProtectedRoutes;
