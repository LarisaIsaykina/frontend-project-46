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
      result += `      ${key}: ${mergedData[key]}\n`; 
      } else if (state === 'added') {
      result += `    + ${key}: ${mergedData[key]}\n`;
      } else if (state === 'deleted') {
        result += `    - ${key}: ${mergedData[key]}\n`;
      } else {
          result += `    - ${key}: ${data1[key]}\n`; 
          result += `    + ${key}: ${mergedData[key]}\n`; 
      }
      });
    return `${result}}`;
  };
export default stringify;