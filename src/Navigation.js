import { readdir } from "node:fs/promises";
import { resolve, sep } from "path";

import { chdir } from "node:process";
import { checkDirectory } from "./utils.js";

export class Navigation {
  up() {
    process.chdir("..");
  }

  async ls() {
    const items = await readdir(process.cwd(), { withFileTypes: true });
    const files = items
      .filter((item) => item.isFile())
      .map((file) => ({ name: file.name, type: "file" }))
      .sort((fileA, fileB) => fileA.name.localeCompare(fileB.name));
    const directories = items
      .filter((item) => item.isDirectory())
      .map((dir) => ({ name: dir.name, type: "directory" }))
      .sort((dirA, dirB) => dirA.name.localeCompare(dirB.name));

    console.table([...directories, ...files]);
  }

  async cd(dir) {
    const pathDirectory = await checkDirectory(dir);
    const currentDirectory = process.cwd();
    const newPath = resolve(currentDirectory, pathDirectory);
    chdir(newPath);
  }
}
