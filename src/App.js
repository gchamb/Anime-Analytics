import { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Animes from "./components/pages/Animes";
import Home from "./components/pages/Home";

function App() {
  const [info, setInfo] = useState();
  const history = useHistory();
  const getGenreHandler = (genreInfo) => {
    setInfo(genreInfo);
    history.push("/animes");
  };
  return (
    <Switch>
      <Route exact path="/">
        <Home getGenreHandler={getGenreHandler} />
      </Route>
      <Route path="/animes">
        <Animes info={info} />
      </Route>
      <Route path="/animes/:anime"></Route>
    </Switch>
  );
}

export default App;
