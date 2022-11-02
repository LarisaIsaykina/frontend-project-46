const parseToJson = (tree) => {
    return JSON.stringify(tree, null, '  ');
};

export default parseToJson;