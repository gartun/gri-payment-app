import { Switch, Route } from "react-router-dom";

import Profile from "./screens/Profile";
import Orders from "./screens/Orders";
import NewOrder from "./screens/NewOrder";

import Login from "./components/Login";
import Header from "./components/Header";

import useToken from "./custom-hooks/useToken";

function App() {
  const { token, setTokens, deleteTokens } = useToken();

  return (
    <>
      <Header />
      <main>
        <div className="container">
          {!token ? (
            <Login setTokens={setTokens} />
          ) : (
            <Switch>
              <Route exact path={["/profile", "/"]}>
                <Profile deleteTokens={deleteTokens} />
              </Route>
              <Route path="/orders" component={Orders} />
              <Route path="/new-order" component={NewOrder} />
            </Switch>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
