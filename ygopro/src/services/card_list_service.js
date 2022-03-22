
async function getAllCards(num = 2, offset = 0, language = 'fr') {
	const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?num=${num}&offset=${offset}&language=${language}`);
	return await response.json();
}

export {getAllCards};
