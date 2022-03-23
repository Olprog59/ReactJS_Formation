import React, {Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {findById} from "../../services/card_list_service";
import {Card, toModel} from "../../models/card_model";

const CardDesc = () => {

	const {idCard} = useParams();
	const [card, setCard] = useState(new Card());

	useEffect(() => {
		findById(idCard)
			.then(obj => {
				const cards = toModel(obj).cards;
				if (cards.length > 0) {
					setCard(cards[0]);
				}
			})
	}, [])

	return (
		<div>
			{card &&
				<Fragment>
					<p>{card.name}</p>
					<p>type : {card.type}</p>
					<p>race : {card.race}</p>
					<p>{card.description}</p>
					<img src={card.imageMedium} alt=""/>
					<p>prix : {card.cardmarketPrice}</p>
				</Fragment>
			}
		</div>
	)
}

export default CardDesc;
