import { EOL, homedir, userInfo, cpus as getCpus, arch } from "os";
import { ERROR_INVALID_INPUT } from "./constants.js";

export class OS {
  handleFlag(flag) {
    switch (flag) {
      case "--EOL": {
        console.log(JSON.stringify(EOL));
        break;
      }
      case "--cpus": {
        const cpus = getCpus().map(({ model, speed }) => ({ model, speed }));
        console.log(`Number of CPUs: ${cpus.length}`);
        console.table(cpus);
        break;
      }
      case "--homedir": {
        console.log(homedir());
        break;
      }
      case "--username": {
        const { username } = userInfo();
        console.log(username);
        break;
      }
      case "--architecture": {
        console.log(arch());
        break;
      }
      default: {
        throw new Error(ERROR_INVALID_INPUT);
      }
    }
  }
}
