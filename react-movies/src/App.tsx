import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Menu from "./Menu";
import routes from "./route-config";
import configureValidations from "./Validation";

configureValidations();
function App() {

  return (
    <BrowserRouter>
      <Menu />
      <div className="container">
        <Switch>
          {routes.map(route => 
            <Route key={route.path} path={route.path} exact={route.exact}>
              <route.component />
            </Route>)}
        </Switch>
      </div>
      <footer className="bd-footer mt-3 py-3 bg-light sticky-bottom">
        <div className="container">
          React Movies {new Date().getFullYear().toString()}
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
