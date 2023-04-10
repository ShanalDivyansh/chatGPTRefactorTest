import { existsSync,mkdirSync,writeFile } from "fs";
import { readFile } from "fs/promises";

const file = await readFile(
  new URL("beforeFinal.csv", import.meta.url),
  "utf-8"
);

const dir1 = './Original_Code';
const dir2 = './Refactor_Code';

if (!existsSync(dir1) || !existsSync(dir2)){
    mkdirSync(dir1);
    mkdirSync(dir2);

}

const fileData = file.split(`-End,"\n `);
console.log(`Total number of files read: ${fileData.length}`);
const fileNames = [];
let counter = 0;
for (let i = 1; i < fileData.length; i++) {
  if (fileData[i].split("\n").length > 20) {
    await writeFile(`./Original_Code/code${i}.py`, `${fileData[i]}`, (err) => {
      if (err) throw err;
    });
    fileNames.push(`code${i}.py`);
    counter++;
  }
}
console.log(counter);
console.log(fileNames);
export default fileNames;
