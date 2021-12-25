import { useParams } from "react-router-dom";

import classes from "./SearchedAnime.module.css";
import AnimeLinks from "../paf/AnimeLinks";
import Error from "../../UI/Error";
import AnimeOptions from "../../UI/AnimeOptions";
import "../../../index.css";
import { useEffect, useState } from "react";

const jikan = require("jikanjs");
const SearchedAnime = (props) => {
  const { id } = useParams();
  const [anime, setAnime] = useState();
  const [error, setError] = useState(false);
  let content;

  useEffect(() => {
    const loadAnime = async () => {
      try {
        const getAnime = await jikan.loadAnime(+id);
        setAnime(getAnime);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    };
    loadAnime();
  }, [id]);

  if (error) {
    return <Error message="No Anime Found!" />;
  }
  if (anime === undefined) {
    content = <p className="centeredWhite">Loading</p>;
  } else {
    content = (
      <div className={classes.animePage}>
        <div className={classes.animeCard}>
          <h1>{anime.title}</h1>
          <div className={classes.animeCardImage}>
            <img src={anime.image_url} alt="" />
          </div>
          <AnimeOptions class="selectorContainer" anime={anime} location="search"/>
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
  return content;
};

export default SearchedAnime;
