import { rm, writeFile, rename } from "fs/promises";
import { resolve, parse } from "path";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { checkFile, checkDirectory } from "./utils.js";

export class Files {
  async cat(pathToFile) {
    const resolvedPath = await checkFile(pathToFile);

    return new Promise((resolve, reject) => {
      const readStream = createReadStream(resolvedPath);
      readStream.on("error", reject);
      readStream.on("data", (data) => console.log(data.toString()));
      readStream.on("end", resolve);
    });
  }

  async add(pathToFile) {
    await writeFile(pathToFile, "", { flag: "wx" });
  }

  async rn(pathToFile, newFileName) {
    const resolvedPath = await checkFile(pathToFile);
    await rename(resolvedPath, newFileName);
  }

  async cp(pathToSourceFile, pathToNewDir) {
    const resolvedPathToFile = await checkFile(pathToSourceFile);
    const resolvedPathToNewDir = await checkDirectory(pathToNewDir);
    const fileName = parse(resolvedPathToFile).base;

    const readStream = createReadStream(resolvedPathToFile);
    const writeStream = createWriteStream(
      resolve(resolvedPathToNewDir, fileName)
    );
    await pipeline(readStream, writeStream);
  }

  async mv(pathToSourceFile, pathToTargetDirectory) {
    await this.cp(pathToSourceFile, pathToTargetDirectory);
    await this.rm(pathToSourceFile);
  }

  async rm(pathToFile) {
    const resolvedPath = await checkFile(pathToFile);
    await rm(resolvedPath);
  }
}
