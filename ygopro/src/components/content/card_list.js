import React, {Fragment, useEffect, useState} from "react";
import CardOne from "./card_one";
import {getAllCards, searchAllCards} from "../../services/card_list_service";
import {toModel} from "../../models/card_model";
import '../../assets/css/card_list.css';

const CardList = () => {

	const [cardList, setCardList] = useState([]);
	const [numberCard, setNumberCard] = useState(10);
	const [orderCard, setOrderCard] = useState('new');
	const [searchCard, setSearchCard] = useState('');

	useEffect(() => {
		if (searchCard) {
			searchAllCards(searchCard, numberCard, orderCard)
				.then(json => {
					setCardList(toModel(json).cards);
				})
		} else {
			getAllCards(numberCard, orderCard)
				.then(json => {
					setCardList(toModel(json).cards);
				})
		}
	}, [numberCard, orderCard, searchCard]);

	const handleChange = (e) => {
		setNumberCard(e.target.value);
	}

	return (
		<Fragment>
			<div className="info">
				<select onChange={handleChange} defaultValue={numberCard}>
					<option value="10">10</option>
					<option value="25">25</option>
					<option value="50">50</option>
					<option value="100">100</option>
				</select>

				<select defaultValue={orderCard} onChange={ev => {
					setOrderCard(ev.target.value)
				}}>
					<option value="atk">atk</option>
					<option value="def">def</option>
					<option value="name">name</option>
					<option value="type">type</option>
					<option value="level">level</option>
					<option value="id">id</option>
					<option value="new">new</option>
				</select>

				<input type="search" placeholder="Search" onChange={e => {
					// setSearchCard(prevState => prevState = e.target.value);
					setSearchCard(e.target.value);
				}}/>

			</div>
			<section>
				{
					cardList &&
					cardList.map(c => <CardOne key={c.id} card={c}/>)
				}
			</section>
		</Fragment>
	);
};

export default CardList;
