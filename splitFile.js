import { writeFile } from "fs";
import { readFile } from "fs/promises";

const file = await readFile(
  new URL("beforeFinal.csv", import.meta.url),
  "utf-8"
);

const fileData = file.split("-End");
console.log(fileData.length);
let counter = 0;
for (let i = 1; i < fileData.length; i++) {
  if (fileData[i].split("\n").length > 20) {
    counter++;
    await writeFile(`./Original_Code/code${i}.py`, `${fileData[i]}`, () => {
      counter++;
    });
  }
}
console.log(counter);
