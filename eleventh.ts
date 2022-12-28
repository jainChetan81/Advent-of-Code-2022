import { readFileSync } from "fs";
// export const a = "";
// const input: string[] = await Deno.readTextFile("tenth-test.txt").then((e: string) => e.split("\n")); //14820 too high
const input: string[] = readFileSync("eleventh-test.txt", "utf8").split("\n\n");
type OPERATIONS = "+" | "-" | "*" | "/";
type NUMBER_IN_STRING = `${number}` | "old";

const monkeysWithWorries: Record<number, number[]> = {};
[1, 2].forEach(() => {
	for (let i = 0; i < input.length; i++) {
		const round = input[i].split("\n").slice(1);
		const startingItems = round[0]
			.split("  Starting items: ")
			.filter(Boolean)
			.join("")
			.split(", ")
			.map((e) => +e);
		const [operation, multiplier] = round[1].split("  Operation: new = old ")[1].split(" ") as [
			OPERATIONS,
			NUMBER_IN_STRING
		];
		const test = round[2].split("Test: divisible by ")[1];
		const trueCondition = round[3].split("   If true: throw to monkey ")[1];
		const falseCondition = round[4].split("   If false: throw to monkey ")[1];
		inspectMonkeyActions(i, startingItems, operation, multiplier, +test, +trueCondition, +falseCondition);
	}
});

function inspectMonkeyActions(
	monkeyNumber: number,
	startingItems: number[],
	operation: OPERATIONS,
	multiplier: NUMBER_IN_STRING,
	test: number,
	trueCondition: number,
	falseCondition: number
) {
	for (let i = 0; i < startingItems.length; i++) {
		const worryLevel = Math.trunc(updateWorryLevelByOperation(operation, multiplier, startingItems[i]) / 3);
		const testPassed = worryLevel % test === 0;
		const indexToInsert = testPassed ? trueCondition : falseCondition;
		// console.log("Worry level: ", worryLevel, "Test: ", test, "Test passed: ", testPassed);
		// console.log("Condition: ", testPassed ? "true" : "false", testPassed ? trueCondition : falseCondition);
		monkeysWithWorries[indexToInsert] ??= [];
		monkeysWithWorries[indexToInsert].push(worryLevel);
		while (monkeysWithWorries[monkeyNumber]?.length > 0) {
			// remove the first element and add it to the end of the receiver array
			const elementToRemove = monkeysWithWorries[monkeyNumber].shift();
			const nestedWorryLevel = Math.trunc(updateWorryLevelByOperation(operation, multiplier, elementToRemove!) / 3);
			const nestedTestPassed = nestedWorryLevel % test === 0;
			const nestedIndexToInsert = nestedTestPassed ? trueCondition : falseCondition;
			monkeysWithWorries[nestedIndexToInsert] ??= [];
			monkeysWithWorries[nestedIndexToInsert].push(nestedWorryLevel);
		}
	}
}
console.log(monkeysWithWorries);

function updateWorryLevelByOperation(operation: OPERATIONS, multiplier: NUMBER_IN_STRING, worry: number): number {
	const realMultiplier: number = multiplier === "old" ? worry : +multiplier;
	switch (operation) {
		case "+":
			return worry + realMultiplier;
		case "-":
			return worry - realMultiplier;
		case "*":
			return worry * realMultiplier;
		case "/":
			return worry / realMultiplier;
	}
}
