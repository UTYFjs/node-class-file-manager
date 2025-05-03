import {
  ERROR_INVALID_INPUT,
  ERROR_NO_SUCH_DIRECTORY,
  ERROR_OPERATION_FAILED,
} from "./constants.js";

import { Navigation } from "./Navigation.js";

export class Handler {
  constructor() {
    this.navigation = new Navigation();
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
        default: {
          throw new Error(ERROR_INVALID_INPUT);
        }
      }
    } catch (error) {
      if (
        error?.message === ERROR_INVALID_INPUT ||
        error?.message === ERROR_NO_SUCH_DIRECTORY
      ) {
        throw new Error(error?.message);
      }

      throw new Error(ERROR_OPERATION_FAILED);
    }
  }

  #validateNumberOfArgs(args, number) {
    if (args.length !== number) {
      throw new Error(ERROR_INVALID_INPUT);
    }
  }

  //   _validateNumberOfArgs(args, number) {
  //     if (args.length !== number) {
  //       throw new Error(
  //         `${ERROR_INVALID_INPUT_NUMBER_ARGS}  Only ${number} arguments are supported.`
  //       );
  //     }
  //   }
}
