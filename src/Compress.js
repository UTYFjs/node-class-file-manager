import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { pipeline } from "stream/promises";
import { checkIsFileExist } from "./utils.js";

export class Compress {
  async archive(inputFilePath, outputFilePath, shouldDecompress = false) {
    const inputStream = createReadStream(inputFilePath);
    await checkIsFileExist(outputFilePath);
    const outputStream = createWriteStream(outputFilePath, { flags: "wx" });
    const archiveStream = shouldDecompress
      ? createBrotliDecompress()
      : createBrotliCompress();

    await pipeline(inputStream, archiveStream, outputStream);
  }
}
