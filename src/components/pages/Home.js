import classes from "./Home.module.css";
import "../../index.css";
import yuno from "../../yuno.jpg";
import { useState } from "react";

const genres = {
  Action: 1,
  Adventure: 2,
  Cars: 3,
  Comedy: 4,
  "Avant Garde": 5,
  Demons: 6,
  Drama: 8,
  Ecchi: 9,
  Fantasy: 10,
  Game: 11,
  Harem: 35,
  Hentai: 12,
  Historical: 13,
  Horror: 14,
  Josei: 43,
  Kids: 15,
  "Martial Arts": 17,
  Mecha: 18,
  Military: 38,
  Music: 19,
  Mystery: 7,
  Parody: 20,
  Police: 39,
  Psychological: 40,
  Romance: 22,
  Samurai: 21,
  School: 23,
  "Sci-Fi": 24,
  Seinen: 42,
  Shoujo: 25,
  Shonen: 27,
  "Slice of Life": 36,
  Space: 29,
  Sports: 30,
  "Super Power": 31,
  Supernatural: 37,
  Vampire: 32,
};
const Home = (props) => {
  const genresKeys = Object.keys(genres);
  const [genresChosen, setGenresChosen] = useState({
    first: "Action",
    second: "Action",
    third: "Action",
    firstGenreId: genres.Action,
  });

  const genreChangeHandler = (event) => {
    switch (event.target.name) {
      case "first":
        setGenresChosen((prev) => {
          return {
            ...genresChosen,
            first: event.target.value,
            firstGenreId: genres[event.target.value],
          };
        });
        break;
      case "second":
        setGenresChosen((prev) => {
          return { ...genresChosen, second: event.target.value };
        });
        break;
      case "third":
        setGenresChosen((prev) => {
          return { ...genresChosen, third: event.target.value };
        });
        break;
      default:
        console.log("in default");
    }
  };

  const pushPageHandler = () => {
    props.getGenreHandler(genresChosen);
  };
  return (
    <div className={classes.home}>
      <div className={classes.heading}>
        <div className={classes.headingImg}>
          <img src={yuno} alt="yuno gasai" />
        </div>
        <h1>PAF!</h1>
      </div>
      <div className={classes.genres}>
        <p>Choose your genres</p>
        <select name="first" onChange={genreChangeHandler}>
          {genresKeys.map((genre) => (
            <option key={genre}>{genre}</option>
          ))}
        </select>
        <select name="second" onChange={genreChangeHandler}>
          {genresKeys.map((genre) => (
            <option key={genre}>{genre}</option>
          ))}
        </select>
        <select name="third" onChange={genreChangeHandler}>
          {genresKeys.map((genre) => (
            <option key={genre}>{genre}</option>
          ))}
        </select>
      </div>
      <div className={classes.btnDiv}>
        <button className="btn" onClick={pushPageHandler}>Find Animes!</button>
      </div>
    </div>
  );
};

export default Home;
