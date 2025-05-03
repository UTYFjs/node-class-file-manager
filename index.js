import FileManager from "./src/FileManager.js";
const userName = process.env.npm_config_username;

// console.log("The area is => ", userName);

const fileManager = new FileManager(process.env.npm_config_username);

fileManager.start();
