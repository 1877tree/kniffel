/**
 * Gesamtpunktzahl
 *
 * @var number
 */
var score = 0;

/**
 * Anzahl der getätigten Würfe in dieser Runde
 *
 * @var number
 */
var rolled = 0;

/**
 * Alle aktuellen Würfelwerte
 *
 * @var array
 */
var values = [];
//Cheatemode
var cheatmodefunf = false
var cheatmodesechs = false
var cheatmodevier = false
var cheatmodedrei = false
var cheatmodezwei = false
var cheatmodeeins = false

document.addEventListener("keydown", function (event) {
	if (event.keyCode === 32) {
		if (cheatmodefunf === true) {
			cheatmodefunf = false
		} else {
			cheatmodefunf = true
		}

	}
	if (event.keyCode === 67) {
		if (cheatmodesechs === true) {
			cheatmodesechs = false
		} else {
			cheatmodesechs = true
		}
	}

	if (event.keyCode === 86) {
		if (cheatmodevier === true) {
			cheatmodevier = false
		} else {
			cheatmodevier = true
		}
	}

	if (event.keyCode === 66) {
		if (cheatmodedrei === true) {
			cheatmodedrei = false
		} else {
			cheatmodedrei = true
		}
	}

	if (event.keyCode === 78) {
		if (cheatmodezwei === true) {
			cheatmodezwei = false
		} else {
			cheatmodezwei = true
		}
	}

	if (event.keyCode === 77) {
		if (cheatmodeeins === true) {
			cheatmodeeins = false
		} else {
			cheatmodeeins = true
		}
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
		var dices = document.getElementsByClassName('dice');
		// Die aktuellen Würfelwerte zurücksetzen
		values = [];


		for (var i = 0; i < dices.length; i++) {
			console.log("Durchlauf ", i)


			if (dices[i].getAttribute('data-hold') == null) {

				// Eine Zufallszahl zwischen 1 und 6 generieren und dem Würfel zuweisen
				dices[i].value = Math.floor((Math.random() * 6) + 1);

				//Cheatcods :)
				if (cheatmodefunf === true) {
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

				if (cheatmodesechs === true) {
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

				if (cheatmodevier === true) {
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

				if (cheatmodedrei === true) {
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

				if (cheatmodezwei === true) {
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

				if (cheatmodeeins === true) {
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
			var value = parseInt(dices[i].value);
			values.push(value);
		}

		// Anzahl der getätigten Würfe erhöhen
		rolled++;
	}
}


/**
 * Würfel einem Feld zuweisen
 *
 * @param HTMLElement field
 * @param mixed type
 * @return void
 */
function assignDices(field, type) {
	// @TODO Verhindern Sie, dass die Würfel einem Feld mehr als einmal zugewiesen werden können

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
		}

		// Punkte zuweisen
		field.innerHTML = points;

		// Gesamtpunktzahl erhöhen und in das HTML Element mit der ID score schreiben
		score += points;
		document.getElementById('score').innerHTML = score;

		var dicestwo = document.getElementsByClassName('dice-two');
		console.log(values)

		for (var i = 0; i < dicestwo.length; i++) {
			dicestwo[i].value = values[i]
		}


		// Runde zurücksetzen
		resetRound();
	}


	// Die zu vergebenden Punkte

}

/**
 * Einser bis Sechser berechnen
 *
 * @param number num
 * @return number
 */
function getEinserBisSechser(num) {
	var points = 0;

	for (var i = 0; i < values.length; i++) {
		if (values[i] === num) {
			points += num;
		}
	}

	return points;
}

/**
 * Pasch berechnen
 *
 * @param number num
 * @return number
 */
function getPasch(num) {
	var points = 0;

	values.sort();

	let counter = 1;

	let istDreierPasch = false
	let istViererPasch = false
	let istKniffel = false
	let istFullHouse = false

	//Dreier Pasch
	if (3 === num) {
		for (let i = 0; i < values.length; i++) {
			if (values[i] === values[i - 1]) {
				counter++;
				if (counter === 3) {
					istDreierPasch = true
				}
			} else {
				counter = 1;
			}
		}
	}

	if (istDreierPasch) {
		for (var i = 0; i < values.length; i++) {
			points += values[i];
		}
	}

	//vierer Pasch
	if (4 === num)
		for (let i = 0; i < values.length; i++) {
			if (values[i] === values[i - 1]) {
				counter++;
				if (counter === 4) {
					istViererPasch = true
				}
			} else {
				counter = 1;
			}
		}


	if (istViererPasch) {
		for (var i = 0; i < values.length; i++) {
			points += values[i];
		}
	}

	//Kniffel
	if (5 === num)
		for (let i = 0; i < values.length; i++) {
			if (values[i] === values[i - 1]) {
				counter++;
				if (counter === 5) {
					istKniffel = true
				}
			} else {
				counter = 1;
			}
		}


	if (istKniffel) {
		for (var i = 0; i < values.length; i++) {
			points = 50;
		}
	}

	return points;
}

//Chance
function getChance() {
	let points = 0
	for (let i = 0; i < values.length; i++) {
		points += values[i];
	}
	return points
}

//Full House
function getFullHouse() {
	var ersterteil = false
	var zweiterteil = false
	var dreierblock;
	values.sort();

	for (let i = 0; i < values.length; i++) {
		if (values[i] === values[i - 1]) {
			counter++;
			if (counter === 3) {
				ersterteil = true
				dreierblock = values[i]
			}
		} else {
			counter = 1;
		}
	}

	for (let i = 0; i < values.length; i++) {
		if (values[i] === values[i - 1]) {
			counter++;
			if (counter === 2) {
				if(dreierblock !== values[i]){
					zweiterteil = true
					if(ersterteil && zweiterteil){
						let points = 0
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


/**
 * Diese Runde zurücksetzen
 *
 * @return void
 */
function resetRound() {
	var dices = document.getElementsByClassName('dice');

	for (var i = 0; i < dices.length; i++) {
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
 * @param HTMLElement dice
 * @return void
 */
function toggleDice(dice) {
	// @TODO Verhindern Sie, dass die Würfel gehalten oder losgelassen werden können, bevor mindestens einmal gewürfelt wurde

	if (rolled !== 0) {
		if (dice.getAttribute('data-hold')) {
			// Das HTML Attribut "data-hold" existiert bereits und wird entfernt
			dice.removeAttribute('data-hold');
		} else {
			// Das HTML Attribut "data-hold" existiert noch nicht und wird gesetzt
			dice.setAttribute('data-hold', 1);
		}

		// Fokus auf diesen Würfel entfernen
		dice.blur();
	}


}

