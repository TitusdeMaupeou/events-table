import React, { useState, useEffect } from "react";
import { Paper, Grid } from "@material-ui/core";

function ItemPage({ match }) {
  useEffect(() => {
    fetchItem();
  }, []);

  const [item, setItem] = useState({
    images: [],
    priceRanges: [],
    promoter: [],
    seatmap: {}
  });

  const fetchItem = async () => {
    const data = await fetch(
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
        ? "Price range: " + i.min + " to " + i.max
        : "No prices available"}
    </p>
  ));

  return (
    <div className="container">
      <Paper className="item">
        <h1>{item.name}</h1>
        <hr></hr>
        {priceRanges}
        <p className="item__text">Promoter: {item.promoter.name}</p>
        <p className="item__text">
          {typeof item.info !== undefined
            ? "General Info: " + item.info
            : "No information available"}
        </p>
        <img className="item__img" src={item.seatmap.staticUrl}></img>
        {images[4]}
      </Paper>
    </div>
  );
}

export default ItemPage;
