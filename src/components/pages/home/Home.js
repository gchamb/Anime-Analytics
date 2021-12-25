import classes from "./Home.module.css";
import UserDropdown from "../auth/UserDropdown";
import search from "../../../images/search.png";
import list from "../../../images/list.png";
import paf from "../../../images/paf.png";
import ratings from "../../../images/ratings.png";
import stats from "../../../images/stats.png";
import "../../../index.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import authContext from "../../../context/auth-context";

const Home = () => {
  const auth = useContext(authContext);
  return (
    <div className={classes.home}>
      <div className={classes.homeTop}>
        <h2 className="white">Welcome Home {auth.username}!</h2>
        <UserDropdown />
      </div>
      <h3 className="centeredWhiteUnderlined">Activities</h3>

      <div className={classes.homeActivities}>
        <Link className={classes.activityContainer} to="/paf">
          <div className={classes.activity}>
            <img src={paf} alt="" />
          </div>
          <h5>PAF!</h5>
        </Link>

        <Link className={classes.activityContainer} to="/search">
          <div className={classes.activity}>
            <img src={search} alt="" />
          </div>
          <h5>SEARCH!</h5>
        </Link>

        <Link className={classes.activityContainer} to="/list">
          <div className={classes.activity}>
            <img src={list} alt="" />
          </div>
          <h5>LIST!</h5>
        </Link>
        <Link className={classes.activityContainer} to="/stats">
          <div className={classes.activity}>
            <img src={stats} alt="" />
          </div>
          <h5>STATS!</h5>
        </Link>
        <Link className={classes.activityContainer} to="/ratings">
          <div className={classes.activity}>
            <img src={ratings} alt="" />
          </div>
          <h5>RATINGS!</h5>
        </Link>
      </div>
    </div>
  );
};

export default Home;
