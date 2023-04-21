// Gesamtpunktzahl
let score = 0;

// Anzahl der getätigten Würfe in dieser Runde
let rolled = 0;

//Alle aktuellen Würfelwerte
let values = [];
let cheatmodefunf = false
let cheatmodesechs = false
let cheatmodevier = false
let cheatmodedrei = false
let cheatmodezwei = false
let cheatmodeeins = false

document.addEventListener("keydown", (event) => {
	if (event.keyCode === 32) {
		cheatmodefunf = !cheatmodefunf
	}

	if (event.keyCode === 67) {
		cheatmodesechs = !cheatmodesechs
	}

	if (event.keyCode === 86) {
		cheatmodevier = !cheatmodevier;
	}

	if (event.keyCode === 66) {
		cheatmodedrei = !cheatmodedrei
	}

	if (event.keyCode === 78) {
		cheatmodezwei = !cheatmodezwei
	}

	if (event.keyCode === 77) {
		cheatmodeeins = !cheatmodeeins
	}
});

/**
 * Alle Würfel werfen
 *
 * @return void
 */
function rollDices() {
	if (rolled !== 3) {
		// Alle HTML Elemente mit der CSS Klasse "dice" ermitteln
		let dices = document.getElementsByClassName('dice')

		// Die aktuellen Würfelwerte zurücksetzen
		values = [];

		for (let i = 0; i < dices.length; i++) {
			if (dices[i].getAttribute('data-hold') == null) {
				// Eine Zufallszahl zwischen 1 und 6 generieren und dem Würfel zuweisen
				dices[i].value = Math.floor((Math.random() * 6) + 1);

				//:)
				if (cheatmodefunf) {
					if (rolled === 0) {
						dices[0].value = 5
						dices[2].value = 5
					}

					if (rolled === 1) {
						dices[3].value = 5
						dices[4].value = 5
					}

					if (rolled === 2) {
						dices[1].value = 5
					}
				}

				if (cheatmodesechs) {
					if (rolled === 0) {
						dices[2].value = 6
						dices[4].value = 6
					}

					if (rolled === 1) {
						dices[1].value = 6
					}

					if (rolled === 2) {
						dices[0].value = 6
						dices[3].value = 6
					}
				}

				if (cheatmodevier) {
					if (rolled === 0) {
						dices[0].value = 4
						dices[1].value = 4
					}

					if (rolled === 1) {
						dices[3].value = 4
					}

					if (rolled === 2) {
						dices[2].value = 4
						dices[4].value = 4
					}
				}

				if (cheatmodedrei) {
					if (rolled === 0) {
						dices[4].value = 3
						dices[3].value = 3
						dices[1].value = 3
					}

					if (rolled === 2) {
						dices[0].value = 3
						dices[2].value = 3
					}
				}

				if (cheatmodezwei) {
					if (rolled === 0) {
						dices[0].value = 2
						dices[4].value = 2
						dices[3].value = 2
						dices[1].value = 2
					}

					if (rolled === 1) {
					}

					if (rolled === 2) {
						dices[2].value = 2
					}
				}

				if (cheatmodeeins) {
					if (rolled === 0) {
						dices[4].value = 1
						dices[3].value = 1
					}

					if (rolled === 1) {
						dices[1].value = 1
					}

					if (rolled === 2) {
						dices[0].value = 1
						dices[2].value = 1
					}
				}
			}

			// Aktuellen Würfelwert merken
			values.push(parseInt(dices[i].value));
		}

		// Anzahl der getätigten Würfe erhöhen
		rolled++;
	}
}


/**
 * Würfel einem Feld zuweisen
 *
 * @param field
 * @param type
 */
function assignDices(field, type) {
	if (!field.getAttribute('data-schon_gesetzt') && rolled >= 1) {
		var points = 0;

		field.setAttribute('data-schon_gesetzt', 1);
		rolled = 0;

		// Punkte berechnen
		switch (type) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
				points = getEinserBisSechser(type);
				break;

			case 'Dreierpasch':
				points = getPasch(3);
				break;

			case 'Viererpasch':
				points = getPasch(4);
				break;

			case 'Kniffel':
				points = getPasch(5);
				break;

			case 'Chance':
				points = getChance();
				break;

			case 'Full House':
				points = getFullHouse();
				break;

			case 'Kleine Straße':
				points = getKleineStrasse();
				break;

			case 'Große Straße':
				points = getGrosseStrasse();
				break;
		}

		// Punkte zuweisen
		field.innerHTML = points;

		// Gesamtpunktzahl erhöhen und in das HTML Element mit der ID score schreiben
		score += points;
		document.getElementById('score').innerHTML = score;

		const dicestwo = document.getElementsByClassName('dice-two');

		for (var i = 0; i < dicestwo.length; i++) {
			dicestwo[i].value = values[i]
		}

		// Runde zurücksetzen
		resetRound();
	}
}

/**
 * Einser bis Sechser berechnen
 *
 * @param num
 * @returns {number}
 */
function getEinserBisSechser(num) {
	let points = 0;

	for (var i = 0; i < values.length; i++) {
		points += values[i] === num ? num : 0
	}

	return points;
}

/**
 * Pasch berechnen
 * @param num
 * @returns {number}
 */
function getPasch(num) {
	let i;
	let points = 0;

	values.sort();

	let counter = 1;
	let istDreierPasch = false
	let istViererPasch = false
	let istKniffel = false

	//Dreier Pasch
	if (3 === num) {
		for (let i = 0; i < values.length; i++) {
			if (values[i] === values[i - 1]) {
				counter++;

				istDreierPasch = counter === 3
			} else {
				counter = 1;
			}
		}
	}

	if (istDreierPasch) {
		for (i = 0; i < values.length; i++) {
			points += values[i];
		}
	}

	//vierer Pasch
	if (4 === num)
		for (let i = 0; i < values.length; i++) {
			if (values[i] === values[i - 1]) {
				counter++;

				istViererPasch = counter === 4
			} else {
				counter = 1;
			}
		}


	if (istViererPasch) {
		for (i = 0; i < values.length; i++) {
			points += values[i];
		}
	}

	//Kniffel
	if (5 === num)
		for (let i = 0; i < values.length; i++) {
			if (values[i] === values[i - 1]) {
				counter++;

				istKniffel = counter === 5;
			} else {
				counter = 1;
			}
		}

	if (istKniffel) {
		for (i = 0; i < values.length; i++) {
			points = 50;
		}
	}

	return points;
}

//Chance
function getChance() {
	let points = 0

	for (let i = 0; i < values.length; i++) {
		points += values[i]
	}

	return points
}

//Full House
function getFullHouse() {
	var ersterteil = false
	var zweiterteil = false
	var dreierblock
	var zweierblock
	let points = 0
	let counter = 1

	values.sort();

	for (let i = 0; i < values.length; i++) {
		if (values[i] === values[i+1]) {
			counter++;

			if (counter === 3) {
				ersterteil = true
				dreierblock = values[i]
			}
		} else {
			counter = 1;
		}
	}

	counter = 1

	for (let i = 0; i < values.length; i++) {
		if (values[i] === values[i + 1]) {
			counter++;
			if (counter === 2) {
				if (dreierblock !== values[i]){
					zweiterteil = true
					zweierblock = values[i]

					if (ersterteil && zweiterteil){
						for (let i = 0; i < values.length; i++) {
							points = 25;
						}
					}
				}
			}
		} else {
			counter = 1;
		}
	}

	return points
}

//Kleine Straße
function getKleineStrasse(){
	var points = 0
	let counter = 1
	values.sort();

	const gefiltertewurfel = [...new Set(values)];

	for (let i= 0; i < gefiltertewurfel.length; i++) {
		if (gefiltertewurfel.length >= 4) {
			if (gefiltertewurfel[i] + 1 === gefiltertewurfel[i + 1]) {
				counter++
				if (counter === 4) {
					points = 30
				}
			} else {
				counter = 1;
			}
		}
	}

	return points
}

//Große Straße
function getGrosseStrasse(){
	let points = 0;
	let counter = 1
	values.sort();

	const gefiltertewurfel = [...new Set(values)];

	for (let i= 0; i < gefiltertewurfel.length; i++) {
		if (gefiltertewurfel.length >= 5) {
			if (gefiltertewurfel[i] + 1 === gefiltertewurfel[i + 1]) {
				counter++
				if (counter === 5) {
					points = 40
				}
			} else {
				counter = 1;
			}
		}
	}

	return points
}

/**
 * Diese Runde zurücksetzen
 *
 * @return void
 */
function resetRound() {
	const dices = document.getElementsByClassName('dice');

	for (let i = 0; i < dices.length; i++) {
		// Alle Würfel loslassen
		dices[i].removeAttribute('data-hold');

		// Alle Würfelwerte zurücksetzen
		dices[i].value = 0;
	}

	// Alle gemerkten Würfelwerte zurücksetzen
	values = [];
}

/**
 * Würfel halten oder loslassen
 *
 * @param dice
 */
function toggleDice(dice) {
	if (rolled !== 0) {
		dice.getAttribute('data-hold') ? dice.removeAttribute('data-hold') : dice.setAttribute('data-hold', 1)

		// Fokus auf diesen Würfel entfernen
		dice.blur();
	}
}