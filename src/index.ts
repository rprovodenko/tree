import { getArgs } from './cli-util/get-args';
import { pollStdIn } from './cli-util/poll-stdin';
import { applyCommandToTree } from './apply-command-to-tree';
import { CommandType } from './parse-line/command';
import { loadStateFrom } from './state-persistance/load-state-from';
import { saveStateTo } from './state-persistance/save-state-to';
import { initializeTree } from './tree/tree';

async function start() {
    const args = getArgs();
    const loadedState = args.loadStateFrom
        ? await loadStateFrom(args.loadStateFrom)
        : undefined;

    const tree = await initializeTree(loadedState);
    console.info(
        'You can start issuing commands. To exit type EXIT and hit enter.'
    );
    let exit = false;
    while (!exit) {
        const command = await pollStdIn();
        // TODO create UNKNOWN_COMMAND instead
        if (command === null) {
            continue;
        }
        if (command.type === CommandType.EXIT) {
            exit = true;
            continue;
        }
        try {
            const output = applyCommandToTree(tree, command);
            if (output) {
                console.log(output);
            }
        } catch (e) {
            if (e instanceof Error) {
                console.error(e.message);
            } else {
                throw e;
            }
        }
    }
    if (args.saveStateTo) {
        const currentState = tree.serialize();
        await saveStateTo(currentState, args.saveStateTo);
    }
}

start().catch((e) => {
    console.error(e);
    process.exit(1);
});
