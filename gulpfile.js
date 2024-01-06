
const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass') (require('sass'));  
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
// Static server
gulp.task('projectserver', function () {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
});

gulp.task('projectstyles', function () {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({
            prefix: "",
            suffix: ".min",
          }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('projectwatch', function (){
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel("projectstyles"));
    gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task('default', gulp.parallel('projectwatch', 'projectserver', 'projectstyles'));