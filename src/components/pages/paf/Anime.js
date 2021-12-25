import { useParams } from "react-router-dom";
import classes from "./Anime.module.css";
import AnimeLinks from "./AnimeLinks";
import Error from "../../UI/Error";
import AnimeOptions from "../../UI/AnimeOptions";
import "../../../index.css";
const Anime = (props) => {
  const { id } = useParams();
  if (props.animes === undefined) {
    return <Error message="No Anime Found!" />;
  }
  const anime = props.animes[id];
  if (anime === undefined) {
    return <Error message="No Anime Found!" />;
  }
  return (
    <div className={classes.animePage}>
      <div className={classes.animeCard}>
        <h1>{anime.title}</h1>
        <div className={classes.animeCardImage}>
          <img src={anime.image_url} alt="" />
        </div>
        <AnimeOptions class="selectorContainer" anime={anime} location="paf"/>
      </div>

      <div className={classes.animeDetails}>
        <div>
          <span>{anime.score}/10</span>
        </div>
        <div>
          <p>{anime.synopsis}</p>
        </div>
      </div>

      <AnimeLinks animeName={anime.title} url={anime.url} />
    </div>
  );
};

export default Anime;
