import classes from "./AnimeLinks.module.css";
// import { replaceAll } from "../../utils/dicts";
import mal from "../../images/mal.png";
import planet from "../../images/planetAnime.png";

const AnimeLinks = (props) => {
  const anime = props.animeName;
  let planetAnime = "https://www.anime-planet.com/anime/all?name=";
  planetAnime = planetAnime + anime.replaceAll(" ", "%20");

  return (
    <div className={classes.animeLinks}>
      <a href={props.url} target="_blank" rel="noreferrer">
        <img src={mal} alt="" />
      </a>
      <a href={planetAnime} target="_blank" rel="noreferrer">
        <img src={planet} alt="" />
      </a>
    </div>
  );
};

export default AnimeLinks;
