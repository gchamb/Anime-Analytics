import classes from "./Rating.module.css";
import "../../../index.css";
import { endpoints } from "../../../utils/util";
import { useContext, useEffect, useState } from "react";
import Paginator from "../../UI/Paginator";
import star0 from "../../../images/0 stars.png";
import star1 from "../../../images/1 stars.png";
import star2 from "../../../images/2 stars.png";
import star3 from "../../../images/3 stars.png";
import star4 from "../../../images/4 stars.png";
import star5 from "../../../images/5 stars.png";
import rate from "../../../images/ratings.png";
import authContext from "../../../context/auth-context";
import RateModal from "./RateModal";
import { Redirect } from "react-router-dom";
import Nav from "../../UI/Nav";

const axios = require("axios");
const Rating = (props) => {
  document.title = "Rating!";
  const [ratings, setRatings] = useState(undefined);
  const [error, setError] = useState(false);
  const [paginator, setPaginator] = useState({
    page: 1,
    numOfPages: undefined,
  });
  const [update, setUpdate] = useState({
    clicked: false,
    id: undefined,
    name: undefined,
    delete: false,
  });
  let content;
  const auth = useContext(authContext);

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
  const updateClicked = (e) => {
    const id = e.target.id.split(" ")[0];
    const ratingId = ratings[id].ratingId;
    setUpdate({
      clicked: true,
      id: ratingId,
      name: ratings[id].name,
      delete: false,
    });
  };
  const removeUpdateModal = () => {
    setUpdate({
      clicked: false,
      id: undefined,
      name: undefined,
      refresh: false,
    });
  };
  const deleteRating = async (e) => {
    const id = e.target.id.split(" ")[0];
    const ratingId = ratings[id].ratingId;

    await axios.delete(endpoints.rating.deletepatch + ratingId, {
      headers: { Authorization: "Bearer " + auth.token },
    });
    setUpdate((prev) => {
      return { ...prev, refresh: prev.refresh === true ? !prev.refresh : true };
    });
  };
  const submitRating = async (rating) => {
    await axios.patch(
      endpoints.rating.deletepatch + update.id,
      { rate: rating },
      {
        headers: { Authorization: "Bearer " + auth.token },
      }
    );
    setUpdate((prev) => {
      return {
        ...prev,
        refresh: prev.refresh === true ? !prev.refresh : true,
      };
    });
  };

  const getShareLink = async () => {
    const { data } = await axios.get(endpoints.rating.share, {
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    });

    navigator.clipboard.writeText(data.url);
    window.alert("Copied to Clipboard!");
  };
  useEffect(() => {
    const getRatings = async () => {
      try {
        const { data } = await axios.get(
          endpoints.rating.get + paginator.page,
          {
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          }
        );
        setRatings(data.ratings);
        setPaginator((prev) => {
          return {
            ...prev,
            numOfPages: data.pages,
          };
        });
      } catch (err) {
        setError(true);
      }
    };

    getRatings();
  }, [paginator.page, auth.token, update.refresh]);

  if (ratings === undefined && error === false) {
    content = <p className="centeredWhite">Loading...</p>;
  } else if (ratings !== undefined && ratings.length === 0 && error === false) {
    content = (
      <main className={classes.ratingsPage}>
        <Nav />
        <div className="heading">
          <div className={classes.animeRatingImg}>
            <img src={rate} alt="" />
          </div>
          <h2>Ratings</h2>
        </div>
        <div className={classes.ratingsContainer}>
          <h4 className="centeredWhite">No Ratings!</h4>
        </div>
      </main>
    );
  } else if (error) {
    return <Redirect to="/home" />;
  } else {
    content = (
      <main className={classes.ratingsPage}>
        {update.clicked && (
          <RateModal
            removeModal={removeUpdateModal}
            animeName={update.name}
            submitRating={submitRating}
            noUpdate={true}
          />
        )}
        <Nav />
        <div className="heading">
          <div className={classes.animeRatingImg}>
            <img src={rate} alt="" />
          </div>
          <h2>Ratings</h2>
          <button className="btnSmaller" onClick={getShareLink}>
            Share List
          </button>
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
                  <div className={classes.rateBtns}>
                    <button
                      className="btn3"
                      onClick={updateClicked}
                      id={`${idx} update`}
                    >
                      Update
                    </button>
                    <button
                      className="btn3"
                      onClick={deleteRating}
                      id={`${idx} delete`}
                    >
                      Delete
                    </button>
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

export default Rating;
