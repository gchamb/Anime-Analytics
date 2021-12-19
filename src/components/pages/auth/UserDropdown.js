import classes from "./UserDropdown.module.css";
import { Link } from "react-router-dom";

const UserDropdown = () => {
  return (
    <div className={classes.dropdown}>
      <h5>Settings</h5>
      <div className={classes.dropdownContent}>
        <Link>Account</Link>
        <br />
        <Link>Logout</Link>
      </div>
    </div>
  );
};

export default UserDropdown;
