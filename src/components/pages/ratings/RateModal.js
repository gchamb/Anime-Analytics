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
  const [rating, setRating] = useState(0);
  const stars = [];

  function starChangeHandler(e) {
    const rating = e.target.id;
    setRating(rating);
  }
  function submitRatingHanlder() {
    props.removeModal();
    props.submitRating(+rating);
  }
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
