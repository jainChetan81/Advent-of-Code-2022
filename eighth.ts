import { readFileSync } from "fs";
// const input: string[] = readFileSync("eighth-test.txt", "utf8").split("\n");
const input: string[] = readFileSync("eighth.txt", "utf8").split("\n");
const arr: any[] = [];
for (let i = 0; i < input.length; i++) {
	const rows = input[i];
	for (let j = 0; j < input[i].length; j++) {
		// we are iterating the all the numbers here
		// i is the row index
		// j is the column index
		// number is the current number we are checking for
		const number = +input[i][j];
		const checkInRowResult = checkInRow(number, rows, j);
		const checkInColumnResult = checkInColumn(number, input, j, i);
		if (checkInRowResult || checkInColumnResult) {
			arr.push({ row: i, column: j, number: number });
		}
	}
}
// console.log("arr.length", arr.length);
// printMatrix(arr);

function checkInRow(number: number, rows: string, currentIndex: number): boolean {
	// first loop through current row(input[i]) and check if the number is greater than the current number
	// also check for left and right logic
	// we have currentIndex, so we need to return an object telling us if the left is true or right is true
	// console.log("number", number, "rows", rows, "currentIndex", currentIndex);
	let left = true,
		right = true;
	// if the position is in the left or right of the row, return true
	if (currentIndex === 0 || currentIndex === rows.length - 1) return true;
	for (let i2 = 0; i2 < rows.length; i2++) {
		if (i2 === currentIndex) continue;
		const number2 = +rows[i2];
		if (number2 >= number) {
			if (i2 < currentIndex) left = false;
			if (i2 > currentIndex) right = false;
			// return false;
		}
	}
	return left || right;
}

function checkInColumn(number: number, matrix: string[], columnIndex: number, currentRowIndex: number): boolean {
	let left = true,
		right = true;
	// check in the certain column only
	// if the position is in the top of bottom of the matrix, return true
	if (currentRowIndex === 0 || currentRowIndex === matrix.length - 1) return true;
	for (let i = 0; i < matrix.length; i++) {
		if (i === currentRowIndex) continue;
		const number2 = +matrix[i][columnIndex];
		if (number2 >= number) {
			if (i < currentRowIndex) left = false;
			if (i > currentRowIndex) right = false;
		}
	}

	return left || right;
}

// ?-------------------------QUESTION 2-------------------------?
const map = new Map<number, number>();
let highest = 0;
for (let i = 0; i < input.length; i++) {
	const rows = input[i];
	for (let j = 0; j < input[i].length; j++) {
		const number = +input[i][j];
		if (i === 0 || j === 0 || i === input.length - 1 || j === input[i].length - 1) continue;
		console.log("------------------------------------------------------- \n");
		const { left, right } = findHorizontalTrees(number, rows, j);
		const { top, bottom } = findVerticalTrees(number, input, j, i);
		const allValues = left * right * top * bottom;
		if (allValues > highest) highest = allValues;
		// const checkInColumnResult = checkInColumn(number, input, j, i);
		// if (checkInRowResult) {
		// console.log({ row: i, column: j, number: number, value: horizontalValue });
		// }
	}
}
console.log("highest", highest);
function findHorizontalTrees(number: number, rows: string, currentIndex: number): { left: number; right: number } {
	let left = 0,
		right = 0;
	// console.log("number", number, "rows", rows, "currentIndex", currentIndex);
	for (let i = currentIndex - 1; i >= 0; i--) {
		left++;
		if (+rows[i] >= number) break;
	}
	for (let i = currentIndex + 1; i < rows.length; i++) {
		right++;
		if (+rows[i] >= number) break;
	}

	left === 0 ? (left = 1) : left;
	right === 0 ? (right = 1) : right;
	return { left, right };
}

function findVerticalTrees(
	number: number,
	matrix: string[],
	columnIndex: number,
	currentRowIndex: number
): { top: number; bottom: number } {
	let top = 0,
		bottom = 0;
	// console.log("number", number, "matrix[current]", matrix[currentRowIndex], "columnIndex", columnIndex);
	for (let i = currentRowIndex - 1; i >= 0; i--) {
		// console.log("matrix[i][columnIndex]--top", matrix[i][columnIndex], "i", i);
		top++;
		if (+matrix[i][columnIndex] >= number) break;
	}
	for (let i = currentRowIndex + 1; i < matrix.length; i++) {
		bottom++;
		if (+matrix[i][columnIndex] >= number) break;
	}
	console.log("top", top, "bottom", bottom);
	return { top, bottom };
}

function printMatrix(input: string[]) {
	for (let i = 0; i < input.length; i++) {
		console.log(input[i]);
	}
}
