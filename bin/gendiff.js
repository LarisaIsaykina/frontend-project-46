#!/usr/bin/env node
import {  Command } from 'commander';
import fs from 'fs';
import path from 'path';
import process from 'node:process';
import genDiff  from '../index.js';
import stylish from '../stylish.js'

import parse from '../parsers.js';


const program = new Command();

program
.name('gendiff')
.description( 'Compares two configuration files and shows a difference.')
.version('0.0.1', '-V, --version', 'output the version number')
.option('-f, --format <type>', 'output format')
.arguments('<filepath1> <filepath2>' )
. option('-f, --format [type]', 'output format')
.action((filepath1, filepath2) => {
 
    const content1 = fs.readFileSync(path.resolve(process.cwd(), filepath1), 'utf-8');
    const content2 = fs.readFileSync(path.resolve(process.cwd(), filepath2), 'utf-8');

    const dataOne = parse(content1, filepath1);
    const dataTwo = parse(content2, filepath2);
    console.log(genDiff(dataOne, dataTwo, program.format));

})

.parse();