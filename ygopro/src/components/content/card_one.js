import React from "react";

const CardOne = (props) => {

	return (
		<article id={props.card.id}>
			<h4>{props.card.name}</h4>
			<div>
				<p>{props.card.type}</p>
				<p>{props.card.race}</p>
			</div>
			<img src={props.card.imageSmall} alt={props.card.name} />
		</article>
	)
}

export default CardOne;
