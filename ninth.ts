import { readFileSync } from "fs";
const input: string[] = readFileSync("ninth-test-2.txt", "utf8").split("\n"); //6271
// const input: string[] = readFileSync("ninth.txt", "utf8").split("\n");
// this map will store the position of the tail
// key will be the [x,y] position of the 2d Matrix
// value will be the number of times the position is visited
const tailPositionsHistory = new Map<string, number>();
const headPositionsHistory = new Map<string, number>();
// start the head position at 0,0, and then update the position based on the direction
// the position can be negative as well
let headPosition: [number, number] = [0, 0];
let tailPosition: [number, number] = [0, 0];
//update the initial position of the tail and head
tailPositionsHistory.set("0,0", 1);
headPositionsHistory.set("0,0", 1);
// for (let i = 0; i < input.length; i++) {
// 	const [direction, position] = input[i].split(" ");
// 	updatePosition(direction as "L" | "U" | "R" | "D", +position);
// }

function updatePosition(direction: "L" | "U" | "R" | "D", position: number) {
	//update the position of the tail based on the direction of Head in the hashMap
	for (let i = 0; i < position; i++) {
		// console.log("UPDATING POSITION", "position", i + 1, "of position", position, "of direction", direction);
		const [headX, headY] = headPosition;
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
		// update the head position
		headPosition = [tempHeadX, tempHeadY];
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
function isTailAwayFromHead(head: [number, number], tail: [number, number]) {
	//check if the distance between the head and tail is greater than 1
	const [x1, y1] = headPosition;
	const [x2, y2] = tailPosition;
	if (Math.abs(x1 - x2) <= 1 && Math.abs(y1 - y2) <= 1) return false;
	return true;
}
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
for (let i = 0; i < input.length; i++) {
	const [direction, position] = input[i].split(" ");
	updatePosition(direction as "L" | "U" | "R" | "D", +position);
}