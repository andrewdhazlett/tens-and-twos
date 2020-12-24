// yuck
const getShuffledDeck = () => {
	function shuffle(a) {
	    for (let i = a.length - 1; i > 0; i--) {
	        const j = Math.floor(Math.random() * (i + 1));
	        [a[i], a[j]] = [a[j], a[i]];
	    }
	    return a;
	}
	let deck: Array<{
		id: string;
		rank: string;
		suit: string;
	}> = []
	let suit = `S`
	for (let i=1; i<14; i++){
		let rank = i
		let displayRank = `${i}`;
		if (rank === 1) displayRank = `A`
		if (rank === 11) displayRank = `J`
		if (rank === 12) displayRank = `Q`
		if (rank === 13) displayRank = `K`
		deck.push({
			id:`${suit}_${displayRank}`,
			suit,
			rank: `${rank}`
		})
	}
	suit = `H`
	for (let i=1; i<14; i++){
		let rank = i
		let displayRank = `${i}`;
		if (rank === 1) displayRank = `A`
		if (rank === 11) displayRank = `J`
		if (rank === 12) displayRank = `Q`
		if (rank === 13) displayRank = `K`
		deck.push({
			id:`${suit}_${displayRank}`,
			suit,
			rank: `${rank}`
		})
	}
	suit = `C`
	for (let i=1; i<14; i++){
		let rank = i
		let displayRank = `${i}`;
		if (rank === 1) displayRank = `A`
		if (rank === 11) displayRank = `J`
		if (rank === 12) displayRank = `Q`
		if (rank === 13) displayRank = `K`
		deck.push({
			id:`${suit}_${displayRank}`,
			suit,
			rank: `${rank}`
		})
	}
	suit = `D`
	for (let i=1; i<14; i++){
		let rank = i
		let displayRank = `${i}`;
		if (rank === 1) displayRank = `A`
		if (rank === 11) displayRank = `J`
		if (rank === 12) displayRank = `Q`
		if (rank === 13) displayRank = `K`
		deck.push({
			id:`${suit}_${displayRank}`,
			suit,
			rank: `${rank}`
		})
	}
	return shuffle(deck)
}

export { getShuffledDeck }
