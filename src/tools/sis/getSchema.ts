import fs from "fs/promises";
import path from "path";

export async function getSisSchema(version = "0.2") {
  const filePath = path.resolve(
    process.cwd(),
    `schemas/sis-v${version}.schema.json`
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