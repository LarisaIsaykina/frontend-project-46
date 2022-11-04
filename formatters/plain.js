import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (_.isBoolean(value)) return value;
  if (_.isNumber(value)) return value;
  if (_.isNull(value)) return 'null';
  return `'${value}'`;
};

const plain = (ast, key = []) => _.compact(ast.map((elem) => {
  switch (elem.state) {
    case 'nested':
      return plain(elem.children, [...key, elem.name]);
    case 'added':
      return `Property '${[...key, elem.name].join('.')}' was added with value: ${stringify(elem.value)}`;
    case 'deleted':
      return `Property '${[...key, elem.name].join('.')}' was removed`;
    case 'changed':
      return `Property '${[...key, elem.name].join('.')}' was updated. From ${stringify(elem.previousValue)} to ${stringify(elem.currentValue)}`;
    default:
      return '';
  }
})).join('\n');

export default plain;
