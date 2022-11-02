import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import process from 'node:process';
import parse from '../parsers.js';


const genDiff = (filepath1, filepath2) => {

  const content1 = fs.readFileSync(path.resolve(process.cwd(), filepath1), 'utf-8');
  const content2 = fs.readFileSync(path.resolve(process.cwd(), filepath2), 'utf-8');

  const data1 = parse(content1, filepath1);
  const data2 = parse(content2, filepath2);

  const dataKeys = _.union(_.keys(data1), _.keys(data2));
  const addNode = (key) => {
    if (!_.has(data1, key)) {
      return { name: key, status: 'added', value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { name: key, status: 'deleted', value: data1[key] };
    }
    if (data1[key] === data2[key]) {
      return { name: key, status: 'unchanged', value: data1[key] };
    }
    return (!_.isObject(data1[key]) || !_.isObject(data2[key]))
      ? {
        name: key, status: 'changed', previousValue: data1[key], currentValue: data2[key],
      }
      : { name: key, status: 'nested', children: genDiff(data1[key], data2[key]) };
  };
  return dataKeys.map((key) => addNode(key));
};
export default genDiff;