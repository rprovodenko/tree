import { tmpdir } from 'os';
import { join } from 'path';
import { mkdir } from 'fs/promises';
import { saveStateTo } from './save-state-to';
import { loadStateFrom } from './load-state-from';

describe('saveStateTo', () => {
    let tempDir = '';
    beforeAll(async () => {
        const randomDirName = `./tmp_${Math.random()
            .toString(36)
            .substring(2, 10)}`;
        tempDir = join(tmpdir(), randomDirName);
        await mkdir(tempDir);
    });

    it('save state in given location', async () => {
        const location = join(tempDir, './test-state.json');
        await saveStateTo(
            [
                {
                    name: 'child1a',
                    path: '/',
                },
            ],
            location
        );
        const readState = await loadStateFrom(location);
        expect(readState).toEqual([{ name: 'child1a', path: '/' }]);
    });
});
