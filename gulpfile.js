const {dest, src, series, watch} = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass')(require('sass'))
    csso = require('gulp-csso'),
    uglify = require('gulp-uglify-es').default,
    rename = require('gulp-rename'),
    fileInclude = require('gulp-file-include'),
    del = require('del'),
    browserSync = require('browser-sync').create()

function browserSyncServe(cb) {
    browserSync.init({
        server: {
            baseDir: 'dist/',
            index: 'index.html'
        },
        port: 3000
    })
    cb()
}

function browserSyncReload(cb) {
    browserSync.reload()
    cb()
}

function html() {
    return src('src/*.html')
        .pipe(fileInclude())
        .pipe(dest('dist/'))
}

function scss() {
    return src('src/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(dest('dist/css/'))
        .pipe(csso())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(dest('dist/css/'))
}

function js() {
    return src('src/js/*.js')
        .pipe(dest('dist/js/'))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(dest('dist/js/'))
}

function img() {
    return src('src/img/**/*.{jpg,png,svg}')
        .pipe(dest('dist/img/'))
}

function clean() {
    return del('dist/')
}

function watchFiles() {
    watch('src/**/*.html', series(html, browserSyncReload))
    watch('src/scss/**/*.scss', series(scss, browserSyncReload))
    watch('src/js/**/*.js', series(js, browserSyncReload))
    watch('src/img/**/*.{jpg,png,svg}', series(img, browserSyncReload))
}

exports.default = series(
    clean,
    html,
    scss,
    js,
    img,
    browserSyncServe,
    watchFiles
)