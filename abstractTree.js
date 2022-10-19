const getDiff = (data1, data2) => {
  
const mergedData = Object.assign({}, data1, data2);
  
  const iter = (current, acc) => {

    const keys = Object.keys(current);
  
    keys.forEach((key) => {
      
        acc[key] = {};
        acc[key].name = key;
        acc[key].state = 'added';

      if (current[key] === 'object' && !Array.isArray(current[key])) {
        acc[key].children = [iter(current[key], {})];
      }

      if (!Object.hasOwn(data1, key)) {
        
      } else if (!Object.hasOwn(data2, key)) {
        acc[key] = data1[key];
      } else if (data1[key] === iter(data2[key])) {
        acc[key] = data1[key];
      } else {
        if (typeof (data2[key]) !== 'object' && !Array.isArray(data2[key])) {
          acc[key] = data1[key];
          acc[key] = data2[key];
        } else {
          const value1 = data1[key];
          const value2 = data2[key];
          acc[key] = getStates(value1, value2);
        }
      } return acc;
    })
  };

     return iter(mergedData, {});
  };
