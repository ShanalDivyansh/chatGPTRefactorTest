import { appendFile } from "fs/promises";
import { readFile } from "fs/promises";
import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import { writeFile } from "fs/promises";
import fileNames from "./splitFile.mjs";
config();

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY,
  })
);
(async () => {
  for (let i = 0; i < fileNames.length; i++) {
    const file = await readFile(
      new URL(`Original_Code/${fileNames[i]}`, import.meta.url),
      "utf-8"
    );
    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `refactor the following code - ${file} give only refactored code no explaination`,
        },
      ],
    });

    const answer = res.data.choices[0].message.content.trim();
    await writeFile(`./Refactor_Code/refactor${i}.py`, `${answer}`);
    console.log("Data has been added to the file successfully.");
  }
})();
