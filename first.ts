// Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?

import { readFileSync } from "fs";

const input: string[] = readFileSync("first.txt", "utf8").split("\n");

const calories = input.map((l) => parseInt(l));

const calorieMap = new Map<number, number>();
let tempTotal = 0;
for (let i = 0; i < calories.length; i++) {
	const element = calories[i];
	if (element > 0) {
		tempTotal += element;
	} else {
		calorieMap.set(calorieMap.size + 1, tempTotal);
		tempTotal = 0;
	}
	// console.log(tempTotal);
}
// console.log(calorieMap);
const firstHighest = findHighestValueOfMao(calorieMap);
console.log(firstHighest);
calorieMap.delete(firstHighest.highestELfIndex);
const secondHighest = findHighestValueOfMao(calorieMap);
console.log(secondHighest);
calorieMap.delete(secondHighest.highestELfIndex);
const thirdHighest = findHighestValueOfMao(calorieMap);
console.log(thirdHighest);

console.log(
	"top Three ELves Carrying Most Calories",
	firstHighest.highestTotal + secondHighest.highestTotal + thirdHighest.highestTotal
);
function findHighestValueOfMao(caloriesMao: Map<number, number>) {
	let highestTotal = 0;
	let highestELfIndex = 0;
	caloriesMao.forEach((value, key) => {
		if (highestTotal < value) {
			highestTotal = value;
			highestELfIndex = key;
		}
	});
	return { highestTotal, highestELfIndex };
}
