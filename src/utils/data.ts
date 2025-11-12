import path from "path";
import { promises as fs } from "fs";

// Untuk client-side fetching
export function getDataPath(relativePath: string): string {
  return relativePath;
}

// Untuk server-side fetching
export async function getServerData() {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "data",
      "work-data.json"
    );
    const jsonData = await fs.readFile(filePath, "utf8");
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Error reading work data:", error);
    return { workData: [] };
  }
}
