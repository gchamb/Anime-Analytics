import { useEffect, useState } from "react";
import Paginator from "../UI/Paginator";
import classes from "./Animes.module.css";
import { Link, Redirect } from "react-router-dom";
import Error from "./Error";
import { pagesPerGenre, genreIds } from "../../utils/dicts";
import "../../index.css";

const jikan = require("jikanjs");
const ANIMES_PER_PAGE = 25;

const Animes = (props) => {
  if (props.info === undefined) {
    <Redirect to="/"></Redirect>;
  }

  const [animes, setAnimes] = useState(undefined);
  const [page, setPage] = useState(1);
  const [numOfPage, setNumOfPage] = useState(undefined);
  const [error, setError] = useState(false);
  let animePageContent;

  const changeCurrentPage = (page) => {
    setPage(page);
  };
  const incrementPage = () => {
    setPage((prevPage) => {
      return prevPage + 1;
    });
  };

  const decrementPage = () => {
    setPage((prevPage) => {
      return prevPage - 1;
    });
  };

  const liftState = () => {
    props.liftAnimes(animes);
  };

  useEffect(() => {
    const getAnimes = async () => {
      let getAnimes = [];
      const minPageInGenres = Math.min(
        pagesPerGenre[props.info.first],
        pagesPerGenre[props.info.second],
        pagesPerGenre[props.info.third]
      );

      let genreWithMinPages;
      if (pagesPerGenre[props.info.first] === minPageInGenres) {
        genreWithMinPages = props.info.first;
      } else if (pagesPerGenre[props.info.second] === minPageInGenres) {
        genreWithMinPages = props.info.second;
      } else {
        genreWithMinPages = props.info.third;
      }
      console.log(props.info, genreWithMinPages, genreIds);
      for (let i = 1; i <= minPageInGenres; i++) {
        try {
          let { anime } = await jikan.loadGenre(
            "anime",
            genreIds[genreWithMinPages],
            i
          );
          getAnimes = getAnimes.concat(anime);
        } catch (error) {
          setError(true);
          console.log(error);
        }
      }

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
      setAnimes(getAnimes);
      setNumOfPage(Math.floor(getAnimes.length / ANIMES_PER_PAGE));
      console.log(Math.floor(getAnimes.length / ANIMES_PER_PAGE));
    };

    getAnimes();
  }, [props.info]);

  if (animes === undefined) {
    animePageContent = <p className="centeredWhite">Loading Animes...</p>;
  } else if (animes !== undefined && animes.length === 0) {
    if (error) {
      animePageContent = <Error message="Anime Server is currently Down!" />;
    } else {
      animePageContent = <Error message="No Animes Found!" />;
    }
  } else {
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

    animePageContent = (
      <div className={classes.animesFound}>
        <div className={classes.found}>
          <h2>{animes.length} Animes Found!</h2>
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
          changePage={changeCurrentPage}
          nextPage={incrementPage}
          prevPage={decrementPage}
        />
      </div>
    );
  }

  return animePageContent;
};

export default Animes;
