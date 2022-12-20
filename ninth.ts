import { readFileSync } from "fs";
const input: string[] = readFileSync("ninth-test.txt", "utf8").split("\n");
// const input: string[] = readFileSync("ninth.txt", "utf8").split("\n");
// this map will store the position of the tail
// key will be the [x,y] position of the 2d Matrix
// value will be the number of times the position is visited
const tailPositionsHistory = new Map<string, number>();
const headPositionsHistory = new Map<string, number>();
// start the head position at 0,0, and then update the position based on the direction
// the position can be negative as well
let headPosition = [0, 0];
let tailPosition= [0,0];
for (let i = 0; i < input.length; i++) {
	const [direction, position] = input[i].split(" ");
	updatePosition(direction as "L" | "U" | "R" | "D", +position);
}
// console.log(isTailAwayFromHead());

function updatePosition(direction: "L" | "U" | "R" | "D", position: number) {
	//update the position of the tail based on the direction of Head in the hashMap
	for (let i = 0; i < position; i++) {
		const [x, y] = headPosition;
		switch (direction) {
			case "L":
				headPosition = [x - 1, y];
				break;
			case "U":
				headPosition = [x, y + 1];
				break;
			case "R":
				headPosition = [x + 1, y];
				break;
			case "D":
				headPosition = [x, y - 1];
				break;
		}
		const needToMoveTails = isTailAwayFromHead();
		if (needToMoveTails) {
			//update latest position on the tail
			const [x, y] = tailPosition;

			switch (direction) {
				case "L":
					tailPosition = [x - 1, y];
					break;
				case "U":
					tailPosition = [x, y + 1];
					break;
				case "R":
					tailPosition = [x + 1, y];
					break;
				case "D":
					tailPosition = [x, y - 1];
					break;
			}
			console.log(headPosition, "tail position", tailPosition);
			const tailKey = `${x},${y}`;
			const tailValue = tailPositionsHistory.get(tailKey) || 0;
			tailPositionsHistory.set(tailKey, tailValue + 1);
		}
		// update the position of the head in the hashMap
		const key = `${x},${y}`;
		const value = headPositionsHistory.get(key) || 0;
		headPositionsHistory.set(key, value + 1);
	}
}

function isTailAwayFromHead() {
	//check if the distance between the head and tail is greater than 1
	const [x1, y1] = headPosition;
	const [x2, y2] = tailPosition;
	if (Math.abs(x1 - x2) <= 1 && Math.abs(y1 - y2) <= 1) return false;
	return true;
}