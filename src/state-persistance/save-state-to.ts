import {writeFile} from "fs/promises";

/**
 * TODO: need a schema for validating and typifying the state
 */

export async function saveStateTo(state: unknown, path: string) {
    const content = JSON.stringify(state);
    await writeFile(path, content, "utf-8")
}
