import { readFileSync } from "fs";

const input: any[] = readFileSync("second.txt", "utf8").split("\n");

const OPPONENT_CARDS = {
	ROCK: "A",
	PAPER: "B",
	SCISSORS: "C",
} as const;

const MY_CARDS = {
	ROCK: "X", //1
	PAPER: "Y", //2
	SCISSORS: "Z", //3
} as const;

const MY_CHOICES = {
	LOSE: "X",
	DRAW: "Y",
	WIN: "Z",
} as const;

let totalPoints = 0;
for (let i = 0; i < input.length; i++) {
	const [opponent, myself]: ["A" | "B" | "C", "X" | "Y" | "Z"] = input[i].split(" ");
	totalPoints += findScoreBasedOnCardPicked(myself) + findScoreBasedOnAllCards(opponent, myself);
}
console.log("totalPoints", totalPoints);
totalPoints = 0;
for (let i = 0; i < input.length; i++) {
	const [opponent, myself]: ["A" | "B" | "C", "X" | "Y" | "Z"] = input[i].split(" ");
	totalPoints += findScoreBasedOnResult(myself) + findPointsBasedOnResult(opponent, myself);
}
console.log("totalPoints", totalPoints);

function findPointsBasedOnResult(
	opponent: typeof OPPONENT_CARDS[keyof typeof OPPONENT_CARDS],
	myself: typeof MY_CHOICES[keyof typeof MY_CHOICES]
): number {
	if (opponent === OPPONENT_CARDS.ROCK) {
		if (myself === MY_CHOICES.LOSE) return 3;
		if (myself === MY_CHOICES.WIN) return 2;
		if (myself === MY_CHOICES.DRAW) return 1;
	}
	if (opponent === OPPONENT_CARDS.PAPER) {
		if (myself === MY_CHOICES.LOSE) return 1;
		if (myself === MY_CHOICES.WIN) return 3;
		if (myself === MY_CHOICES.DRAW) return 2;
	}
	if (opponent === OPPONENT_CARDS.SCISSORS) {
		if (myself === MY_CHOICES.LOSE) return 2;
		if (myself === MY_CHOICES.WIN) return 1;
		if (myself === MY_CHOICES.DRAW) return 3;
	}
	return 0;
}

function findScoreBasedOnResult(myself: typeof MY_CHOICES[keyof typeof MY_CHOICES]): number {
	if (myself === MY_CHOICES.DRAW) return 3;
	if (myself === MY_CHOICES.WIN) return 6;
	return 0;
}

function findScoreBasedOnCardPicked(myself: typeof MY_CARDS[keyof typeof MY_CARDS]): 1 | 2 | 3 {
	if (myself === MY_CARDS.PAPER) return 2;
	if (myself === MY_CARDS.SCISSORS) return 3;
	return 1;
}

function findScoreBasedOnAllCards(
	opponent: typeof OPPONENT_CARDS[keyof typeof OPPONENT_CARDS],
	myself: typeof MY_CARDS[keyof typeof MY_CARDS]
): 0 | 3 | 6 {
	if (opponent === OPPONENT_CARDS.ROCK && myself === MY_CARDS.ROCK) return 3;
	if (opponent === OPPONENT_CARDS.ROCK && myself === MY_CARDS.PAPER) return 6;
	if (opponent === OPPONENT_CARDS.ROCK && myself === MY_CARDS.SCISSORS) return 0;
	if (opponent === OPPONENT_CARDS.PAPER && myself === MY_CARDS.ROCK) return 0;
	if (opponent === OPPONENT_CARDS.PAPER && myself === MY_CARDS.PAPER) return 3;
	if (opponent === OPPONENT_CARDS.PAPER && myself === MY_CARDS.SCISSORS) return 6;
	if (opponent === OPPONENT_CARDS.SCISSORS && myself === MY_CARDS.ROCK) return 6;
	if (opponent === OPPONENT_CARDS.SCISSORS && myself === MY_CARDS.PAPER) return 0;
	if (opponent === OPPONENT_CARDS.SCISSORS && myself === MY_CARDS.SCISSORS) return 3;
	return 0;
}
