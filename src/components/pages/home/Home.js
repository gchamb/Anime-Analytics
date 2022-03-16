import classes from "./Home.module.css";
import search from "../../../images/search.png";
import paf from "../../../images/paf.png";
import "../../../index.css";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import authContext from "../../../context/auth-context";
import { endpoints } from "../../../utils/util";
import star0 from "../../../images/0 stars.png";
import star1 from "../../../images/1 stars.png";
import star2 from "../../../images/2 stars.png";
import star3 from "../../../images/3 stars.png";
import star4 from "../../../images/4 stars.png";
import star5 from "../../../images/5 stars.png";
import BarChart from "../stats/BarChart";

const axios = require("axios");
const Home = () => {
  document.title = "Home!";
  const [overview, setOverview] = useState(undefined);
  let content;
  const auth = useContext(authContext);
  useEffect(() => {
    const getOverview = async () => {
      const { data } = await axios.get(endpoints.overview, {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      });
      setOverview(data);
    };

    getOverview();
  }, [auth.token]);

  if (overview === undefined) {
    content = (
      <main className={classes.home}>
        <div className={classes.homeTop}>
          <h2 className="white">
            Welcome Home{" "}
            {auth.username.charAt(0).toUpperCase() +
              auth.username.substring(1, auth.username.length)}
            !
          </h2>
          <Link className="linkBtn" onClick={auth.onLogout}>
            Logout!
          </Link>
        </div>

        <div className={classes.mainActivity}>
          <p>Loading...</p>
        </div>
      </main>
    );
  } else {
    content = (
      <main className={classes.home}>
        <div className={classes.homeTop}>
          <h2 className="white">
            Welcome Home{" "}
            {auth.username.charAt(0).toUpperCase() +
              auth.username.substring(1, auth.username.length)}
            !
          </h2>
          <Link className="linkBtn" onClick={auth.onLogout}>
            Logout!
          </Link>
        </div>

        <div className={classes.otherActivity}>
          <Link className={classes.other} to="/discover">
            <img src={paf} alt="" />
            <p>Discover!</p>
          </Link>
          <Link className={classes.other} to="/paf">
            <img src={paf} alt="" />
            <p>PAF!</p>
          </Link>
          <Link className={classes.other} to="/search">
            <img src={search} alt="" />
            <p>Search!</p>
          </Link>
        </div>

        <div className={classes.mainActivity}>
          <div className={classes.listContainer}>
            <Link className={classes.list} to="/list">
              <h2>Watching List!</h2>
              {overview.watch.length === 0 ? (
                <p>No Animes!</p>
              ) : (
                overview.watch.map((anime) => {
                  return (
                    <div className={classes.listLi}>
                      <img src={anime.imageUrl} alt="" />
                      <p>{anime.name}</p>
                    </div>
                  );
                })
              )}
            </Link>

            <Link className={classes.list} to="/list">
              <h2>Plan To Watch List!</h2>
              {overview.plan.length === 0 ? (
                <p>No Animes!</p>
              ) : (
                overview.plan.map((anime) => {
                  return (
                    <div className={classes.listLi}>
                      <img src={anime.imageUrl} alt />
                      <p>{anime.name}</p>
                    </div>
                  );
                })
              )}
            </Link>

            <Link className={classes.list} to="/ratings">
              <h2>Ratings List!</h2>
              {overview.rating.length === 0 ? (
                <p>No Animes!</p>
              ) : (
                overview.rating.map((anime) => {
                  return (
                    <div className={classes.listLi}>
                      <img src={anime.imageUrl} alt="" />
                      <p>{anime.name}</p>
                      <div className={classes.listLiRate}>
                        {anime.rate === 0 && <img src={star0} alt="" />}
                        {anime.rate === 1 && <img src={star1} alt="" />}
                        {anime.rate === 2 && <img src={star2} alt="" />}
                        {anime.rate === 3 && <img src={star3} alt="" />}
                        {anime.rate === 4 && <img src={star4} alt="" />}
                        {anime.rate === 5 && <img src={star5} alt="" />}
                      </div>
                    </div>
                  );
                })
              )}
            </Link>
          </div>
          <Link className={classes.stats} to="/stats">
            <h2 className="white">Stats!</h2>
            <BarChart
              titleText="Animes Per Month"
              dataLabels={[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ]}
              data={Object.values(overview.stats.bar.animesPerMonth)}
            />
            <BarChart
              titleText="Animes Per Star Rating"
              dataLabels={Object.keys(overview.stats.bar.animesPerStar)}
              data={Object.values(overview.stats.bar.animesPerStar)}
            />
          </Link>
        </div>
      </main>
    );
  }
  return content;
};

export default Home;
