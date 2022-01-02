import classes from "./List.module.css";
import { useContext, useEffect, useState } from "react";
import list from "../../../images/list.png";
import AnimeOptions from "../../UI/AnimeOptions";
import Paginator from "../../UI/Paginator";
import authContext from "../../../context/auth-context";
import { endpoints } from "../../../utils/util";

const axios = require("axios");
const List = () => {
  document.title = "List!";
  const [animeList, setAnimeList] = useState([]);
  const [paginator, setPaginator] = useState({
    page: 1,
    numOfPages: 0,
  });
  const [listOption, setListOption] = useState({
    option: "Watching",
    url: `${endpoints.watching.get}`,
  });
  const [optionClicked, setOptionClicked] = useState(false);
  const auth = useContext(authContext);

  const nextPage = () => {
    setPaginator((preValue) => {
      return { page: preValue.page + 1, numOfPages: preValue.numOfPages };
    });
  };
  const prevPage = () => {
    setPaginator((preValue) => {
      return { page: preValue.page - 1, numOfPages: preValue.numOfPages };
    });
  };

  const listOptionChangeHandler = (e) => {
    if (e.target.value === "Watching") {
      setListOption({
        option: "Watching",
        url: `${endpoints.watching.get}`,
      });
    } else {
      setListOption({
        option: "Plan To Watch",
        url: `${endpoints.plantowatch.get}`,
      });
    }
  };
  const optionClickedHandler = (bool) => {
    setOptionClicked((prev) => {
      return prev === true ? false : true;
    });
  };
  useEffect(() => {
    const getAnimeList = async () => {
      const { data } = await axios.get(listOption.url + paginator.page, {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      });
      setAnimeList(
        listOption.option === "Watching"
          ? data[listOption.option.toLowerCase()]
          : data[listOption.option.split(" ").join("").toLowerCase()]
      );
      console.log(data);
      setPaginator((prev) => {
        return {
          ...prev,
          numOfPages: data.pages,
        };
      });
    };
    getAnimeList();
    console.log(paginator);
  }, [
    listOption.url,
    auth.token,
    listOption.option,
    paginator.page,
    optionClicked,
  ]);

  return (
    <div className={classes.animeList}>
      <div className="heading">
        <div className={classes.animeListImg}>
          <img src={list} alt="" />
        </div>
        <h2>Watch List!</h2>
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
          animeList.map((anime, idx) => {
            return (
              <li className={classes.listItem} key={anime.name}>
                <div className={classes.listImg}>
                  <img src={anime.imageUrl} alt="" />
                </div>
                <div className={classes.listTitle}>{anime.name}</div>

                <AnimeOptions
                  location={listOption.option}
                  anime={anime}
                  optionClickedHandler={optionClickedHandler}
                />
              </li>
            );
          })}

        {listOption.option === "Plan To Watch" &&
          animeList.map((anime, idx) => {
            return (
              <li className={classes.listItem} key={anime.name}>
                <div className={classes.listImg}>
                  <img src={anime.imageUrl} alt="" />
                </div>
                <div className={classes.listTitle}>{anime.name}</div>

                <AnimeOptions
                  location={listOption.option}
                  anime={anime}
                  optionClickedHandler={optionClickedHandler}
                />
              </li>
            );
          })}
        <Paginator
          pages={paginator.numOfPages}
          currentPage={paginator.page}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </ul>
    </div>
  );
};

export default List;
