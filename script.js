let { readdirSync, statSync } = require("fs");
let fs = require("fs");
const { join } = require("path");

const dirs = (p) =>
  readdirSync(p).filter((f) => statSync(join(p, f)).isDirectory());

const folders = dirs(__dirname).filter((str) => str !== "results");

const imgs = (dir) => {
  let arrOfImages = [];
  readdirSync(dir).forEach((file) => {
    arrOfImages.push(file);
  });
  return arrOfImages;
};

folders.forEach((folder) => {
  let arrOfComics = imgs(folder);
  arrOfComics.forEach((file) => {
    let oldPath = `${folder}/${file}`;
    let newPath = `results/${file}`;
    fs.rename(oldPath, newPath, function (err) {
      if (err) throw err;
      console.log("Successfully renamed - AKA moved!");
    });
  });
});
