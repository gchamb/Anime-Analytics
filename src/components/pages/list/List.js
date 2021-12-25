import classes from "./List.module.css";
import { useContext, useEffect, useState } from "react";
import list from "../../../images/list.png";
import AnimeOptions from "../../UI/AnimeOptions";
import Paginator from "../../UI/Paginator";
import authContext from "../../../context/auth-context";

const watching = [
  {
    image_url:
      "https://m.media-amazon.com/images/M/MV5BN2E2OTgzODktMjBhYy00MjJjLWI0OTgtNGYxOGNhMWMxOWE4XkEyXkFqcGdeQXVyMzgxODM4NjM@._V1_FMjpg_UY720_.jpg",
    title: "Tokyo Ghoul",
  },
  {
    image_url:
      "https://m.media-amazon.com/images/M/MV5BN2E2OTgzODktMjBhYy00MjJjLWI0OTgtNGYxOGNhMWMxOWE4XkEyXkFqcGdeQXVyMzgxODM4NjM@._V1_FMjpg_UY720_.jpg",
    title: "Tokyo Ghoul",
  },
  {
    image_url:
      "https://m.media-amazon.com/images/M/MV5BN2E2OTgzODktMjBhYy00MjJjLWI0OTgtNGYxOGNhMWMxOWE4XkEyXkFqcGdeQXVyMzgxODM4NjM@._V1_FMjpg_UY720_.jpg",
    title: "Tokyo Ghoul",
  },
  {
    image_url:
      "https://m.media-amazon.com/images/M/MV5BN2E2OTgzODktMjBhYy00MjJjLWI0OTgtNGYxOGNhMWMxOWE4XkEyXkFqcGdeQXVyMzgxODM4NjM@._V1_FMjpg_UY720_.jpg",
    title: "Tokyo Ghoul",
  },
  {
    image_url:
      "https://m.media-amazon.com/images/M/MV5BN2E2OTgzODktMjBhYy00MjJjLWI0OTgtNGYxOGNhMWMxOWE4XkEyXkFqcGdeQXVyMzgxODM4NjM@._V1_FMjpg_UY720_.jpg",
    title: "Tokyo Ghoul",
  },
];

const plan = [
  {
    image_url:
      "https://m.media-amazon.com/images/M/MV5BZmQ5NGFiNWEtMmMyMC00MDdiLTg4YjktOGY5Yzc2MDUxMTE1XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_FMjpg_UX680_.jpg",
    title: "Naruto",
  },
  {
    image_url:
      "https://m.media-amazon.com/images/M/MV5BZmQ5NGFiNWEtMmMyMC00MDdiLTg4YjktOGY5Yzc2MDUxMTE1XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_FMjpg_UX680_.jpg",
    title: "Naruto",
  },
  {
    image_url:
      "https://m.media-amazon.com/images/M/MV5BZmQ5NGFiNWEtMmMyMC00MDdiLTg4YjktOGY5Yzc2MDUxMTE1XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_FMjpg_UX680_.jpg",
    title: "Naruto",
  },
  {
    image_url:
      "https://m.media-amazon.com/images/M/MV5BZmQ5NGFiNWEtMmMyMC00MDdiLTg4YjktOGY5Yzc2MDUxMTE1XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_FMjpg_UX680_.jpg",
    title: "Naruto",
  },
  {
    image_url:
      "https://m.media-amazon.com/images/M/MV5BZmQ5NGFiNWEtMmMyMC00MDdiLTg4YjktOGY5Yzc2MDUxMTE1XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_FMjpg_UX680_.jpg",
    title: "Naruto",
  },
  {
    image_url:
      "https://m.media-amazon.com/images/M/MV5BZmQ5NGFiNWEtMmMyMC00MDdiLTg4YjktOGY5Yzc2MDUxMTE1XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_FMjpg_UX680_.jpg",
    title: "Naruto",
  },
];

const axios = require("axios");
const List = () => {
  const [animeList, setAnimeList] = useState();
  const [listOption, setListOption] = useState({
    option: "Watching",
    url: "http://localhost:5000/",
  });
  const auth = useContext(authContext);
  const listOptionChangeHandler = (e) => {
    if (e.target.value === "Watching") {
      setListOption({
        option: "Watching",
        url: "http://localhost:5000/",
      });
    } else {
      setListOption({
        option: "Plan To Watch",
        url: "http://localhost:5000/",
      });
    }
  };
  const listAnimeOptionHandler = (e) => {
    const option = e.target.value;
    switch (option) {
      case "Add to Watching":
        // console.log("watching " + props.anime.title);
        break;
      case "Add to Plan To Watch":
        // console.log("plan to watch " + props.anime.title);
        break;
      case "Rate it":
        // console.log("rating " + props.anime.title);
        break;
      case "Delete":
        // console.log("delete " + props.anime.title);
        break;
      default:
        console.log("error");
    }
  };
  useEffect(() => {
    const getAnimeList = async () => {
      const { data } = await axios.get("http://localhost:5000/list", {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      });
      console.log(data);
    };
  }, [listOption.url, listAnimeOptionHandler, auth.token]);
  return (
    <div className={classes.animeList}>
      <div className="heading">
        <div className={classes.animeListImg}>
          <img src={list} alt="" />
        </div>
        <h1>Watch List!</h1>
      </div>

      <ul className={classes.list}>
        <div className={classes.options}>
          <button
            onClick={listOptionChangeHandler}
            value="Watching"
            className={
              listOption.option === "Watching"
                ? classes.optionButtonActive
                : classes.optionButton
            }
          >
            Watching
          </button>
          <button
            onClick={listOptionChangeHandler}
            value="Plan to Watch"
            className={
              listOption.option === "Plan To Watch"
                ? classes.optionButtonActive
                : classes.optionButton
            }
          >
            Plan To Watch
          </button>
        </div>
        {listOption.option === "Watching" &&
          watching.map((anime, idx) => {
            return (
              <li className={classes.listItem} key={idx}>
                <div className={classes.listImg}>
                  <img src={anime.image_url} alt="" />
                </div>
                <div className={classes.listTitle}>{anime.title}</div>

                <AnimeOptions
                  location={listOption.option}
                  anime={anime}
                  animeOptionHandler={listAnimeOptionHandler}
                />
              </li>
            );
          })}

        {listOption.option === "Plan To Watch" &&
          plan.map((anime, idx) => {
            return (
              <li className={classes.listItem} key={idx}>
                <div className={classes.listImg}>
                  <img src={anime.image_url} alt="" />
                </div>
                <div className={classes.listTitle}>{anime.title}</div>

                <AnimeOptions location={listOption.option} anime={anime} />
              </li>
            );
          })}
        {/* <Paginator
          pages={numOfPage}
          currentPage={page}
          nextPage={incrementPage}
          prevPage={decrementPage}
        /> */}
      </ul>
    </div>
  );
};

export default List;
