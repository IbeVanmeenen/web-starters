import gulp from 'gulp';
import runSequence from 'run-sequence';

import clean from './clean';
import styles from './styles';
import javascript from './javascript';
import images from './images';
import html from './html';
import styleguide from './styleguide';

import server from './server';
import watch from './watch';


export const dev = gulp.series(clean, gulp.parallel(styles, javascript, images), html, styleguide, server, watch);
export const build = gulp.series(clean, gulp.parallel(styles, javascript, images), html, styleguide);


export default dev;
