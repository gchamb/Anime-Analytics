import classes from "./AnimeLinks.module.css";
import { replaceAll } from "../../utils/dicts";

const AnimeLinks = (props) => {
  const anime = props.animeName;
  let planetAnime = "https://www.anime-planet.com/anime/all?name=";
  planetAnime = planetAnime + anime.replaceAll(" ", "%20");

  return (
    <div className={classes.animeLinks}>
      <a href={props.url}></a>
      <a href={planetAnime}></a>
    </div>
  );
};

export default AnimeLinks;
