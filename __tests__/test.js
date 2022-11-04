import { test, expect } from '@jest/globals';

import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../factory.js'



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const getFileContent = (fileName) => {
    return readFileSync(getFixturePath(fileName), 'utf-8');
}; 
const absolutePath1 = getFixturePath('file1.json');
const absolutePath2 = getFixturePath('file2.yml');

const expected1 = getFileContent('stylish.txt').trim();
const expected2 = getFileContent('plain.txt').trim();
const expected3 = getFileContent('json.txt').trim();


test ('stylish diff', () => {
    const actual = genDiff(absolutePath1, absolutePath2, 'stylish');
    expect(actual).toBe(expected1);
});

test ('plain diff', () => {

    const actual = genDiff(absolutePath1, absolutePath2,  'plain');
    expect(actual).toBe(expected2);
});

test ('json diff', () => {
    const actual = genDiff(absolutePath1, absolutePath2, 'json');
    expect(actual).toBe(expected3);
});
