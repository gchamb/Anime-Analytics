import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./Anime.module.css";
import AnimeLinks from "./AnimeLinks";

const Anime = (props) => {
  const { id } = useParams();
  const [anime, setAnime] = useState();
  let animeContent;
  useEffect(() => {
    console.log(props.animes[id]);
    setAnime(props.animes[id]);
  }, [props.animes, id]);

  if (anime === undefined) {
    animeContent = <p>Loading...</p>;
  } else {
    animeContent = (
      <div className={classes.animePage}>

        <div className={classes.animeCard}>
          <h1>{anime.title}</h1>;
          <div className={classes.animeCardImage}>
            <img src={anime.image_url} alt="" />
          </div>
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
  }
  return animeContent;
};

export default Anime;
