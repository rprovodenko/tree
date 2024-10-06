import {readFile} from "fs/promises";
/**
 * TODO: in production setting we'd need at least schema validation
 */

export async function loadStateFrom(path: string) {
    const contents = await readFile(path, {encoding: "utf-8"})
    return JSON.parse(contents);
}
