class Ygo {
	tableRows = 0;
	cards = [];
}

class Card {
	// id
	id = 0;
	// name
	name = '';
	// type
	type = '';
	// desc
	description = '';
	// race
	race = '';
	// card_images[0].image_url
	imageMedium = '';
	// card_images[0].image_url_small
	imageSmall = '';
	// card_prices[0].cardmarket_price
	cardmarketPrice = '';
}

function toModel(json) {
	const ygo = new Ygo();
	ygo.tableRows = json['meta'] ? json['meta']['total_rows'] : '';
	const listCards = json['data'];
	ygo.cards = listCards.map(obj => {
		const card = new Card();
		card.id = obj['id'] ?? '';
		card.name = obj['name'] ?? '';
		card.type = obj['type'] ?? '';
		card.description = obj['desc'] ?? '';
		card.race = obj['race'] ?? '';
		const cardImages = obj['card_images'] ?? [];
		const cardPrices = obj['card_prices'] ?? [];
		if (cardImages.length > 0) {
			card.imageMedium = cardImages[0]['image_url'] ?? '';
			card.imageSmall = cardImages[0]['image_url_small'] ?? '';
		}
		if (cardPrices.length > 0){
			card.cardmarketPrice = cardPrices[0]['cardmarket_price'] ?? '';
		}

		return card;
	});
	return ygo;
}

export {toModel, Card, Ygo};
