import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import process from 'node:process';
import parse from './parsers.js';
import generateTree from './treeGenerator.js';
import render from './factory.js';


const genDiff = (filepath1, filepath2, format) => {
  const content1 = fs.readFileSync(path.resolve(process.cwd(), filepath1), 'utf-8');
  const content2 = fs.readFileSync(path.resolve(process.cwd(), filepath2), 'utf-8');
  const data1 = parse(content1, filepath1);
  const data2 = parse(content2, filepath2);
  const tree = generateTree(data1, data2);

return render(tree, format);

};
 
export default genDiff;