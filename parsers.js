import path from 'path';
import yaml from 'js-yaml';

const parse = (data, fileName) => path.extname(fileName) === '.json' ? JSON.parse(data) : yaml.load(data);

export default parse;
