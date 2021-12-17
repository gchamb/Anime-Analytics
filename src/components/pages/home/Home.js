import classes from "./Home.module.css";
import UserDropdown from "../auth/UserDropdown";

const Home = () => {
  return (
    <div className={classes.home}>
      <div className={classes.homeTop}>
        <h2 className={classes.homeTopIntro}>Welcome Home Person!</h2>
        <UserDropdown />
      </div>
      <div className={classes.homeActivities}>
        <div className={classes.activity}>
            
        </div>
        <div className={classes.activity}>

        </div>
        <div className={classes.activity}>

        </div>
        <div className={classes.activity}>

        </div>
      </div>
    </div>
  );
};

export default Home;
