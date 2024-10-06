import { readFile } from 'fs/promises';
import { SerializedSubtree } from '../tree/types';
/**
 * TODO: in production setting we'd need at least schema validation
 */

export async function loadStateFrom(path: string): Promise<SerializedSubtree> {
    console.info('Loading state');
    const contents = await readFile(path, { encoding: 'utf-8' });
    const parsed = JSON.parse(contents);
    console.info(`State loaded from: ${path}`);
    return parsed;
}
