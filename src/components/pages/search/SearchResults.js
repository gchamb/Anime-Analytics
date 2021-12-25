import classes from "./SearchResults.module.css";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Error from "../../UI/Error";
import "../../../index.css";

const jikan = require("jikanjs");
const SearchResults = (props) => {
  const [animes, setAnimes] = useState(undefined);
  const [error, setError] = useState(false);
  const { result } = useParams();
  let content;

  useEffect(() => {
    const callSearch = async () => {
      try {
        const { results } = await jikan.search("anime", result);
        setAnimes(results);
      } catch (error) {
        setError(true);
        console.log("error searching");
      }
    };

    callSearch();
  }, [result]);

  if (animes === undefined) {
    content = <p className="centeredWhite">Loading...</p>;
  } else if (error === true) {
    console.log(true);
    content = <Error message="No Anime Found!" />;
  } else {
    content = (
      <ul className={classes.searchResults}>
        {animes.map((anime, idx) => {
          return (
            <Link
              className={classes.result}
              to={`/search/${result}/${anime.mal_id}`}
              key={idx}
            >
              <div className={classes.resultImg}>
                <img src={anime.image_url} alt="" />
              </div>
              <div className={classes.description}>
                <p>{anime.title}</p>
                <p>{anime.synopsis}</p>
              </div>
              <div className={classes.score}>
                <p>{anime.score}/10</p>
              </div>
            </Link>
          );
        })}
      </ul>
    );
  }

  return content;
};

export default SearchResults;
