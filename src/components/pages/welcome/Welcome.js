import homeImg from "../../../images/home.png";
import search from "../../../images/search.png";
import list from "../../../images/list.png";
import paf from "../../../images/paf.png";
import ratings from "../../../images/ratings.png";
import stats from "../../../images/stats.png";
import logo from "../../../images/logo.png";
import classes from "./Welcome.module.css";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className={classes.welcome}>
      <div className={classes.homeImg}>
        <img src={homeImg} alt="" />
        <h2 className="centered">Gasai Yuno</h2>
      </div>

      <div className={classes.content}>
        <div className={classes.contentImg}>
          <img src={logo} alt="" />
        </div>
        <div className={classes.contentGroup}>
          <h2 className="pink">Welcome to Anime Analytics</h2>
          <p className="white">
            The perfect place for watchers of the ultimate art form! On Anime
            Analytics, we perfectly translate your taste of anime into
            beautiful charts where you can get a gauge of what type of animes
            you've watched over long periods of time!
          </p>
        </div>
        <div className={classes.contentGroup}>
          <h2 className="pink">Features</h2>
          <div className={classes.features}>
            <div className={classes.feature}>
              <div className={classes.featureImg}>
                <img src={paf} alt="" />
              </div>
              <h3>PAF!</h3>
              <p>Find your perfect anime!</p>
            </div>
            <div className={classes.feature}>
              <div className={classes.featureImg}>
                <img src={search} alt="" />
              </div>
              <h3>Search!</h3>
              <p>Search for your favorites!</p>
            </div>
            <div className={classes.feature}>
              <div className={classes.featureImg}>
                <img src={list} alt="" />
              </div>
              <h3>List!</h3>
              <p>Store your animes in a watch/plan list!</p>
            </div>
            <div className={classes.feature}>
              <div className={classes.featureImg}>
                <img src={stats} alt="" />
              </div>
              <h3>Stats!</h3>
              <p>Display your completed animes through beautiful charts!</p>
            </div>
            <div className={classes.feature}>
              <div className={classes.featureImg}>
                <img src={ratings} alt="" />
              </div>
              <h3>Ratings!</h3>
              <p>Become the Critic!</p>
            </div>
          </div>
        </div>

        <div className={classes.contentGroup}>
          <h2 className="pink">Join Us!</h2>
          <div>
            <Link to="/signup" className="linkBtn">
              Sign Up!
            </Link>
            <Link to="/login" className="linkBtn">
              Login!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
