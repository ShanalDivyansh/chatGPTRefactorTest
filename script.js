import { appendFile } from "fs/promises";
import { readFile } from "fs/promises";
import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";

config();

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY,
  })
);

(async () => {
  const file = await readFile(
    new URL("python/test.csv", import.meta.url),
    "utf-8"
  );
  const fileData = file.split(/",\s*|\s*"/);

  for (let i = 1; i < fileData.length; i = i + 2) {
    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `refactor the following code - ${fileData[i]} give only refactored code no explaination`,
        },
      ],
    });

    const answer = res.data.choices[0].message.content.trim();
    await appendFile(`refactor${i}.csv`, `"${answer}",\n\n`);
    console.log("Data has been added to the file successfully.");
  }
})();
