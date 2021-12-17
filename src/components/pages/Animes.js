import { useEffect, useState } from "react";
import Paginator from "../UI/Paginator";
import classes from "./Animes.module.css";
import { Link, useHistory } from "react-router-dom";
import Error from "./Error";
import { pagesPerGenre, genreIds } from "../../utils/dicts";
import "../../index.css";

const jikan = require("jikanjs");
const ANIMES_PER_PAGE = 25;

const Animes = (props) => {
  // States and Variables
  const [animes, setAnimes] = useState(undefined);
  const [page, setPage] = useState(1);
  const [numOfPage, setNumOfPage] = useState(undefined);
  const [error, setError] = useState(false);
  const [randomClicked, setRandomClicked] = useState(false);
  const [episodeCount, setEpisodeCount] = useState({
    lessThan12: false,
    greaterThan12: false,
  });
  let animePageContent;
  const history = useHistory();

  // Will increment page count
  const incrementPage = () => {
    setPage((prevPage) => {
      return prevPage + 1;
    });
  };
  // Will decrement page count
  const decrementPage = () => {
    setPage((prevPage) => {
      return prevPage - 1;
    });
  };

  // Lift all the animes the parent component
  const liftState = () => {
    props.liftAnimes(animes);
  };

  // set random button clicked to true
  const randomAnime = () => {
    setRandomClicked(true);
  };

  // will keep track on if the user selected the episodes options
  const episodeChangeHandler = (event) => {
    const episodeChoice = event.target.value;

    if (episodeChoice === "12+ episodes") {
      setEpisodeCount({
        lessThan12: false,
        greaterThan12: true,
      });
    } else if (episodeChoice === "0-11 episodes") {
      setEpisodeCount({
        lessThan12: true,
        greaterThan12: false,
      });
    } else {
      setEpisodeCount({
        lessThan12: false,
        greaterThan12: false,
      });
    }
  };

  useEffect(() => {
    // get all of the anime from api than filter it
    const getAnimes = async () => {
      let getAnimes = []; // stores all animes in here from api

      // will get the anime with the smallest amount of pages to go through for the api
      const minPageInGenres = Math.min(
        pagesPerGenre[props.info.first],
        pagesPerGenre[props.info.second],
        pagesPerGenre[props.info.third]
      );

      let genreWithMinPages;
      // determine the anime with the smallest amount of pages
      if (pagesPerGenre[props.info.first] === minPageInGenres) {
        genreWithMinPages = props.info.first;
      } else if (pagesPerGenre[props.info.second] === minPageInGenres) {
        genreWithMinPages = props.info.second;
      } else {
        genreWithMinPages = props.info.third;
      }

      // loop through and places all anime in array
      for (let i = 1; i <= minPageInGenres; i++) {
        try {
          let { anime } = await jikan.loadGenre(
            "anime",
            genreIds[genreWithMinPages],
            i
          );
          getAnimes = getAnimes.concat(anime);
        } catch (error) {
          console.log("error happened here");
          setError(true);
          console.log(error);
        }
      }

      // filter animes based on genre
      getAnimes = getAnimes.filter((anime) => {
        const genres = JSON.stringify(anime.genres);
        if (genreWithMinPages === props.info.first) {
          return (
            genres.includes(props.info.second) &&
            genres.includes(props.info.third)
          );
        } else if (genreWithMinPages === props.info.second) {
          return (
            genres.includes(props.info.first) &&
            genres.includes(props.info.third)
          );
        }
        return (
          genres.includes(props.info.first) &&
          genres.includes(props.info.second)
        );
      });

      // set the state of filtered animes and number of animes
      if (getAnimes.length !== 0) {
        setAnimes(getAnimes);
        setNumOfPage(Math.floor(getAnimes.length / ANIMES_PER_PAGE));
      }
    };

    getAnimes();
  }, [props.info]);

  // Conditional Rendering
  if (animes === undefined) {
    animePageContent = <p className="centeredWhite">Loading Animes...</p>;
  } else if (animes !== undefined && animes.length === 0) {
    if (error) {
      animePageContent = <Error message="Anime Server is currently Down!" />;
    } else {
      animePageContent = <Error message="No Animes Found!" />;
    }
  } else {
    // Pagination
    let currentAnimes = [];
    let starting;
    let ending;
    if (page === 1) {
      starting = 0;
    } else {
      starting = page * ANIMES_PER_PAGE;
    }

    ending = starting + ANIMES_PER_PAGE;
    for (let i = starting; i < ending && i < animes.length; i++) {
      currentAnimes.push(animes[i]);
    }

    // Determining if any of the filters were triggered
    if (randomClicked) {
      const randomNumber = Math.ceil(Math.random() * animes.length);
      liftState();
      history.push(`/paf/animes/${randomNumber}`);
    }

    if (episodeCount.greaterThan12 === true) {
      currentAnimes = currentAnimes.filter((anime) => {
        return anime.episodes >= 12;
      });
    }
    if (episodeCount.lessThan12 === true) {
      currentAnimes = currentAnimes.filter((anime) => {
        return anime.episodes < 12;
      });
    }

    // render to the screen with appropriate animes
    animePageContent = (
      <div className={classes.animesFound}>
        <div className={classes.found}>
          <h2>{animes.length} Animes Found!</h2>
        </div>
        <div className={classes.filters}>
          <div className={classes.episodeCount}>
            <label>Episode Filter</label>
            <select onChange={episodeChangeHandler}>
              <option value="Normal">Normal</option>
              <option value="12+ episodes">12+ episodes</option>
              <option value="0-11 episodes">0-11 episodes</option>
            </select>
          </div>
          <div className={classes.selectRandom}>
            <button className="btn" onClick={randomAnime}>
              Random
            </button>
          </div>
        </div>
        <div className={classes.animes}>
          {currentAnimes.map((anime, idx) => {
            return (
              <div className={classes.anime} key={idx}>
                <Link to={`/paf/animes/${idx}`} onClick={liftState}>
                  <img src={anime.image_url} alt="anime" />
                  <p>{anime.title}</p>
                </Link>
              </div>
            );
          })}
        </div>
        <Paginator
          pages={numOfPage}
          currentPage={page}
          nextPage={incrementPage}
          prevPage={decrementPage}
        />
      </div>
    );
  }

  return animePageContent;
};

export default Animes;
