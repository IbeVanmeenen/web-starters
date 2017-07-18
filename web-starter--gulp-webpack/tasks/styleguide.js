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
    'materials': sourcePath + '/materials/**/*.html',
    'data': sourcePath + '/data/**/*.{json,yml}',
    'docs': sourcePath + '/docs/**/*.md',
    'keys': {
        'materials': 'materials',
        'views': 'views',
        'docs': 'docs'
    },
    'helpers': {},
    'logErrors': false,
    'dest': distPath
};


const styleguide = () => {

    return new Promise((resolve) => {
        assemble(styleguideConfig);
        resolve();
    });
};


export default styleguide;
