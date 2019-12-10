import React, {useState, useEffect } from 'react';
import {Paper, Grid} from '@material-ui/core';

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
			const data = await fetch (
				`https://app.ticketmaster.com/discovery/v2/events/${match.params.table_id}?apikey=3ofV0pnHEKQLOpEUzPvMmDkW2vzJOGJd`
			).then((resp) => resp.json())
			.then(function(d) {
				console.log(d)
				setItem(d);
			})
		}

	const images = item.images.map((i) =>
     <img className="item__img" src={i.url}></img> 
	);

	const priceRanges = item.priceRanges.map((i) =>
		<p>Price range: {i.min} to {i.max} {i.currency}</p>
	);

	return (
		<div className="container">
			<Paper className="item">
				<h1>{item.name}</h1>
				{priceRanges}
				<p>Promoter: {item.promoter.name}</p>
				<p>General Info: {item.info}</p>
				<img className="item__img" src={item.seatmap.staticUrl}></img>
				{/* {typeof(priceRanges) !== undefined ? {priceRanges} : "There are no prices available"} */}
				{images[4]}
			</Paper>
		</div>
	)
}



export default ItemPage;