import classes from "./Stats.module.css";
import "../../../index.css";
import stats from "../../../images/stats.png";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import RadarChart from "./RadarChart";
import { useContext, useEffect, useState } from "react";
import authContext from "../../../context/auth-context";
import { endpoints } from "../../../utils/util";

const axios = require("axios");
const Stats = () => {
  document.title = "Stats!";
  const [data, setData] = useState();
  const [statYear, setStatYear] = useState(null);
  const [years, setYears] = useState([]);
  const auth = useContext(authContext);
  let content;
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(endpoints.stat + statYear, {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      });
      setData(data);
      if (statYear === null) {
        setYears(data.years);
      }
    };
    getData();
  }, [auth.token, statYear]);

  const statYearHandler = (e) => {
    if (e.target.value === "All"){
      setStatYear(null)
      return;
    }
    setStatYear(e.target.value);
  };

  if (data === undefined) {
    content = <p className="centeredWhite">Loading...</p>;
  } else if (data.data) {
    content = (
      <main className={classes.stats}>
        <div className="heading">
          <div className={classes.animeStatsImg}>
            <img src={stats} alt="" />
          </div>
          <h2>Stats!</h2>
        </div>
        <h4 className="centeredWhite">No Data Yet!</h4>
      </main>
    );
  } else {
    content = (
      <main className={classes.stats}>
        <div className="heading">
          <div className={classes.animeStatsImg}>
            <img src={stats} alt="" />
          </div>
          <h2>Stats!</h2>
        </div>
        <div className={classes.years}>
          <select onChange={statYearHandler}>
            <option>All</option>
            {years.length > 0 &&
              years.sort().map((year,idx) => {
                return <option key={idx}>{year}</option>;
              })}
          </select>
        </div>
        <div className={classes.charts}>
          <div className={classes.chart}>
            <BarChart
              titleText="Animes Per Month"
              dataLabels={[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ]}
              data={Object.values(data.bar.animesPerMonth)}
            />
          </div>
          <div className={classes.chart}>
            <BarChart
              titleText="Animes Per Star Rating"
              dataLabels={Object.keys(data.bar.animesPerStar)}
              data={Object.values(data.bar.animesPerStar)}
            />
          </div>
          <div className={classes.chart}>
            <BarChart
              titleText="Animes Per Release Year"
              dataLabels={Object.keys(data.bar.animesPerRelease)}
              data={Object.values(data.bar.animesPerRelease)}
            />
          </div>
        </div>
        <div className={classes.charts}>
          <div className={classes.chart}>
            <PieChart
              titleText="Top Genres"
              dataLabels={Object.keys(data.pie.topGenre)}
              data={Object.values(data.pie.topGenre)}
            />
          </div>
          <div className={classes.chart}>
            <PieChart
              titleText="Top Studios"
              dataLabels={Object.keys(data.pie.topStudios)}
              data={Object.values(data.pie.topStudios)}
            />
          </div>
          <div className={classes.chart}>
            <LineChart
              titleText="Episodes Watched vs Animes Watched"
              dataLabels={[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ]}
              dataOne={Object.values(data.bar.animesPerMonth)}
              dataOneLabel="Animes Per Month"
              dataTwo={Object.values(
                data.line.episodesVsAmount.episodesPerMonth
              )}
              dataTwoLabel="Episodes Per Month"
            />
          </div>
        </div>
        <div className={classes.charts}>
          <div className={classes.chart}>
            <RadarChart
              titleText="Top Genres"
              dataLabels={Object.keys(data.radar.topGenre)}
              data={Object.values(data.radar.topGenre)}
            />
          </div>
        </div>
      </main>
    );
  }
  return content;
};

export default Stats;
