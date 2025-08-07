import gulp from 'gulp';
import { config } from './gulp/config.mjs';


// tasks import
import {compileLangs} from './gulp/tasks/compileLangs.mjs';
import {compileSCSS} from './gulp/tasks/compileSCSS.mjs';
import {createBuild} from './gulp/tasks/createBuild.mjs';
import {convertImages} from './gulp/tasks/convertImages.mjs';
import {genTemplatesPath} from './gulp/tasks/genTemplatesPath.mjs';


gulp.task('compileLangs', compileLangs);
gulp.task('compileSCSS', compileSCSS);
gulp.task('createBuild', createBuild);
gulp.task('genTemplatesPath', genTemplatesPath);

gulp.task('convertImages', convertImages); // in dev

/**************************/
/*  Watches dirs          */
/**************************/
gulp.task('watch', function(){
 gulp.watch(config.watch.css, gulp.series(compileSCSS));
 gulp.watch(config.watch.langs, gulp.series(compileLangs));
});