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

const stackMap: string[][] = [];

for (let i = 0; i < 9; i++) {
	const tempArray: string[] = [];
	for (let j = 0; j < tempStackMap.length; j++) {
		tempArray.unshift(tempStackMap[j][i]);
	}
	stackMap[i] = tempArray;
}

printTree();
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

moveList.map((element) => {
	const [numberToMove, [to, from]] = Object.entries(element)[0];
	moveTheBoxes(+numberToMove, to, from);
});
// const [numberToMove, [to, from]] = Object.entries(moveList[1])[0];
printTree();
findTopElementOfTree();

function moveTheBoxes(numberToMove: number, to: number, from: number) {
	// find the top element in the "from" column
	// remove that element from that column
	// find empty space in the "to" column
	// add the element to that column at that index
	// do all the above steps for the number of boxes to move

	console.log(numberToMove, to, from);
	for (let i = 0; i < numberToMove; i++) {
		const box = findTopElementInColumn(from);
		console.log("box", box);
		if (box && box.length > 0) {
			addElementToColumn(to, box);
		}
	}
}

function findTopElementInColumn(from: number): string {
	let topElement = "";
	const stackArray = stackMap[from - 1];
	for (let i = stackArray.length - 1; i >= 0; i--) {
		const element = stackArray[i];
		if (element !== "") {
			stackArray[i] = "";
			stackMap[from - 1] = [...stackArray];
			return element;
		}
	}
	return topElement;
}

function addElementToColumn(to: number, replaceBox: string) {
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

function findTopElementOfTree() {
	const topElements: string[] = [];
	for (let i = stackMap.length - 1; i >= 0; i--) {
		const topElement: string = stackMap[i].filter(Boolean).reverse()[0];
		topElements.push(topElement);
	}
	console.log(topElements.reverse());
}

function printTree() {
	console.log("Printing Tree \n");
	stackMap.map((element) => {
		console.log(element);
	});
}
// HTCSGCVM
