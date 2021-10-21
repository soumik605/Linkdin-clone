import React, { useEffect, createContext, useReducer, useContext } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import { initialState, reducer } from "./reducers/userReducer";
import HomePage from "./Components/HomePage";
import SignupPage from "./Components/SignupPage";
import SigninPage from "./Components/SigninPage";
import UserDetails from "./Components/UserDetails";
import MyConnections from "./Components/MyConnections";
import ChatPage from "./Components/ChatPage";
import Myposts from "./Components/Myposts";
import MyFeed from "./Components/MyFeed";
import MyProfile from './Components/MyProfile'
import UserProfile from "./Components/UserProfile";

export const userContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { dispatch } = useContext(userContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      history.push("/home");
    }
  }, []);
  return (
    <Switch>
      <Route exact path="/">
        <MyFeed />
      </Route>
      <Route exact path="/home">
        <HomePage />
      </Route>
      <Route exact path="/signin">
        <SigninPage />
      </Route>
      <Route exact path="/signup1">
        <SignupPage />
      </Route>
      <Route exact path="/signup2">
        <UserDetails />
      </Route>
      <Route exact path="/profile">
        <MyProfile />
      </Route>
      <Route exact path="/profile/:userid">
        <UserProfile />
      </Route>
      <Route exact path="/connections">
        <MyConnections />
      </Route>
      <Route exact path="/chat">
        <ChatPage />
      </Route>
      <Route exact path="/posts/:userid">
        <Myposts />
      </Route>
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <userContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
