import fs from "fs/promises";
import path from "path";
import { validateAndMapAdss } from "./tools/adss/validateAndMap.js";

async function run() {
  const filePath = path.resolve(
    process.cwd(),
    "examples/adss-v0.1.example.json"
  );

  const text = await fs.readFile(filePath, "utf-8");
  const system = JSON.parse(text);

  const result = await validateAndMapAdss(system);
  console.log(result.content[0].text);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});