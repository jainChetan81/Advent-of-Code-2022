import { readFileSync } from "fs";
// const result1 = await Deno.readTextFile("fifth1.txt");
// const result2 = await Deno.readTextFile("fifth2.txt");
// const input1 = result1.split("\n");
// const input2 = result2.split("\n");
const input1: string[] = readFileSync("fifth1.txt", "utf8").split("\n");
const input2: string[] = readFileSync("fifth2.txt", "utf8").split("\n");
// index is the row number in stack and the values are the columns with [A-Z] and ""(in case of empty)
const tempStackMap: string[][] = [];
input1.pop();
input1.map((element, index) => {
	const array = element
		.split(/(\[[A-Z]\])/g)
		.filter((e) => e.length > 1)
		.map((e) => e.trim());
	for (let i = 0; i < 9; i++) {
		if (!array[i]) array[i] = "";
	}
	tempStackMap[index] = array;
});

printTree(tempStackMap);
console.log("print rotated tree");
const stackMap: string[][] = [];

for (let i = 0; i < 9; i++) {
	const tempArray: string[] = [];
	for (let j = 0; j < 9; j++) {
		// console.log("i: ", i, " j: ", j, " length: ", tempStackMap.length, " j length: ", tempStackMap[j]);
		const element = tempStackMap[j] ? tempStackMap[j][i] : "";
		tempArray.unshift(element ?? "");
	}
	tempArray.shift();
	stackMap[i] = [...tempArray];
}
printTree(stackMap);
// it is the array of moves, each move is an object with key as the numbers of boxes to move and value as the array of [to, from] positions
const moveList: Record<number, number[]>[] = [];
input2.map((element, index) => {
	const [move, distance] = element.split(" from ");
	const numberToMove = +move.split("move ").filter(Boolean);
	const [to, from] = distance
		.split(" to ")
		.filter(Boolean)
		.map((e) => +e);
	moveList[index] = { [numberToMove]: [to, from] };
});

// moveList.map((element) => {
// 	const [numberToMove, [from, to]] = Object.entries(element)[0];
// 	moveTheBoxes(+numberToMove, to, from);
// });
// for part 2
moveList.map((element) => {
	const [numberToMove, [from, to]] = Object.entries(element)[0];
	moveTheBoxes2(+numberToMove, to, from);
});
// const [numberToMove, [from, to]] = Object.entries(moveList[0])[0];
// moveTheBoxes2(+numberToMove, to, from);
printTree(stackMap);

function moveTheBoxes(numberToMove: number, to: number, from: number) {
	// find the top element in the "from" column
	// remove that element from that column
	// find empty space in the "to" column
	// add the element to that column at that index
	// do all the above steps for the number of boxes to move
	if (isNaN(numberToMove) || isNaN(to) || isNaN(from)) return;
	// console.log("Moving ", numberToMove, " boxes from ", from, " to ", to);
	for (let i = 0; i < numberToMove; i++) {
		const box = findTopElementInColumn(from);
		if (box && box.length > 0) {
			addElementToColumn(to, box);
		}
	}
}

function findTopElementInColumn(from: number): string {
	const stackArray = stackMap[from - 1];
	for (let i = stackArray.length - 1; i >= 0; i--) {
		const element = stackArray[i];
		if (element !== "") {
			stackArray[i] = "";
			stackMap[from - 1] = [...stackArray];
			return element;
		}
	}
	return "";
}

function addElementToColumn(to: number, replaceBox: string) {
	const stackArray = stackMap[to - 1];
	if (!replaceBox || typeof replaceBox !== "string") return;
	for (let i = 0; i < stackArray.length; i++) {
		const element = stackArray[i];
		if (element === "") {
			stackArray[i] = replaceBox;
			return;
		}
	}
	stackArray.push(replaceBox);
}

function printTree(stackMap: string[][]) {
	const temp = [...stackMap];
	console.log("Printing Tree \n");
	temp.map((element) => {
		console.log(element);
	});
}

// part two

function moveTheBoxes2(numberToMove: number, to: number, from: number) {
	// find the top element sin the "from" column
	// remove those element array from that column
	// find empty spaces in the "to" column
	// add the element ARRAY to that column at that index
	// do all the above steps for the number of boxes to move
	if (isNaN(numberToMove) || isNaN(to) || isNaN(from)) return;
	// for (let i = 0; i < numberToMove; i++) {
	console.log("Moving ", numberToMove, " boxes from ", from, " to ", to);
	const box = findTopElementInColumn2(from, numberToMove);
	if (box && box.length > 0) {
		console.log("box", box);
		for (let i = 0; i < numberToMove; i++) {
			addElementToColumn2(to, box[i]);
		}
	}
	// }
}
function findTopElementInColumn2(from: number, numberToMove: number): string[] {
	const stackArray = stackMap[from - 1];
	const elements: string[] = [];
	for (let i = stackArray.length - 1; i >= 0; i--) {
		const element = stackArray[i];
		if (element !== "") {
			stackArray[i] = "";
			stackMap[from - 1] = [...stackArray];
			elements.unshift(element);
			if (elements.length === numberToMove) return elements;
		}
	}
	return elements;
}
function addElementToColumn2(to: number, replaceBox: string) {
	const stackArray = stackMap[to - 1];
	for (let i = 0; i < stackArray.length; i++) {
		const element = stackArray[i];
		if (element === "") {
			stackArray[i] = replaceBox;
			return;
		}
	}
	stackArray.push(replaceBox);
}