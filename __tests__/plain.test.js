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
console.log(getFileContent('plainDiff.json'));

const expectedData = getFileContent('plainDiff.json').replace(/"|,/g,'');



test ('plain stringifily diff', () => {
    expect(stringify(firstData, secondData)).toBe(expectedData);
});