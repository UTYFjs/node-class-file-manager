import { Compress } from "./Compress.js";
import {
  ERROR_INVALID_INPUT,
  ERROR_NO_SUCH_DIRECTORY,
  ERROR_NO_SUCH_FILE,
  ERROR_OPERATION_FAILED,
  ERROR_FILE_ALREADY_EXIST,
} from "./constants.js";
import { Files } from "./Files.js";
import { Hash } from "./Hash.js";

import { Navigation } from "./Navigation.js";
import { OS } from "./Os.js";

export class Handler {
  constructor() {
    this.navigation = new Navigation();
    this.files = new Files();
    this.os = new OS();
    this.hash = new Hash();
    this.compress = new Compress();
  }

  async handleOperation(input) {
    const [operation, ...rest] = input.split(/(?<!\\) /);
    const args = rest.filter(Boolean).map((arg) => arg.replaceAll("\\ ", " "));
    try {
      switch (operation) {
        case "up": {
          this.#validateNumberOfArgs(args, 0);
          this.navigation.up();
          break;
        }
        case "ls": {
          this.#validateNumberOfArgs(args, 0);
          await this.navigation.ls();
          break;
        }
        case "cd": {
          this.#validateNumberOfArgs(args, 1);
          const [targetDir] = args;
          await this.navigation.cd(targetDir);
          break;
        }
        case "cat": {
          this.#validateNumberOfArgs(args, 1);
          const [pathToFile] = args;
          await this.files.cat(pathToFile);
          break;
        }
        case "add": {
          this.#validateNumberOfArgs(args, 1);
          const [pathToFile] = args;
          await this.files.add(pathToFile);
          break;
        }
        case "rn": {
          this.#validateNumberOfArgs(args, 2);
          const [pathToFile, newFileName] = args;
          await this.files.rn(pathToFile, newFileName);
          break;
        }
        case "cp": {
          this.#validateNumberOfArgs(args, 2);
          const [pathToFile, pathToDirectory] = args;
          await this.files.cp(pathToFile, pathToDirectory);
          break;
        }
        case "mv": {
          this.#validateNumberOfArgs(args, 2);
          const [pathToFile, pathToDirectory] = args;
          await this.files.mv(pathToFile, pathToDirectory);
          break;
        }
        case "rm": {
          this.#validateNumberOfArgs(args, 1);
          const [pathToFile] = args;
          await this.files.rm(pathToFile);
          break;
        }
        case "os": {
          this.#validateNumberOfArgs(args, 1);
          const [flag] = args;
          this.os.handleFlag(flag);
          break;
        }
        case "hash": {
          this.#validateNumberOfArgs(args, 1);
          const [pathToFile] = args;
          await this.hash.calcHash(pathToFile);
          break;
        }
        case "compress":
        case "decompress": {
          this.#validateNumberOfArgs(args, 2);
          const [pathToInputFile, pathToOutputFile] = args;
          await this.compress.archive(
            pathToInputFile,
            pathToOutputFile,
            operation === "decompress"
          );
          break;
        }
        case ".exit": {
          process.exit();
        }

        default: {
          throw new Error(ERROR_INVALID_INPUT);
        }
      }
    } catch (error) {
      if (
        error?.message === ERROR_INVALID_INPUT ||
        error?.message === ERROR_NO_SUCH_DIRECTORY ||
        error?.message === ERROR_NO_SUCH_FILE ||
        error?.message === ERROR_FILE_ALREADY_EXIST
      ) {
        throw new Error(error.message);
      }

      throw new Error(ERROR_OPERATION_FAILED);
    }
  }

  #validateNumberOfArgs(args, number) {
    if (args.length !== number) {
      throw new Error(ERROR_INVALID_INPUT);
    }
  }
}
