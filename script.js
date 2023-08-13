$("#reset-button").hide();

const wrd = ["синий", "красный", "желтый", "зеленый", "черный"];
const clr = ["red", "dodgerblue", "limegreen", "black", "gold"];

let counter = 0;
let started = 0;
let results = {
	answers: []
};
let lastTime;
let data = [];

function start() {
	for (var i = 0; i < 30; i++) {
		let randWord = wrd[Math.floor(Math.random() * wrd.length)];
		let randColor = clr[Math.floor(Math.random() * clr.length)];
		data.push({
			word: randWord,
			color: randColor 
		})
	}

	$("#start-button").hide();
	$("#reset-button").show();
	word(data[counter].word, data[counter].color);
	lastTime = Date.now();
	started = 1;
	
}

function reset() {
	$("#start-button").show();
	$("#reset-button").hide();
	counter = 0;
	started = 0;
	results = {
		answers: []
	};
	lastTime = 0;
	data = [];
	$(".content-word").text("[тут будет слово]").css('color', "black");
	$(".results-text").empty();
}

function word(wrd, clr) {
	$(".content-word").text(wrd).css('color', clr);
}

function answer(color) {
	if (!started) {
		return;
	}

	t = Date.now() - lastTime;
	results.answers.push({
		mistake: color != data[counter].color,
		time: t
	})

	if (counter + 1 == data.length) {
		let averageTime = 0;
		let averageMistakes = 0;
		for (var i = 0; i < results.answers.length; i++) {
			averageTime += results.answers[i].time
			averageMistakes += (results.answers[i].mistake) ? 1 : 0
			$( ".results-text" ).append( `<li>${i+1} Время: ${results.answers[i].time}мс ${(results.answers[i].mistake) ? "Ошибка" : ""}</li>` );
		}
		$( ".results-text" ).append( `<li class="results-average">Среднее время: ${Math.round(averageTime / results.answers.length)}мс Ошибок: ${Math.round(averageMistakes / results.answers.length * 100)}%</li>` );
		started = 0;
		return;
	}

	
	counter++;
	word(data[counter].word, data[counter].color)
	lastTime = Date.now();
}
