var gulp        = require('gulp');
var sass = require('gulp-sass-china');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var proxy = require('http-proxy-middleware');

var target = 'http://192.168.10.183:9090'; // 服务器地址
var server = {
    baseDir: './www/',
    middleware: proxy(['/product', '/policy', '/token'], {target: target, changeOrigin: true})
};

// Static server
gulp.task('browser-sync', function() {
    var files = [
        '**/*.html',
        '**/*.css',
        '**/*.js'
    ];
    browserSync.init(files, {
        server: server
    });
});

gulp.task('sass', function() {
    gulp.src('./www/scss/ionic.app.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(rename({
            extname: '.css'
        }))
        .pipe(gulp.dest('./www/scss/'));
});

gulp.task('watch', function () {
    gulp.watch('**/*.scss', ['sass'])
});

gulp.task('default',['sass', 'browser-sync', 'watch']); //定义默认任务

gulp.task('serve:before', ['default', 'watch']);