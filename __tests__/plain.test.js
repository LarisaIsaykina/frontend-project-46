import { test, expect } from '@jest/globals';

import stringify from '../index.js';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const getFileContent = (fileName) => {
    return readFileSync(getFixturePath(fileName), 'utf-8');
};
const firstData = JSON.parse(getFileContent('file1.json'));
const secondData = JSON.parse(getFileContent('file2.json'));

const expectedData = getFileContent('plainDiff.json').trim().replace(/"|,/g,'');

test ('plain stringify diff', () => {
    const actual = stringify(firstData, secondData);
    console.log(actual);
    console.log(expectedData);

    expect(actual).toEqual(expectedData);
});