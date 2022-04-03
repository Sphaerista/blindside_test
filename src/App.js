import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import VideoPage from "./pages/VideoPage";
import { useContext } from "react";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        {authCtx.isLoggedIn && (
         <Route path="/videos/:idCategory/:idVideo">
          <VideoPage />
          </Route>
          )}
        <Route path="*">
          <Redirect to="" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
