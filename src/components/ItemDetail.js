import React, { useState, useEffect } from "react";
import { Paper, Grid} from "@material-ui/core";

function ItemPage({ match }) {
  useEffect(() => {
    fetchItem();
  }, []);

  const [item, setItem] = useState({
    images: [],
    priceRanges: [],
    promoter: [],
    seatmap: {},
    sales: []
  });

  const fetchItem = async () => {
    await fetch(
      `https://app.ticketmaster.com/discovery/v2/events/${match.params.table_id}?apikey=3ofV0pnHEKQLOpEUzPvMmDkW2vzJOGJd`
    )
      .then(resp => resp.json())
      .then(function(d) {
        setItem(d);
      });
  };

  const images = item.images.map(i => (
    <img className="item__img" src={i.url}></img>
  ));

  const priceRanges = item.priceRanges.map(i => (
    <p className="item__text">
      {typeof i !== undefined
        ? i.min + " to " + i.max + " USD"
        : "No prices available"}
    </p>
  ));

  return (
    <div className="container">
      <Paper className="item">
        <h1>{item.name}</h1>
        <hr></hr>
        <img className="item__img" src={item.seatmap.staticUrl}></img>
        {images[4]}
        <h2>Price Ranges</h2>
        {priceRanges}
        <h2>Promoter</h2>
        <p className="item__text">{item.promoter.name}</p>
        <h2>Description</h2>
        <p className="item__text">
          {item.info === undefined
            ? "No information available"
            : "General Info: " + item.info}
        </p>
        <h2>Start sales</h2>
        <p className="item__text">
          {
            Object.values(item.sales).map(i => {
              return i.startDateTime + " until " + i.endDateTime;
            })
          }
        </p>
      </Paper>
    </div>
  );
}

export default ItemPage;
