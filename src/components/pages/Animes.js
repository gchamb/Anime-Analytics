import { useEffect, useState } from "react";
import Paginator from "../UI/Paginator";
import classes from "./Animes.module.css";

const jikan = require("jikanjs");

const pagesPerGenre = {
  Action: 40,
  Adventure: 32,
  Cars: 2,
  Comedy: 64,
  "Avant Garde": 6,
  Demons: 6,
  Drama: 28,
  Ecchi: 8,
  Fantasy: 36,
  Game: 5,
  Harem: 5,
  Hentai: 14,
  Historical: 13,
  Horror: 5,
  Josei: 1,
  Kids: 35,
  "Martial Arts": 5,
  Mecha: 12,
  Military: 6,
  Music: 25,
  Mystery: 8,
  Parody: 7,
  Police: 3,
  Psychological: 4,
  Romance: 20,
  Samurai: 3,
  School: 18,
  "Sci-Fi": 27,
  Seinen: 9,
  Shoujo: 7,
  Shonen: 20,
  "Slice of Life": 21,
  Space: 6,
  Sports: 8,
  "Super Power": 7,
  Supernatural: 26,
  Vampire: 2,
};

const Animes = (props) => {
  const [animes, setAnimes] = useState([]);
  const [page, setPage] = useState(1);

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

  useEffect(() => {
      console.log(props)
    const getAnimes = async () => {
      let matchedAnimes = [];
      for (let i = 1; i <= pagesPerGenre[props.info.first]; i++) {
             try {
               let { anime } = await jikan.loadGenre(
                 "anime",
                 props.info.firstGenreId,
                 i
               );
               anime = anime.filter((anime) => {
                 const genres = JSON.stringify(anime.genres); // Stringify the genres of the anime
                 return (
                   genres.includes(props.info.second) &&
                   genres.includes(props.info.third)
                 );
               });
               matchedAnimes = matchedAnimes.concat(anime);
             } catch (error) {
               console.log(error);
             }
      }
      console.log(matchedAnimes);
      setAnimes(matchedAnimes);
    };

    getAnimes();
  }, [props]);

  return (
    <div className={classes.animesFound}>
      <div className={classes.animes}>
        {animes.map((anime,idx) => {
          return (
            <div className={classes.anime} key={idx}>
              <img src={anime.image_url} alt="anime" />
            </div>
          );
        })}
      </div>
      <Paginator />
    </div>
  );
};

export default Animes;
