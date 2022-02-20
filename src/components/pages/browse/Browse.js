import { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { endpoints } from "../../../utils/util";
import classes from "./Browse.module.css";

const axios = require("axios");
const Browse = () => {
  const days = [
    "none",
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const types = [
    "airing",
    "upcoming",
    "tv",
    "movie",
    "ova",
    "special",
    "popular",
    "favorite",
  ];
  const [sectionPicked, setSectionPicked] = useState(useParams().type);

  const history = useHistory();
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    const callApi = async () => {
      const { data } = await axios.get(endpoints.jikan.browse + sectionPicked);
      setAnimes(data);
    };

    callApi();
  }, [sectionPicked]);

  const sectionChangeHandler = (e) => {
    const section = e.target.value;
    setSectionPicked(section === "none" ? "airing" : section);

    section !== "none" && history.replace(`/browse/${section}`);
  };

  return (
    <main>
      <h1 className="centeredWhite">Browse</h1>
      <div className={classes.selectors}>
        <select
          disabled={
            days.includes(sectionPicked) && sectionPicked !== "none"
              ? true
              : false
          }
          onChange={sectionChangeHandler}
        >
          {types.map((type, idx) => {
            return (
              <option value={type} key={idx} selected={sectionPicked === type}>
                {type}
              </option>
            );
          })}
        </select>

        <select onChange={sectionChangeHandler}>
          {days.map((day, idx) => {
            return (
              <option value={day} selected={sectionPicked === day} key={idx}>
                {day}
              </option>
            );
          })}
        </select>
      </div>
      <section className={classes.browseAnimeView}>
        {animes.map((anime, idx) => {
          return (
            <Link to={`/anime/${anime.mal_id}`}>
              <div className={classes.anime2}>
                <img src={anime.image_url} alt="" />
                <br />
                <label>{anime.title}</label>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
};

export default Browse;
