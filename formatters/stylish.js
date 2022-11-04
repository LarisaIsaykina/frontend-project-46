import _ from 'lodash';

const symbols = {
  unchanged: ' ',
  added: '+',
  deleted: '-',
  nested: ' ',
};

const indent = 4;
const setIndent = (depth, spaces = 2) => ' '.repeat(depth * indent - spaces);

const stringify = (value, depth) => {
  if (!_.isObject(value)) return value;
  return `{\n${Object.entries(value).map(([key, val]) => `${setIndent(depth)}  ${key}: ${stringify(val,
    depth + 1)}`).join('\n')}\n${setIndent(depth - 1)}  }`;
};

const renderAst = (elem, depth) => {
  switch (elem.state) {
    case 'added':
    case 'deleted':
    case 'unchanged':
      return `${setIndent(depth)}${symbols[elem.state]} ${elem.name}: ${stringify(elem.value, depth + 1)}`;
    case 'changed':
      return `${setIndent(depth)}${symbols.deleted} ${elem.name}: ${stringify(elem.previousValue,
        depth + 1)}\n${setIndent(depth)}${symbols.added} ${elem.name}: ${stringify(elem.currentValue, depth + 1)}`;
    case 'nested':
      return `${setIndent(depth)}${symbols[elem.state]} ${elem.name}: {\n${elem.children
        .map((element) => renderAst(element, depth + 1)).join('\n')}\n  ${setIndent(depth)}}`;
    default:
      throw new Error('Unknown state!');
  }
};

const stylish = (astDifference) => `{\n${astDifference.map((elem) => renderAst(elem, 1)).join('\n')}\n}`;
export default stylish;