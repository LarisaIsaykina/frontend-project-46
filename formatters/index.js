import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const render = (tree, format) => {
    if (format === 'stylish') {
        return stylish(tree);
    } if (format === 'plain') {
        return plain(tree);
    } else {
        return json(tree);
    }
};

export default render;