const alphabetValues = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
  A: 27,
  B: 28,
  C: 29,
  D: 30,
  E: 31,
  F: 32,
  G: 33,
  H: 34,
  I: 35,
  J: 36,
  K: 37,
  L: 38,
  M: 39,
  N: 40,
  O: 41,
  P: 42,
  Q: 43,
  R: 44,
  S: 45,
  T: 46,
  U: 47,
  V: 48,
  W: 49,
  X: 50,
  Y: 51,
  Z: 52,
};
export const a = "";
const result = await Deno.readTextFile("third.txt");
const ruksacks = result.split("\n");
let sum = 0;
for (let i = 0; i < ruksacks.length; i++) {
  const element = ruksacks[i];
  const firstHalf = element.substring(0, element.length / 2),
    secondHalf = element.substring(element.length / 2, element.length);
  const matchingElement = findMatchingTextInTwoStrings(firstHalf, secondHalf);
  const value = alphabetValues[matchingElement];
  sum += value;
}
console.log("sum", sum);
sum = 0;
for (let i = 0; i < ruksacks.length; i++) {
	const e1 = ruksacks[i];
	const e2 = ruksacks[i + 1];
	const e3 = ruksacks[i + 2];
	const matchingELement = findMatchingCharInThreeStrings(e1, e2, e3);
	const value = alphabetValues[matchingELement];
	sum += value;
	i = i + 2;
}

console.log("sum", sum);

function findMatchingCharInThreeStrings(str1: string, str2: string, str3: string): string {
	let result = "";
	for (let i = 0; i < str1.length; i++) {
		const element = str1[i];
		if (str2.includes(element) && str3.includes(element)) {
			return element;
		}
	}
	return result;
}


function findMatchingTextInTwoStrings(firstHalf: string, secondHalf: string): string {
  let result = "";
  for (let i = 0; i < firstHalf.length; i++) {
    const element = firstHalf[i];
    if (secondHalf.includes(element)) {
      return element;
    }
  }
  return result;
}
