import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Menu from "./Menu";
import routes from "./route-config";
import configureValidations from "./Validation";
import { claim } from "./model/auth.model";
import { useEffect, useState } from "react";
import AuthenticationContext from "./context/AuthenticationContext";
import { getClaims } from "./auth/handleJWT";
configureValidations();

function App() {
  const [claims, setClaims] = useState<claim[]>([
    // { name: "email", value: "tt2324564@gmail.com" },
    // { name: "role", value: "admin"}
  ]);

  useEffect(() => {
    setClaims(getClaims())
  }, [])
  function isAdmin(){
    //return claims.findIndex(claim => claim.name === 'role' && claim.value === 'admin') > -1;
    return claims.length > 0;
  }
  return (
    <BrowserRouter>
      <AuthenticationContext.Provider value={{claims, update: setClaims}}>
        <Menu />
        <div className="container">
          <Switch>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} exact={route.exact}>
                {route.isAdmin && !isAdmin() ? <>You are not allowed to see this page </> : <route.component />}
              </Route>
            ))}
          </Switch>
        </div>
        <footer className="bd-footer mt-3 py-3 bg-light sticky-bottom">
          <div className="container">
            React Movies {new Date().getFullYear().toString()}
          </div>
        </footer>
      </AuthenticationContext.Provider>
    </BrowserRouter>
  );
}

export default App;
