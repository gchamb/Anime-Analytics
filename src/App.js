import { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Animes from "./components/pages/Animes";
import Anime from "./components/pages/Anime";
import PAF from "./components/pages/PAF";
import Home from "./components/pages/Home";

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
        <Home />
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
