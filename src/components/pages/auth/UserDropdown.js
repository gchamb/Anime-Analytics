import classes from "./UserDropdown.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import authContext from "../../../context/auth-context";

const UserDropdown = () => {
  const auth = useContext(authContext);
  return (
    <div className={classes.dropdown}>
      <h5>Settings</h5>
      <div className={classes.dropdownContent}>
        <Link to="/" className={classes.link}>
          Account
        </Link>
        <br />
        <Link onClick={auth.onLogout}>Logout</Link>
      </div>
    </div>
  );
};

export default UserDropdown;
