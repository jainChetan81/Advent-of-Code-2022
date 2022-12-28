import { readFileSync } from "fs";
// export const a = "";
// const input: string[] = await Deno.readTextFile("twelfth-test.txt").then((e: string) => e.split("\n"));
type POSITIONS =
	| "a"
	| "b"
	| "c"
	| "d"
	| "e"
	| "f"
	| "g"
	| "h"
	| "i"
	| "j"
	| "k"
	| "l"
	| "m"
	| "n"
	| "o"
	| "p"
	| "q"
	| "r"
	| "s"
	| "t"
	| "u"
	| "v"
	| "w"
	| "x"
	| "y"
	| "z"
	| "E"
	| "S";
const STARTING_POSITION_CHAR = "S";
const ENDING_POSITION_CHAR = "E";
const input: string[] = readFileSync("twelfth-test.txt", "utf8").split("\n");
const matrix = input.map((e) => e.split("")) as POSITIONS[][];
let { start: startingPosition, end: endPosition } = findStartingPosition(matrix);

printMatrix(matrix);

// while (startingPosition[0] !== endPosition[0] || startingPosition[1] !== endPosition[1]) {
for (let i = 0; i < 2; i++) {
	// we need to check whether the char at starting position is equal or greater than ending position
	// if it is equal, we need to check if there is a char left or up or right or down that is ONE greater than the current one
	// if there is, we need to move to that position
	// if there is not, we need to move to the next position that is equal to the current one
	// there could be multiple paths to this position, so we need to keep track of all of them
	const nextPosition = moveStartingPosition(startingPosition);
	// if (!nextPosition) continue;
	if (!nextPosition) continue;
	startingPosition = nextPosition;
}

function moveStartingPosition(position: [number, number]): [number, number] | null {
	const [x, y] = position;
	let newPosition = null;
	console.log("current position", [x, y], "Character", matrix[x][y]);
	if (matrix[x][y] === STARTING_POSITION_CHAR) {
		if (matrix[x + 1][y] === "a") return [x + 1, y];
		if (matrix[x][y + 1] === "a") return [x, y + 1];
	}
	// moving right
	console.log(matrix[x][y]?.charCodeAt(0), x, y);
	console.log(matrix[x + 1]?.[y].charCodeAt(0), x + 1, y);
	if (matrix[x + 1]?.[y]?.charCodeAt(0) > 0 && matrix[x][y].charCodeAt(0) === matrix[x + 1][y].charCodeAt(0) + 1) {
		newPosition = [x + 1, y];
	}
	// moving left
	if (matrix[x - 1]?.[y]?.charCodeAt(0) > 0 && matrix[x][y].charCodeAt(0) === matrix[x - 1][y].charCodeAt(0) + 1) {
		newPosition = [x - 1, y];
	}
	// moving up
	if (matrix[x]?.[y + 1]?.charCodeAt(0) > 0 && matrix[x][y].charCodeAt(0) === matrix[x][y + 1].charCodeAt(0) + 1) {
		newPosition = [x, y + 1];
	}
	// moving down
	if (matrix[x]?.[y - 1]?.charCodeAt(0) > 0 && matrix[x][y].charCodeAt(0) === matrix[x][y - 1].charCodeAt(0) + 1) {
		newPosition = [x, y - 1];
	}
	console.log("newPosition", newPosition);
	return newPosition;
}

function printMatrix(input: string[][]) {
	for (let i = 0; i < input.length; i++) {
		console.log(input[i]);
	}
}

function findStartingPosition(tempMatrix: POSITIONS[][]): { start: [number, number]; end: [number, number] } {
	const start: [number, number] = [0, 0],
		end: [number, number] = [0, 0];
	for (let i = 0; i < tempMatrix.length; i++) {
		for (let j = 0; j < tempMatrix[i].length; j++) {
			if (STARTING_POSITION_CHAR === tempMatrix[i][j]) {
				start[0] = i;
				start[1] = j;
			}
			if (tempMatrix[i][j] === ENDING_POSITION_CHAR) {
				end[0] = i;
				end[1] = j;
			}
		}
	}
	return { start, end };
}
