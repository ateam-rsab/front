var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
gulp.task('hello', function() {
    console.log('Hello Zell');
});
gulp.task('browserSync', function() {
    browserSync.init({
        proxy: "localhost:3333"
    })
});
gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
        .pipe(sass())
        .pipe(gulp.dest('app/stylesheets/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});
gulp.task('watch', [], function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
})
gulp.watch('app/scss/**/*.scss', ['sass']);