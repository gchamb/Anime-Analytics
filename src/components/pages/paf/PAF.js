import classes from "./PAF.module.css";
import "../../../index.css";
import yuno from "../../../images/yuno.jpg";
import { useState } from "react";
import { genreIds } from "../../../utils/util";

const PAF = (props) => {
  document.title = "PAF!";
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

  const pushPageHandler = (e) => {
    e.preventDefault();
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

      <form className={classes.genres} onSubmit={pushPageHandler}>
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
        <div className={classes.btnDiv}>
          <input className="btn" type="submit" value="Find Animes!" />
        </div>
      </form>
    </div>
  );
};

export default PAF;
