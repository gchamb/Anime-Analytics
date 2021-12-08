import { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Animes from "./components/pages/Animes";
import Anime from "./components/pages/Anime";
import Home from "./components/pages/Home";

function App() {
  const [info, setInfo] = useState();
  const [liftedAnimes, setLiftedAnimes] = useState();
  const history = useHistory();
  const getGenreHandler = (genreInfo) => {
    setInfo(genreInfo);
    history.push("/animes");
  };
  const liftAnimes = (animes) => {
    setLiftedAnimes(animes);
  };

  return (
    <Switch>
      <Route exact path="/">
        <Home getGenreHandler={getGenreHandler} />
      </Route>
      <Route exact path="/animes">
        <Animes info={info} liftAnimes={liftAnimes}/>
      </Route>
      <Route path="/animes/:id">
        <Anime animes={liftedAnimes}/>
      </Route>
      <Route path="*">
        <p>Nothing Found Here</p>
      </Route>
    </Switch>
  );
}

export default App;
