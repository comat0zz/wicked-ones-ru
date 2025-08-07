import gulp from 'gulp';
import {config} from '../config.mjs';
import {plugins} from '../plugins.mjs';
import autoprefixer from 'gulp-autoprefixer';
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass';
const sass = gulpSass( dartSass );
const styleFile = 'system.css';

/**
 * Сборка SCSS стилей в CSS
 * @returns 
 */
export const compileSCSS = () => {
  return gulp.src(`${config.src.styles}/style.scss`)
    .on('error', plugins.notify.onError(function(err) {
        return {
          title: "compileSCSS",
          message: err.message
        }
    }))
    //.pipe(autoprefixer())
    .pipe(sass({
      errorLogToConsole: true
    }))
    .on('error', console.error.bind(console))
    .pipe(plugins.rename(styleFile))
    .pipe(gulp.dest(config.build.styles));
};