import { createHash } from "crypto";
import { readFile } from "fs/promises";
import { basename } from "path";
import { checkFile } from "./utils.js";

export class Hash {
  async calcHash(pathToFile) {
    const resolvedPath = await checkFile(pathToFile);
    const content = await readFile(resolvedPath);
    const hash = createHash("sha256").update(content).digest("hex");
    console.log(`${hash} ${basename(pathToFile)}`);
  }
}
