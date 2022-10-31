const stylish = (tree, replacer = ' ', spacesCount = 1) => {
  const iter = (node, depth) => {

    if (typeof node !== 'object') {
      return `${node}`;
    }

    const indentSize = depth * spacesCount;
    console.log(indentSize);

    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    let lines = '';
    const value = node.value;
    const previousValue = node.previousValue;
    const currentValue = node.currentValue;

    if (node.status === 'added') {
      lines += `${currentIndent}+${node.name}: ${iter(value, depth + 1)}`
    } if (node.status === 'deleted') {
      lines += `${currentIndent}-${node.name}: ${iter(value, depth + 1)}`
    } if (node.status === 'unchanged') {
      lines += `${currentIndent + 1}${node.name}: ${iter(value, depth + 1)}`
    }
    if (node.status === 'changed') {
      lines += `${currentIndent}${node.name}: -${iter(previousValue, depth + 1)}\n${currentIndent}+${iter(currentValue, depth + 1)}`
    } else {
      lines += `${currentIndent}${node.name}: ${node.children.map((child) => {
        iter(child, depth + 1)})}`;
    }

    return `{${lines}${bracketIndent}\n}`;
  };
    const pieces = tree.map((branch) => {
      iter(branch, 1);
    });
  
  return`{\n${pieces.join('\n')}`;

  };

    
export default stylish;