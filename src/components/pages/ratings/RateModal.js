import classes from "./RateModal.module.css";
import "../../../index.css";
import { useState, Fragment } from "react";
import empty from "../../../images/empty star.png";
import filled from "../../../images/filled star.png";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div className={classes.backdrop}></div>;
};

const ModalOverlay = (props) => {
  return <div className={classes.modal}>{props.children}</div>;
};

const RateModal = (props) => {
  const currentDate = new Date();
  const yyyy = currentDate.getFullYear();
  let mm = currentDate.getMonth() + 1; // Months start at 0!
  let dd = currentDate.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const today = yyyy + "-" + mm + "-" + dd;
  const [rating, setRating] = useState(0);
  const [date, setDate] = useState(today);
  const stars = [];

  function starChangeHandler(e) {
    const rating = e.target.id;
    setRating(rating);
  }
  function dateChangeHandler(e) {
    setDate(e.target.value);
  }
  function submitRatingHanlder() {
    const rate = {
      rate: +rating,
      date: date,
    };
    props.removeModal();
    props.submitRating(rate);
  }
  console.log(date);
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <div className={classes.star} key={i}>
          <img src={filled} alt="" onMouseOver={starChangeHandler} id={i} />
        </div>
      );
    } else {
      stars.push(
        <div className={classes.star} key={i}>
          <img src={empty} alt="" onMouseOver={starChangeHandler} id={i} />
        </div>
      );
    }
  }
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, document.getElementById("overlays"))}
      {ReactDOM.createPortal(
        <ModalOverlay>
          <div className={classes.title}>
            <h2>{props.animeName}</h2>
          </div>
          <div className={classes.rating}>{stars}</div>
          {!props.noUpdate && (
            <div>
              <input
                type="date"
                value={date}
                onChange={dateChangeHandler}
                className={classes.date}
                max={today}
              />
            </div>
          )}

          <div className={classes.buttons}>
            <button onClick={props.removeModal} className="btn2">
              Close
            </button>
            <button onClick={submitRatingHanlder} className="btn2">
              Submit Rating
            </button>
          </div>
        </ModalOverlay>,
        document.getElementById("overlays")
      )}
    </Fragment>
  );
};

export default RateModal;
