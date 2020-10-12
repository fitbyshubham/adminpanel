import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import Dashboard from "./containers/homepage";
import Login from "./containers/auth/login";
import { connect } from "react-redux";
import { Provider as DataProvider } from "./api/dataProvider";

const App = ({ token }) => {
  return (
    <DataProvider>
      <Switch>
        {token && token.length > 0 ? (
          <Route path="/">
            <Dashboard token={token} />
          </Route>
        ) : (
          <Route exact path="/" component={Login} />
        )}
        {!token && <Redirect to="/" />}
      </Switch>
    </DataProvider>
  );
};
//test comment

const mapStateToProps = (state) => ({
  token: state.auth.user && state.auth.user.token,
});

export default withRouter(connect(mapStateToProps, null)(App));
