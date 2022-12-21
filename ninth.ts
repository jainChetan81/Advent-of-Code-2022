// import { readFileSync } from "fs";
export const a = "";
// @ts-expect-error Deno not found
const input = await Deno.readTextFile("ninth.txt").then((e) => e.split("\n"));
// const input: string[] = readFileSync("ninth-test-2.txt", "utf8").split("\n"); //6271
// const input: string[] = readFileSync("ninth.txt", "utf8").split("\n");
// this map will store the position of the tail
// key will be the [x,y] position of the 2d Matrix
// value will be the number of times the position is visited

/*
const tailPositionsHistory = new Map<string, number>();
const headPositionsHistory = new Map<string, number>();
// // start the head position at 0,0, and then update the position based on the direction
// // the position can be negative as well
let headPosition: [number, number] = [0, 0];
let tailPosition: [number, number] = [0, 0];
//update the initial position of the tail and head
tailPositionsHistory.set("0,0", 1);
headPositionsHistory.set("0,0", 1);
for (let i = 0; i < input.length; i++) {
	const [direction, position] = input[i].split(" ");
	updatePosition(direction satisfies "L" | "U" | "R" | "D", +position);
}

function updatePosition(direction: "L" | "U" | "R" | "D", position: number) {
	//update the position of the tail based on the direction of Head in the hashMap
	for (let i = 0; i < position; i++) {
		// console.log("UPDATING POSITION", "position", i + 1, "of position", position, "of direction", direction);
		// update the head position
		headPosition = updateHeadPosition(headPosition, direction);
		const [tempHeadX, tempHeadY] = headPosition;
		const needToMoveTails = isTailAwayFromHead(headPosition, tailPosition);
		if (needToMoveTails) {
			// console.log("moving tail");
			const [tailX, tailY] = tailPosition;
			let tempTailX = tailX,
				tempTailY = tailY;
			// this is in case we should be moving diagonally
			let moveDiagonal = false;
			if (Math.abs(tempHeadX - tempTailX) >= 1 && Math.abs(tempHeadY - tempTailY) >= 1) {
				// console.log(tempHeadX, tempHeadY, ": before, tail: ", tempTailX, tempTailY, "when moving diagonally:");
				moveDiagonal = true;
			}
			switch (direction) {
				case "L":
					[tempTailX, tempTailY] = moveDiagonal
						? [tempTailX - 1, tempHeadY > tempTailY ? tempTailY + 1 : tempTailY - 1]
						: [tempTailX - 1, tempTailY];
					break;
				case "U":
					[tempTailX, tempTailY] = moveDiagonal
						? [tempHeadX > tempTailX ? tempTailX + 1 : tempTailX - 1, tempTailY + 1]
						: [tempTailX, tempTailY + 1];
					break;
				case "R":
					[tempTailX, tempTailY] = moveDiagonal
						? [tempTailX + 1, tempHeadY > tempTailY ? tempTailY + 1 : tempTailY - 1]
						: [tempTailX + 1, tempTailY];
					break;
				case "D":
					[tempTailX, tempTailY] = moveDiagonal
						? [tempHeadX > tempTailX ? tempTailX + 1 : tempTailX - 1, tempTailY - 1]
						: [tempTailX, tempTailY - 1];
					break;
			}
			// update the tail position
			tailPosition = [tempTailX, tempTailY];
			const tailKey = `${tempTailX},${tempTailY}`;
			const tailValue = tailPositionsHistory.get(tailKey) || 0;
			tailPositionsHistory.set(tailKey, tailValue + 1);
		}
		// console.log(headPosition, ": head, tail: ", tailPosition);

		// update the position of the head in the hashMap
		const key = `${tempHeadX},${tempHeadY}`;
		const value = headPositionsHistory.get(key) || 0;
		headPositionsHistory.set(key, value + 1);
		// console.log("END UPDATING POSITION");
	}
}
console.log("tailPositionsHistory.size()", tailPositionsHistory.size);
*/
function isTailAwayFromHead(head: [number, number], tail: [number, number]) {
	//check if the distance between the head and tail is greater than 1
	const [x1, y1] = head;
	const [x2, y2] = tail;
	if (Math.abs(x1 - x2) <= 1 && Math.abs(y1 - y2) <= 1) return false;
	return true;
}
function updateHeadPosition(head: [number, number], direction: "L" | "U" | "R" | "D"): [number, number] {
	const [headX, headY] = head;
	let tempHeadX = headX,
		tempHeadY = headY;
	switch (direction) {
		case "L":
			[tempHeadX, tempHeadY] = [tempHeadX - 1, tempHeadY];
			break;
		case "U":
			[tempHeadX, tempHeadY] = [tempHeadX, tempHeadY + 1];
			break;
		case "R":
			[tempHeadX, tempHeadY] = [tempHeadX + 1, tempHeadY];
			break;
		case "D":
			[tempHeadX, tempHeadY] = [tempHeadX, tempHeadY - 1];
			break;
	}
	return [tempHeadX, tempHeadY];
}
// -----------------------------------___2ND SOLUTION___-----------------------------------
let headPositionSecond: [number, number] = [0, 0];
const positions = {
	1: [0, 0],
	2: [0, 0],
	3: [0, 0],
	4: [0, 0],
	5: [0, 0],
	6: [0, 0],
	7: [0, 0],
	8: [0, 0],
	9: [0, 0],
};
const positionsHistory = {
	1: new Map<string, number>(),
	2: new Map<string, number>(),
	3: new Map<string, number>(),
	4: new Map<string, number>(),
	5: new Map<string, number>(),
	6: new Map<string, number>(),
	7: new Map<string, number>(),
	8: new Map<string, number>(),
	9: new Map<string, number>(),
};
for (let i = 0; i < input.length; i++) {
	const [direction, position] = input[i].split(" ");
	updatePosition2(direction as "L" | "U" | "R" | "D", +position);
}

function updatePosition2(direction: "L" | "U" | "R" | "D", position: number) {
	//update the position of the tail based on the direction of Head in the hashMap
	console.log("START OF DIRECTIONS++++++++++++++++++++++++++++++++", direction);
	for (let i = 0; i < position; i++) {
		// update the head position
		headPositionSecond = updateHeadPosition(headPositionSecond, direction);
		for (let j = 1; j <= 9; j++) {
			const head = j === 1 ? headPositionSecond : positions[j - 1];
			const tail = positions[j];
			const updatedTailVectors = updateTailingPosition(head, tail, direction);
			if (!updatedTailVectors) continue;
			if (j === 6) console.log("START----------->Head", positions["5"], "Tail", positions["6"]);
			positions[j] = updatedTailVectors;
			const tailKey = `${updatedTailVectors[0]},${updatedTailVectors[1]}`;
			const tailValue = positionsHistory[j].get(tailKey) || 0;
			positionsHistory[j].set(tailKey, tailValue + 1);
			positionsHistory[j].delete("0,0");
			if (j === 6) console.log("END----------->", positions["5"], ": head, tail: ", positions["6"]);
		}
	}
}
console.log("positionsHistory", positionsHistory["9"].size + 1);

function updateTailingPosition(
	head: [number, number],
	tail: [number, number],
	direction: "L" | "U" | "R" | "D"
): [number, number] | null {
	const needToMoveTails = isTailAwayFromHead(head, tail);
	if (!needToMoveTails) return null;
	// console.log("moving tail");
	const [headX, headY] = head;
	let [tailX, tailY] = tail;
	// this is in case we should be moving diagonally
	let moveDiagonal = false;
	const realDirection = findDirectionForTailBasedOnHead(head, tail);
	if (Math.abs(headX - tailX) >= 1 && Math.abs(headY - tailY) >= 1) {
		moveDiagonal = true;
	}
	switch (realDirection) {
		case "L":
			[tailX, tailY] = moveDiagonal ? [tailX - 1, headY > tailY ? tailY + 1 : tailY - 1] : [tailX - 1, tailY];
			break;
		case "U":
			[tailX, tailY] = moveDiagonal ? [headX > tailX ? tailX + 1 : tailX - 1, tailY + 1] : [tailX, tailY + 1];
			break;
		case "R":
			[tailX, tailY] = moveDiagonal ? [tailX + 1, headY > tailY ? tailY + 1 : tailY - 1] : [tailX + 1, tailY];
			break;
		case "D":
			[tailX, tailY] = moveDiagonal ? [headX > tailX ? tailX + 1 : tailX - 1, tailY - 1] : [tailX, tailY - 1];
			break;
	}
	// update the tail position
	return [tailX, tailY];
}

console.log(updateTailingPosition([3, 5], [3, 3], "L"));

function findDirectionForTailBasedOnHead(head: [number, number], tail: [number, number]): "L" | "U" | "R" | "D" {
	const [headX, headY] = head;
	const [tailX, tailY] = tail;
	if (headX === tailX) {
		if (headY > tailY) return "U";
		return "D";
	}
	if (headX > tailX) return "R";
	return "L";
}
