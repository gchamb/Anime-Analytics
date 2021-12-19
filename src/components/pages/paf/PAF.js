import classes from "./PAF.module.css";
import "../../../index.css";
import yuno from "../../../images/yuno.jpg";
import { useState } from "react";
import { genreIds } from "../../../utils/dicts";

const PAF = (props) => {
  const genresKeys = Object.keys(genreIds);
  const [genresChosen, setGenresChosen] = useState({
    first: "Action",
    second: "Action",
    third: "Action",
  });

  const genreChangeHandler = (event) => {
    switch (event.target.name) {
      case "first":
        setGenresChosen((prev) => {
          return {
            ...genresChosen,
            first: event.target.value,
          };
        });
        break;
      case "second":
        setGenresChosen((prev) => {
          return {
            ...genresChosen,
            second: event.target.value,
          };
        });
        break;
      case "third":
        setGenresChosen((prev) => {
          return {
            ...genresChosen,
            third: event.target.value,
          };
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
        <button className="btn" onClick={pushPageHandler}>
          Find Animes!
        </button>
      </div>
    </div>
  );
};

export default PAF;
