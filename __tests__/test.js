import { test, expect } from '@jest/globals';

import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import parse from '../parsers.js'
import genDiff from '../index.js'
import stylish from '../stylish.js'
import plain from '../plain.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const getFileContent = (fileName) => {
    return readFileSync(getFixturePath(fileName), 'utf-8');
}; 

const expected1 = getFileContent('nested.txt').trim();
const expected2 = getFileContent('plain.txt').trim();
const expected3 = getFileContent('json.txt').trim();


test ('stylish diff', () => {
    const actual = genDiff(getFixturePath(path1), getFixturePath(path2), 'stylish');
    expect(actual).toBe(expected1);
});

test ('plain diff', () => {
    const actual = genDiff((getFixturePath(path1), getFixturePath(path2), 'plain'));
    expect(actual).toBe(expected2);
});

//test ('json diff', () => {
    //const actual = plain(genDiff(firstYml, secondYml, 'json'));
   // expect(actual).toBe(expected3);
//});
