import _ from 'lodash';

const stylish = (data, replacer = ' ', spaceCount = 1) => {
    data.forEach((node) => {
    const iter = (current, depth) => {
      if (!_.isObject(current)) {
        return String(current);
      }
      let currentString = '';
      const currerntEntries = Object.entries(current);
      currerntEntries.map(([key, currentValue]) => { // MAPresult isn't returned itselt(arr type)
        currentString += `${replacer.repeat(spaceCount * depth)}${key}: ${iter(currentValue, depth + 1)}\n`;
        return currentString; // return str fragments(one lvl) on each iteration
      });
      return iter(`{\n${currentString}${replacer.repeat(spaceCount * (depth - 1))}}`, depth + 1);
    }; 
    return iter(node, 1); 
})
};
export default stylish;


