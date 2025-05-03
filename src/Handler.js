import { ERROR_INVALID_INPUT, ERROR_OPERATION_FAILED } from "./constants.js";

export class Handler {
  constructor() {}

  async handleOperation(input) {
    try {
      switch (input) {
        default: {
          throw new Error(ERROR_INVALID_INPUT);
        }
      }
    } catch (error) {
      if (error?.message === ERROR_INVALID_INPUT) {
        throw new Error(ERROR_INVALID_INPUT);
      }

      throw new Error(ERROR_OPERATION_FAILED);
    }
  }
}
