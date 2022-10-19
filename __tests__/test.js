import { test, expect } from '@jest/globals';

import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import parse from '../parsers.js'
import genDiff from '../index.js'
import stylish from '../stylish.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const getFileContent = (fileName) => {
    return readFileSync(getFixturePath(fileName), 'utf-8');
};
const firstJson = parse(getFileContent('file1.json'), 'file1.json');
const secondJson = parse(getFileContent('file2.json'),  'file2.json');

const firstYaml =  parse(getFileContent('file1.yml'),  'file1.yml');

const secondYaml =  parse(getFileContent('file2.yml'),  'file2.yml');

const expectedPlain = getFileContent('nested.txt').trim();

test ('plain .json stringify diff', () => {
    const actual = stylish(genDiff(firstJson, secondJson));
    expect(actual).toBe(expectedPlain);
});

//test ('plain .yaml stringify diff', () => {
   // console.log(firstYaml);
   // const actual = stringify(firstYaml, secondYaml);
   // expect(actual).toBe(expectedPlain);
//});


