import { createInterface } from "readline";
import { EOL, homedir } from "os";
import { chdir, cwd, stdin, exit } from "node:process";

import { Handler } from "./Handler.js";

export default class FileManager {
  constructor(username) {
    this.username = username || "Anonumous";
    this.rl = createInterface(stdin);
    this.handler = new Handler();
  }

  start() {
    console.clear();
    if (!this.username)
      throw new Error(
        "noUser:  Please try again by passing username correctly in following way: --username=your_username"
      );

    console.log(`Welcome to the File Manager, ${this.username}!`);
    chdir(homedir());
    console.log(`You are currently in ${cwd()}`);

    this.rl.on("line", (input) => {
      const trimmedInput = input.trim();
      if (trimmedInput) {
        this.handler
          .handleOperation(trimmedInput)
          .catch((error) => {
            console.log("error from catche FileManager");
            console.log(error.message);
          })
          .finally(() => console.log(`You are currently in ${cwd()}`));
      }
    });

    process.on("SIGINT", () => {
      exit();
    });

    process.on("exit", () => {
      console.log(
        `${EOL}Thank you for using File Manager, ${this.username}, goodbye!`
      );
    });
  }
}
