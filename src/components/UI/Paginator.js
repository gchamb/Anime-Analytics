import classes from "./Paginator.module.css";


const Paginator = (props) => {
  let pageButtons = [<button key="current">{props.currentPage}</button>];
  if (props.currentPage === 1 && props.pages > props.currentPage) {
    pageButtons.push(
      <button onClick={props.nextPage} key="next">
        Next
      </button>
    );
  }
  if (props.currentPage >= props.pages && props.currentPage > 1) {
    pageButtons = [
      <button onClick={props.prevPage} key="prev">
        Prev
      </button>,
      <button key="current">{props.currentPage}</button>,
    ];
  }
  if (props.currentPage > 1 && props.pages > props.currentPage) {
    pageButtons = [
      <button onClick={props.prevPage} key="prev">
        Prev
      </button>,
      <button key="current">{props.currentPage}</button>,
      <button onClick={props.nextPage} key="next">
        Next
      </button>,
    ];
  }
  return <div className={classes.paginator}>{pageButtons}</div>;
};

export default Paginator;
