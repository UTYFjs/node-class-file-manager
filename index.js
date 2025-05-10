import FileManager from "./src/fileManager.js";
const userName = process.env.npm_config_username;

// console.log("The area is => ", userName);
function getUserNameNode20() {
  const string = process.argv.slice(2)[0];
  if (string && string.startsWith("--")) {
    const userName = string.split("=")[1];
    return userName;
  }
  return "";
}

const fileManager = new FileManager(
  process.env.npm_config_username || getUserNameNode20()
);

fileManager.start();
