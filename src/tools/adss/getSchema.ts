import fs from "fs/promises";
import path from "path";

export async function getAdssSchema(version = "0.1") {
  const filePath = path.resolve(
    process.cwd(),
    `schemas/adss-v${version}.schema.json`
  );

  try {
    const schema = await fs.readFile(filePath, "utf-8");

    return {
      content: [
        {
          type: "text" as const,
          text: schema,
        },
      ],
    };
  } catch {
    return {
      content: [
        {
          type: "text" as const,
          text: `Schema not found for version ${version}`,
        },
      ],
      isError: true,
    };
  }
}