import { writeFile } from 'fs/promises';
import { SerializedSubtree } from '../tree/types';

/**
 * TODO: need a schema for validating and typifying the state
 */

export async function saveStateTo(state: SerializedSubtree, path: string) {
    console.info('Saving state');
    const content = JSON.stringify(state);
    await writeFile(path, content, 'utf-8');
    console.info(`State saved to: ${path}`);
}
