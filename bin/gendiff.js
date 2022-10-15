#!/usr/bin/env node
import {  Command } from 'commander';
import fs from 'fs';
import path from 'path';
import process from 'node:process';
import _ from 'lodash';

  const getStates = (data1, data2) => {
    const result = {};
    const keys1 = Object.keys(data1);
    const keys2 = Object.keys(data2);
    const mergedKeys = Array.from(new Set([...keys1, ...keys2]));
  
    mergedKeys.forEach((key) => {
      if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
        result[key] = 'deleted';
      } else if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
        result[key] = (data1[key] === data2[key]) ? 'unchanged' : 'changed';
      } else {
        result[key] = 'added';
      }
    });
     return result;
  };
      
  const stringify = (data1,  data2) => {
    const statesData = getStates(data1, data2);
    const mergedData = Object.assign({}, data1, data2); 
    const sortedKeys = _.orderBy(Object.keys(mergedData));
    let result = '{\n';
    
    sortedKeys.forEach((key) => { 
  
      const state = statesData[key];
      
      if (state === 'unchanged') {
      result += `  ${key}: ${mergedData[key]}\n`; 
      } else if (state === 'added') {
      result += `+ ${key}: ${mergedData[key]}\n`;
      } else if (state === 'deleted') {
        result += `- ${key}: ${mergedData[key]}\n`;
      } else {
          result += `- ${key}: ${data1[key]}\n`; 
          result += `+ ${key}: ${mergedData[key]}\n`; 
      }
      });
    return `${result}}`;
  };

const program = new Command();

program
.name('gendiff')
.description( 'Compares two configuration files and shows a difference.')
.version('0.0.1', '-V, --version', 'output the version number')
.option('-f, --format <type>', 'output format')
.arguments('<filepath1> <filepath2>' )
.action((filepath1, filepath2) => {
 
    const content1 = fs.readFileSync(path.resolve(process.cwd(), filepath1), 'utf-8');
    const content2 = fs.readFileSync(path.resolve(process.cwd(), filepath2), 'utf-8');
    const dataOne = JSON.parse(content1);
    const dataTwo = JSON.parse(content2);
   
    console.log(stringify(dataOne, dataTwo));
    return stringify(dataOne, dataTwo);

})

.parse();