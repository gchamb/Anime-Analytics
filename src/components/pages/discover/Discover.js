import { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { endpoints } from "../../../utils/util";
import logo from "../../../images/logo.png";
import classes from "./Discover.module.css";
import authContext from "../../../context/auth-context";

const axios = require("axios");
const Discover = () => {
  const [topAiring, setTopAiring] = useState([]);
  const [todayAnimes, setTodayAnimes] = useState([]);
  const [topByPop, setTopByPop] = useState([]);
  const today = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][new Date().getDay()];
  const { isLoggedIn, onLogout } = useContext(authContext);

  useEffect(() => {
    const getAnimes = async () => {
      const { data } = await axios.get(endpoints.jikan.discover);
      setTopAiring(data.topAiring);
      setTodayAnimes(data.todayAnimes);
      setTopByPop(data.topByPop);
    };
    getAnimes();
  }, []);

  if (
    topAiring.length === 0 ||
    todayAnimes.length === 0 ||
    topByPop.length === 0
  ) {
    return <p className="centeredWhite">Loading...</p>;
  }
  return (
    <main className={classes.discover}>
      {isLoggedIn ? (
        "hey"
      ) : (
        <nav>
          <ul className={classes.discoverNav}>
            <li>
              <Link to="/signup">Signup!</Link>
            </li>
            <li>
              <Link to="/login">Login!</Link>
            </li>
          </ul>
        </nav>
      )}
      <header className={classes.discoverHeader}>
        <img src={logo} alt="" />
        <p>Discover the latest and greatest to fit your taste!</p>
      </header>

      <section style={{ width: "80%", margin: "auto" }}>
        <h3 className={classes.heading} style={{ alignSelf: "flex-start" }}>
          Top Animes Airing!
        </h3>
        <div className={classes.animeView}>
          {topAiring.map((anime, idx) => {
            if (idx < 12) {
              return (
                <Link
                  className={classes.anime}
                  to={`/anime/${anime.mal_id}`}
                  key={idx}
                >
                  <img src={anime.image_url} alt="" />
                  <br />
                  <label>{anime.title}</label>
                </Link>
              );
            }
            return <Fragment key={idx} />;
          })}
        </div>

        <div className={classes.moreBtn}>
          <Link className="btn3" to="/browse/airing">
            Browse More
          </Link>
        </div>
      </section>

      <section style={{ width: "80%", margin: "auto" }}>
        <h3 className={classes.heading}>Top Animes By Popularity!</h3>
        <div className={classes.animeView2}>
          {topByPop.map((anime, idx) => {
            if (idx < 16) {
              return (
                <Link to={`/anime/${anime.mal_id}`} key={idx}>
                  <div className={classes.anime2}>
                    <img src={anime.image_url} alt="" />
                    <br />
                    <label>{anime.title}</label>
                  </div>
                </Link>
              );
            }
            return <Fragment key={idx} />;
          })}
        </div>

        <div className={classes.moreBtn}>
          <Link className="btn3" to="/browse/popular">
            Browse More
          </Link>
        </div>
      </section>

      <section className={classes.animeView3}>
        <h3 className={classes.heading}>Top Animes By {today}!</h3>

        {todayAnimes.map((anime, idx) => {
          if (idx < 3) {
            return (
              <Link
                className={classes.link}
                to={`/anime/${anime.mal_id}`}
                key={idx}
              >
                <div className={classes.anime3}>
                  <label className={classes.title}>{anime.title}</label>
                  <p className={classes.synopsis}>{anime.synopsis}</p>
                  <label>{anime.score}/10</label>
                </div>
              </Link>
            );
          }

          return <Fragment key={idx} />;
        })}

        <div className={classes.moreBtn}>
          <Link className="btn3" to={`/browse/${today.toLowerCase()}`}>
            Browse More
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Discover;
