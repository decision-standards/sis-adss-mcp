import fs from "fs/promises";
import path from "path";
import { fullAnalysis } from "./tools/adss/fullAnalysis.js";

async function run() {
  const filePath = path.resolve(
    process.cwd(),
    "examples/adss-v0.1.example.json"
  );

  const text = await fs.readFile(filePath, "utf-8");
  const system = JSON.parse(text);

  const result = await fullAnalysis(system);
  console.log(result.content[0].text);
}

run();