import { useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Animes from "./components/pages/paf/Animes";
import Anime from "./components/pages/paf/Anime";
import PAF from "./components/pages/paf/PAF";
import Home from "./components/pages/home/Home";
import Search from "./components/pages/search/Search";
import SearchResults from "./components/pages/search/SearchResults";
import SearchedAnime from "./components/pages/search/SearchedAnime";
import List from "./components/pages/list/List";
import Signup from "./components/pages/auth/Signup";
import Login from "./components/pages/auth/Login";
import authContext from "./context/auth-context";
import Cookies from "universal-cookie";
import Rating from "./components/pages/ratings/Rating";
import Stats from "./components/pages/stats/Stats";
import ShareRating from "./components/pages/ratings/ShareRating";
import Recovery from "./components/pages/auth/Recovery";
import ResetPassword from "./components/pages/auth/ResetPassword";
import Discover from "./components/pages/discover/Discover";
import Browse from "./components/pages/browse/Browse";

const cookies = new Cookies();

function App() {
  const [token, setToken] = useState(cookies.get("token"));
  const [username, setUsername] = useState(cookies.get("username"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [info, setInfo] = useState(undefined);
  const [liftedAnimes, setLiftedAnimes] = useState();
  const history = useHistory();

  // Will be used throughout the application to logout
  const logoutHandler = () => {
    cookies.remove("token");
    cookies.remove("username");
    setToken(undefined);
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    setIsLoggedIn(true);
  };

  // if the token is valid and isnt undefined then you should be loggedin
  if (token !== undefined && isLoggedIn === false) {
    loginHandler();
  }

  const getGenreHandler = (genreInfo) => {
    setInfo(genreInfo);
    history.push("/paf/animes");
  };
  const liftAnimes = (animes) => {
    setLiftedAnimes(animes);
  };

  return (
    <authContext.Provider
      value={{
        token: token,
        username: username,
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        setToken: setToken,
        setUser: setUsername,
      }}
    >
      <Switch>
        <Route exact path="/">
          <Discover />
        </Route>
        <Route path="/discover">
          <Discover />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/recovery">
          <Recovery />
        </Route>
        <Route exact path="/recovery/:token">
          <ResetPassword />
        </Route>
        <Route path="/share/:token">
          <ShareRating />
        </Route>
        <Route path="/browse/:type">
          <Browse />
        </Route>
        <Route path="/anime/:id">
          <SearchedAnime />
        </Route>
        <Route path="/home">
          {isLoggedIn ? <Home /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/search">
          {isLoggedIn ? <Search /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/search/:result">
          {isLoggedIn ? <SearchResults /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/search/:name/:id">
          {isLoggedIn ? (
            <SearchedAnime animes={liftedAnimes} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/list">
          {isLoggedIn ? <List /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/paf">
          {isLoggedIn ? (
            <PAF getGenreHandler={getGenreHandler} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/paf/animes">
          {isLoggedIn ? (
            <Animes info={info} liftAnimes={liftAnimes} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/paf/animes/:id">
          {isLoggedIn ? (
            <Anime animes={liftedAnimes} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/ratings">
          {isLoggedIn ? <Rating /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/stats">
          {isLoggedIn ? <Stats /> : <Redirect to="/login" />}
        </Route>
        <Route path="*">
          <p>Nothing Found Here</p>
        </Route>
      </Switch>
    </authContext.Provider>
  );
}

export default App;
