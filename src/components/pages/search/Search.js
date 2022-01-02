import classes from "./Search.module.css";
import searchPic from "../../../images/search.png";
import { useState } from "react";
import "../../../index.css";
import { useHistory } from "react-router-dom";

const Search = () => {
  document.title = "Search!";
  const [searchValue, setSearchValue] = useState("");
  const history = useHistory();

  const searchBarChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    if (searchValue === "") {
      return;
    }
    history.push(`/search/${searchValue}`);
  };

  return (
    <form className={classes.search} onSubmit={submitFormHandler}>
      <div className={classes.heading}>
        <div className={classes.searchImage}>
          <img src={searchPic} alt="yuno gasai" />
        </div>
        <h2>Search!</h2>
      </div>
      <div className={classes.searchBar}>
        <h3>Enter Anime!</h3>
        <input
          type="text"
          value={searchValue}
          onChange={searchBarChangeHandler}
        />
        <br />
        <br />
        <input className="btn2" type="submit" value="Search" />
      </div>
    </form>
  );
};

export default Search;
