import { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import Paginator from "../../UI/Paginator";
import { endpoints } from "../../../utils/util";
import classes from "./ShareRating.module.css";
import "../../../index.css";
import star0 from "../../../images/0 stars.png";
import star1 from "../../../images/1 stars.png";
import star2 from "../../../images/2 stars.png";
import star3 from "../../../images/3 stars.png";
import star4 from "../../../images/4 stars.png";
import star5 from "../../../images/5 stars.png";
import rate from "../../../images/ratings.png";

const axios = require("axios");
const ShareRating = () => {
  document.title = "Shared!";
  const params = useParams();
  const [ratings, setRatings] = useState(undefined);
  const [paginator, setPaginator] = useState({
    page: 1,
    numOfPages: undefined,
  });
  const [error, setError] = useState(false);
  let content;

  const nextPage = () => {
    setPaginator((preValue) => {
      return { page: preValue.page + 1, numOfPages: preValue.numOfPages };
    });
  };
  const prevPage = () => {
    setPaginator((preValue) => {
      return { page: preValue.page - 1, numOfPages: preValue.numOfPages };
    });
  };
  useEffect(() => {
    const getRating = async () => {
      try {
        const { data } = await axios.get(
          endpoints.rating.shared + `${params.token}&page=${paginator.page}`
        );
        setRatings(data.ratings);
        setPaginator((prev) => {
          return {
            ...prev,
            numOfPages: data.pages,
          };
        });
      } catch (error) {
        setError(true);
      }
    };

    getRating();
  }, [paginator.page, params.token]);
  if (ratings === undefined && error === false) {
    content = <p className="centeredWhite">Loading...</p>;
  } else if (error) {
    return <Redirect to="/login" />;
  } else {
    content = (
      <main className={classes.ratingsPage}>
        <div className="heading">
          <div className={classes.animeRatingImg}>
            <img src={rate} alt="" />
          </div>
          <h2>Ratings</h2>
        </div>
        <div className={classes.ratingsContainer}>
          <div className={classes.ratings}>
            {ratings.map((rate, idx) => {
              return (
                <div className={classes.rating} key={idx}>
                  <div className={classes.rateImg}>
                    <img src={rate.imageUrl} alt="" />
                  </div>
                  <div className={classes.animeName}>
                    <h2>{rate.name}</h2>
                  </div>
                  <div className={classes.rate}>
                    {rate.rate === 0 && <img src={star0} alt="" />}
                    {rate.rate === 1 && <img src={star1} alt="" />}
                    {rate.rate === 2 && <img src={star2} alt="" />}
                    {rate.rate === 3 && <img src={star3} alt="" />}
                    {rate.rate === 4 && <img src={star4} alt="" />}
                    {rate.rate === 5 && <img src={star5} alt="" />}
                  </div>
                </div>
              );
            })}
          </div>
          <Paginator
            currentPage={paginator.page}
            pages={paginator.numOfPages}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        </div>
      </main>
    );
  }

  return content;
};

export default ShareRating;
