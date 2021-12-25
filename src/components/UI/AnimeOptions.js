import { Fragment, useContext } from "react";
import { useLocation } from "react-router-dom";
import classes from "./AnimeOptions.module.css";
import { endpoints } from "../../utils/util";
import authContext from "../../context/auth-context";

const axios = require("axios");
const AnimeOptions = (props) => {
  const options = [
    "Select Option",
    "Add to Watching",
    "Add to Plan To Watch",
    "Rate it",
    "Delete",
  ];
  console.log(props.anime)
  const { pathname } = useLocation();
  const auth = useContext(authContext);
  const optionChangeHandler = async (e) => {
    const option = e.target.value;
    let animeData;
    const genres = props.anime.genres.map((a) => {
      return a.name;
    });
    if (props.location === "paf") {
      animeData = {
        name: props.anime.title,
        genres: genres,
        episodes: props.anime.episodes,
        yearReleased: props.anime.airing_start.substring(0, 4),
        studio: props.anime.producers[0].name,
        imageUrl: props.anime.image_url,
      };
    }
    if (props.location === "search") {
      animeData = {
        name: props.anime.title,
        genres: genres,
        episodes: props.anime.episodes,
        yearReleased: props.anime.aired.from.substring(0, 4),
        studio: props.anime.studios[0].name,
        imageUrl: props.anime.image_url,
      };
    }
    let request;
    switch (option) {
      case "Add to Watching":
        request = await axios.post(endpoints.watching.any, animeData, {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        });
        console.log(request.data);
        break;
      case "Add to Plan To Watch":
        request = await axios.post(endpoints.plantowatch.any, animeData, {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        });
        console.log(request.data);
        break;
      case "Rate it":
        // request = await axios.post(endpoints.plantowatch.any, animeData, {
        //   headers: {
        //     Authorization: "Bearer " + auth.token,
        //   },
        // });
        // console.log(request.data);
        break;
      case "Delete":
        const option = props.location.toLowerCase();
        request = await axios.delete(endpoints[option].any, animeData, {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        });
        console.log(request.data);
        break;
      default:
        console.log("error");
    }
  };
  return (
    <select
      className={props.class === undefined ? classes.selector : props.class}
      onChange={
        props.location === "Watching" || props.location === "Plan To Watch"
          ? props.animeOptionHandler
          : optionChangeHandler
      }
      defaultValue={options[0]}
    >
      {options.map((o, idx) => {
        if (idx === 0) {
          return (
            <option value={o} key={idx} disabled>
              {o}
            </option>
          );
        }
        const dontShow = "Add to " + props.location;
        if (props.location === "Watching") {
          if (o === dontShow || o === "Add to Plan To Watch") {
            return <Fragment key={o} />;
          }
        }
        if (dontShow === o) {
          return <Fragment key={o} />;
        }
        if (
          (pathname.includes("paf") || pathname.includes("search")) &&
          o === "Delete"
        ) {
          return <Fragment key={o} />;
        }
        return (
          <option value={o} key={o}>
            {o}
          </option>
        );
      })}
    </select>
  );
};

export default AnimeOptions;
