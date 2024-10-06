export interface Parameters {
    loadStateFrom?: string;
    saveStateTo?: string;
}

export function getArgs() {
    const args = process.argv.slice(2);
    const parsedArgs: Parameters = {};

    args.forEach((arg) => {
        const [key, value] = arg.split('=');
        if (key === '--load-state') {
            parsedArgs['loadStateFrom'] = value;
            return;
        }
        if (key === '--save-state') {
            parsedArgs['saveStateTo'] = value;
            return;
        }
        throw new Error(
            `Unknown argument provided: ${key}. Correct usage: npm start [--load-state=/saved/state/location] [--save-state=/where/i/want/to/save/state]`
        );
    });
    return parsedArgs;
}
