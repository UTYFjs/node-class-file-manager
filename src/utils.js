import { stat } from "fs/promises";
import { sep, resolve, parse } from "path";
import { ERROR_NO_SUCH_DIRECTORY, ERROR_NO_SUCH_FILE } from "./constants.js";

export const checkPath = async (path) => {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
};

export const checkDirectory = async (path) => {
  const isPath = await checkPath(path.trim());
  if (isPath) {
    const resolvedPath = resolve(path.trim() + sep);
    return resolvedPath;
  } else {
    throw new Error(ERROR_NO_SUCH_DIRECTORY);
  }
};

export const checkFile = async (path) => {
  const isPath = await checkPath(path.trim());
  if (isPath) {
    const resolvedPath = resolve(process.cwd(), path.trim());
    const parsedPath = parse(resolvedPath);
    if (parsedPath.base) {
      return resolvedPath;
    }
    throw new Error("Operation failed");
  } else {
    throw new Error(ERROR_NO_SUCH_FILE);
  }
};
