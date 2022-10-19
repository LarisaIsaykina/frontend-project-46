import _ from 'lodash';

const getDiff = (data1, data2) => {
   const keys1 = Object.keys(data1);
    const keys2 = Object.keys(data2);
    const mergedKeys = Array.from(new Set([...keys1, ...keys2]));
  
   
    mergedKeys.forEach((key) => {
      if (!Object.hasOwn(data1, key)) {
        result[`+${key}`] = data2[key];
      } else if (!Object.hasOwn(data2, key)) {
        result[`-${key}`] = data1[key];
      } else if (data1[key] === data2[key]) {
        result[key] = data1[key];
      } else {
        if (!_.isObject(data2[key]) && !Array.isArray(data2[key])) {
          result[`-${key}`] = data1[key];
          result[`+${key}`] = data2[key];
        } else {
          const value1 = data1[key];
          const value2 = data2[key];
          result[key] = getDiff(value1, value2);
        }
      } 
      });
     console.log(result);
     return result;
  };
      
  const  stringify = (diffTree) => {
    const sortedKeys = _.orderBy(Object.keys(diffTree));
    let result = '{\n';
    
    sortedKeys.map((key) => { 
  
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



export default stringify;