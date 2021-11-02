import React from "react";
import { Route, Switch, Link, useParams } from "react-router-dom";
import ProtectedRoute from "./protected-routes";

import "./App.css";
interface IProps {
  [key: string]: any;
}
const App: React.FC<IProps> = (props) => {
  console.log("CURRENT:", props);

  return (
    <Switch>
      <ProtectedRoute path="/" />
      {/* </Route>
      <Route> */}
    </Switch>
  );
};

export default App;
// function Child() {
//   // We can use the `useParams` hook here to access
//   // the dynamic pieces of the URL.
//   let { id } = useParams();

//   return (
//     <div>
//       <h3>ID: {id}</h3>
//     </div>
//   );
// }
