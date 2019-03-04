#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const cli = require("./cli/index");

function walkArray(array, level = 0) {
  for (let index = 0; index < array.length; index++) {
    const folder = array[index];

    if (Array.isArray(folder)) {
      if (typeof folder === "string") {
        return walkArray(folder, level);
      }
    } else {
      return folder;
    }
  }

  return array;
}

function folderSearch(folder, search) {
  const join = path.join(folder, "/");
  const folders = fs.readdirSync(join);

  const data = folders.map(directory => {
    const newDir = path.join(join, directory);

    if (directory !== search) {
      return folderSearch(newDir, search);
    } else {
      return newDir;
    }
  });

  return walkArray(data);
}
