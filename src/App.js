import { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Animes from "./components/pages/anime/Animes";
import Anime from "./components/pages/anime/Anime";
import PAF from "./components/pages/anime/PAF";
import Home from "./components/pages/home/Home";

function App() {
  const [info, setInfo] = useState();
  const [liftedAnimes, setLiftedAnimes] = useState();
  const history = useHistory();
  const getGenreHandler = (genreInfo) => {
    setInfo(genreInfo);
    history.push("/paf/animes");
  };
  const liftAnimes = (animes) => {
    setLiftedAnimes(animes);
  };
  return (
    <Switch>
      <Route exact path="/">
        <p>Home Page</p>
      </Route>
      <Route path="/signup">
        <Home />
      </Route>
      <Route path="/login">
        <Home />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/search">
        <p>Search</p>
      </Route>
      <Route path="/list">
        <p>list</p>
      </Route>
      <Route exact path="/paf">
        <PAF getGenreHandler={getGenreHandler} />
      </Route>
      <Route exact path="/paf/animes">
        <Animes info={info} liftAnimes={liftAnimes} />
      </Route>
      <Route path="/paf/animes/:id">
        <Anime animes={liftedAnimes} />
      </Route>
      <Route path="*">
        <p>Nothing Found Here</p>
      </Route>
    </Switch>
  );
}

export default App;
