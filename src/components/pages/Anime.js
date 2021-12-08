import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Anime = (props) => {
  const { id } = useParams();
  const [anime, setAnime] = useState();
  let animeContent;
  useEffect(() => {
    setAnime(props.animes[id]);
  }, [props.animes,id]);

  if (anime === undefined) {
    animeContent = <p>Loading...</p>;
  } else {
    animeContent = <h1>{anime.title}</h1>;
  }
  return animeContent;
};

export default Anime;
