/**
 * Styleguide
 */

import gulp from 'gulp';
import path from 'path';
import assemble from 'fabricator-assemble';

import config from './config/general';


// const sourceFiles = path.join(config.root.dev, config.html.dev) + config.html.extensions;
// const distPath = path.join(config.root.dist, config.html.dist);

const styleguideConfig = {
    'layout': 'default',
    'layouts': '<=styleguidePath>views/layouts/*',
    'layoutIncludes': '<=styleguidePath>views/layouts/includes/*',
    'views': [
        '<=styleguidePath>views/**/*',
        '!<=styleguidePath>views/+(layouts)/**'
    ],
    'materials': '<=styleguidePath>materials/**/*',
    'data': '<=styleguidePath>data/**/*.{json,yml}',
    'docs': '<=styleguidePath>docs/**/*.md',
    'keys': {
        'materials': 'materials',
        'views': 'views',
        'docs': 'docs'
    },
    'helpers': {},
    'logErrors': false,
    'dest': '<=distPath>styleguide/'
};


const styleguide = () => {

    return assemble(styleguideConfig);
};


export default styleguide;
