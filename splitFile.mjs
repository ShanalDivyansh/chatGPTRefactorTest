import { writeFile } from "fs";
import { readFile } from "fs/promises";

const file = await readFile(
  new URL("beforeFinal.csv", import.meta.url),
  "utf-8"
);

const fileData = file.split("-End");
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
