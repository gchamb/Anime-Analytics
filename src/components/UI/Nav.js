import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import authContext from "../../context/auth-context";
import classes from "./Nav.module.css";
const Nav = () => {
  const { pathname } = useLocation();
  const { onLogout } = useContext(authContext);
  let current = pathname.replace("/", "");
  current =
    current.charAt(0).toUpperCase() + current.substring(1, current.length);
  const options = [
    "Discover",
    "Home",
    "Paf",
    "Search",
    "List",
    "Ratings",
    "Stats",
    "Logout",
  ];

  return (
    <ul className={classes.nav}>
      {options.map((option, idx) => {
        if (option === "Logout") {
          return (
            <li hidden={current === option}>
              <Link  onClick={onLogout}>
                {option}
              </Link>
            </li>
          );
        }
        return (
          <li hidden={current === option}>
            <Link to={`/${option.toLowerCase()}`}>{option}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Nav;
