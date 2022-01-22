import { Fragment, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import classes from "./AnimeOptions.module.css";
import { endpoints } from "../../utils/util";
import authContext from "../../context/auth-context";
import RateModal from "../pages/ratings/RateModal";

const axios = require("axios");
const AnimeOptions = (props) => {
  let content;
  const options = [
    "Select Option",
    "Add to Watching",
    "Add to Plan To Watch",
    "Rate it",
    "Delete",
  ];
  const { pathname } = useLocation();
  const auth = useContext(authContext);
  const [rateClicked, setRateClicked] = useState(false);

  const removeRateModal = () => {
    setRateClicked(false);
  };
  const submitRating = async (rating) => {
    let animeData;
    const genres = props.anime.genres.map((a) => {
      return a.name;
    });
    if (props.location === "paf") {
      animeData = {
        rate: rating.rate,
        date: rating.date,
        name: props.anime.title,
        genres: genres,
        episodes: props.anime.episodes === null ? 0 : props.anime.episodes,
        yearReleased: props.anime.airing_start === null
            ? null
            : props.anime.airing_start.substring(0, 4),
        studio:
          props.anime.producers.length === 0
            ? null
            : props.anime.producers[0].name,
        imageUrl: props.anime.image_url,
      };
    } else if (props.location === "search") {
      animeData = {
        rate: rating.rate,
        date:rating.date,
        name: props.anime.title,
        genres: genres,
        episodes: props.anime.episodes === null ? 0 : props.anime.episodes,
        yearReleased:
          props.anime.aired.from === null
            ? null
            : props.anime.aired.from.substring(0, 4),
        studio:
          props.anime.studios.length === 0
            ? null
            : props.anime.studios[0].name,
        imageUrl: props.anime.image_url,
      };
    } else {
      animeData = { ...props.anime, rate: rating.rate, date:rating.date };
    }

    await axios.post(endpoints.rating.any, animeData, {
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    });

    window.alert(animeData.name + " has been added to your rating list!");
    if (props.location === "Watching" || props.location === "Plan To Watch") {
      props.optionClickedHandler(true);
    }
  };
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
        episodes: props.anime.episodes === null ? 0 : props.anime.episodes,
        yearReleased:
          props.anime.airing_start === null
            ? null
            : props.anime.airing_start.substring(0, 4),
        studio:
          props.anime.producers.length === 0
            ? null
            : props.anime.producers[0].name,
        imageUrl: props.anime.image_url,
      };
    } else if (props.location === "search") {
      animeData = {
        name: props.anime.title,
        genres: genres,
        episodes: props.anime.episodes === null ? 0 : props.anime.episodes,
        yearReleased:
          props.anime.aired.from === null
            ? null
            : props.anime.aired.from.substring(0, 4),
        studio:
          props.anime.studios.length === 0
            ? null
            : props.anime.studios[0].name,
        imageUrl: props.anime.image_url,
      };
    } else {
      animeData = { ...props.anime };
    }
 
    switch (option) {
      case "Add to Watching":
        await axios.post(endpoints.watching.any, animeData, {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        });
        window.alert(animeData.name + " has been added to your watching list!");
        break;
      case "Add to Plan To Watch":
        await axios.post(endpoints.plantowatch.any, animeData, {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        });
        window.alert(animeData.name + " has been added to your plan to watch list!");
        break;
      case "Rate it":
        setRateClicked(true);
        break;
      case "Delete":
        const option =
          props.location === "Watching"
            ? props.location.toLowerCase()
            : props.location.split(" ").join("").toLowerCase();
        let id = animeData.watchingId
          ? animeData.watchingId
          : animeData.planToWatchId;
        await axios.delete(endpoints[option].delete + id, {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        });
        window.alert(animeData.name + " has been deleted!");
        break;
      default:
        console.log("error");
    }
    if (props.location === "Watching" || props.location === "Plan To Watch") {
      props.optionClickedHandler(true);
    }
  };
  if (rateClicked) {
    content = (
      <RateModal
        removeModal={removeRateModal}
        animeName={props.anime.name ? props.anime.name : props.anime.title}
        submitRating={submitRating}
      />
    );
  } else {
    content = (
      <select
        className={props.class === undefined ? classes.selector : props.class}
        onChange={optionChangeHandler}
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
  }
  return content;
};

export default AnimeOptions;
