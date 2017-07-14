/**
 * Throw error
 */

import gutil from 'gulp-util';


const errorLogger = (taskName, message) => {
    throw new gutil.PluginError({
        plugin: taskName,
        message: gutil.colors.red(message)
    });
};

const infoLogger = (taskName, message) => {
    gutil.log(taskName, gutil.colors.magenta(message));
};


export {errorLogger, infoLogger};
