/**
 * Styleguide
 */

import gulp from 'gulp';
import path from 'path';
import assemble from 'fabricator-assemble';

import config from './config/general';


const sourcePath = path.join(config.root.dev, config.styleguide.dev);
const distPath = path.join(config.root.dist, config.styleguide.dist);
const styleguideConfig = {
    'layout': 'default',
    'layouts': sourcePath + '/views/layouts/*',
    'layoutIncludes': sourcePath + '/views/layouts/includes/*',
    'views': [
        sourcePath + '/views/**/*',
        '!' + sourcePath + '/views/+(layouts)/**'
    ],
    'materials': sourcePath + '/materials/**/*',
    'data': sourcePath + '/data/**/*.{json,yml}',
    'docs': sourcePath + '/docs/**/*.md',
    'keys': {
        'materials': 'materials',
        'views': 'views',
        'docs': 'docs'
    },
    'helpers': {},
    'logErrors': false,
    'dest': distPath + '/'
};

console.log(styleguideConfig);


const styleguide = () => {

    return assemble(styleguideConfig);
};


export default styleguide;
