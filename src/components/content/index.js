import React from 'react'
import {Switch,Route,withRouter} from 'react-router-dom'
import Homepage from '../homepage'
import Users from './components/users'
import Categories from './components/categories'
// import Notifications from "./components/notifications";
import Items from "./components/items"
import Games from "./components/games";


const Content = () => {


    return (
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/categories" component={Categories} />
        {/* <Route exact path="/notifications" component={Notifications} /> */}
        <Route exact path="/items" component={Items} />
        <Route exact path="/games" component={Games} />
      </Switch>
    );
}

export default withRouter(Content)
