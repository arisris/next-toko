import fs from "fs/promises";
import path from "path";

export async function getJsonData(filename: string) {
  try {
    const json = await fs.readFile(
      path.join(process.cwd(), `/lib/data/${filename}.json`),
      "utf-8"
    );
    return JSON.parse(json);
  } catch (e) {
    throw e;
  }
}
