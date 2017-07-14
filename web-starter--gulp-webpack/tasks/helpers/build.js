/**
 * Return true if ENV is --production
 */

import gutil from 'gulp-util';


const isProduction = () => {
    return gutil.env.production;
};


export default isProduction;
