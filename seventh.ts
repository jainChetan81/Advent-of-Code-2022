import { readFileSync } from "fs";
const input: string[] = readFileSync("seventh.txt", "utf8").split("\n"); //1267396
// const input: string[] = readFileSync("test.txt", "utf8").split("\n");

type FILE_SYSTEM = {
	type: "dir" | "file";
	size: number;
	name: string;
	children: FILE_SYSTEM[] | null;
	parent: string | null;
};
const fileTree: FILE_SYSTEM = {
	name: "/",
	type: "dir",
	size: 0,
	parent: null,
	children: [],
};

let currentDir = "/";
for (let i = 1; i < input.length; i++) {
	const element = input[i];
	// if the element contains $, it means it is a command
	if (element.includes("$")) {
		const command = element.split("$ ")[1];
		console.log(command);
		if (command.includes("cd")) {
			const dir = command.split("cd ")[1];
			// if we are going back, we need to find the parent of the current dir\
			// else just change the current dir to the new dir
			if (dir === "..") {
				// go back to parent
				const parent = findDir(currentDir, fileTree);
				if (parent && parent.parent) currentDir = parent.parent;
			} else currentDir = dir;
		}
	} else {
		// we only come here if the previous command is `ls` and now they are all children
		const [prefix, name] = element.split(" ");
		const isDir = prefix === "dir";
		const type = isDir ? "dir" : "file";
		const dir: FILE_SYSTEM = {
			name,
			type,
			size: isDir ? 0 : +prefix,
			children: [],
			parent: currentDir,
		};
		addChildrenToFileTree(currentDir, dir);
		if (!isDir) addFileSizeToDir(currentDir, +prefix);
	}
}
// printTree(fileTree);
const nodes = findALlDirWithSizeLessThan(fileTree, 100000);
const sum = findSum(nodes.dirs);
console.log(sum);
// console.log(findDir("nmsvc", fileTree));
function findDir(dir: string, tree: FILE_SYSTEM): FILE_SYSTEM | null {
	if (tree.name === dir) {
		return tree;
	}
	if (tree.children) {
		for (let i = 0; i < tree.children.length; i++) {
			const child = tree.children[i];
			const found = findDir(dir, child);
			if (found) {
				return found;
			}
		}
	}
	return null;
}

function addChildrenToFileTree(dir: string, file: FILE_SYSTEM) {
	const found = findDir(dir, fileTree);
	if (found) {
		found.children ? found.children.push(file) : (found.children = [file]);
	}
}

function addFileSizeToDir(dir: string, size: number) {
	const found = findDir(dir, fileTree);
	if (found && found.type === "dir") {
		found.size += size;
		if (found.parent) addFileSizeToDir(found.parent, size);
	}
}

function findALlDirWithSizeLessThan(tree: FILE_SYSTEM, size: number, dirs: FILE_SYSTEM[] = []) {
	if (tree.name !== "/" && tree.type === "dir" && tree.size <= size && tree.size > 0) {
		dirs.push(tree);
	}
	if (tree.children && Array.isArray(tree.children) && tree.children.length > 0) {
		for (let i = 0; i < tree.children.length; i++) {
			const element = tree.children[i];
			if (element.type === "dir") findALlDirWithSizeLessThan(element, size, dirs);
		}
	}
	return { dirs };
}

function findSum(nodes: any): number {
	let sum = 0;
	for (let i = 0; i < nodes.length; i++) {
		const node = nodes[i];
		sum += node.size;
	}
	return sum;
}

function printTree(tree: FILE_SYSTEM) {
	console.log({ name: tree.name, size: tree.size, parent: tree.parent });
	if (tree.children && Array.isArray(tree.children) && tree.children.length > 0) {
		for (let i = 0; i < tree.children.length; i++) {
			const element = tree.children[i];
			printTree(element);
		}
	}
}
