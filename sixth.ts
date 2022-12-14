import { readFileSync } from "fs";
// const input: string = readFileSync("sixth.txt", "utf8");
const input: string = "bvwbjplbgvbhsrlpgdmjqwftvncz";
console.log("firstFourUniqueDigits()", firstFourUniqueDigits());
// find the first four unique digits in the string and the last index

function firstFourUniqueDigits(): number {
	const uniqueMap = new Map<string, boolean>();
	for (let i = 0; i < input.length; i++) {
		const element = input[i];
		if (!uniqueMap.has(element)) {
			uniqueMap.set(element, true);
			if (uniqueMap.size === 4) {
				return i + 1;
			}
		} else {
			uniqueMap.clear();
			uniqueMap.set(element, true);
		}
		console.log("i:", i + 1, "element:", element, "size:", uniqueMap.size);
		console.log("uniqueMap:", uniqueMap);
	}
	return 0;
}
