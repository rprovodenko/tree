import { parseInputLine } from "../parse-line/parse-input-line";

async function readFromStdin(): Promise<string> {
    process.stdin.resume();
    return await new Promise((res, rej) => {
        let input = "";
        const listener = (data: Buffer) => {
            input += data.toString();
            if (input.includes("\n")) {
                process.stdin.pause();
                process.stdin.removeListener("data", listener);
                res(input.split("\n")[0])
            }
        }
        process.stdin.on("data", listener)
    })
}

export async function pollStdIn() {
    const inputLine = await readFromStdin();
    try {
        const command = parseInputLine(inputLine);
        return command
    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message)
            return null;
        }
        throw e;
    }
}
