var gulp = require('gulp');
// gulp 플러그인 호출
var uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    run = require('gulp-run-command').default,
    concat = require('gulp-concat'),
    uglifyjs = require('uglify-js'),
    javascriptObfuscator = require('gulp-javascript-obfuscator');

var composer = require('gulp-uglify/composer');
var minify = composer(uglifyjs, console);

// gulp.task('clean', run('rmdir build'))
gulp.task('run-build', run('npm run build', {env: {NODE_ENV: 'production'}}))


gulp.task('uglify-worker', function () {
    return gulp.src(['src/union/UnionWorker.jsx'])
        .pipe(javascriptObfuscator({
            compact:true,
            stringArray: false,
            simplify: true,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 1,
            numbersToExpressions: true,
            disableConsoleOutput: true,

            debugProtection: true,
            debugProtectionInterval: 4000,
            // renameGlobals: true,

        }))
        .pipe(rename('UnionWorker.min.jsx'))
        .pipe(gulp.dest('src/union'))

})

gulp.task('merge-eslint', function () {
    return gulp.src(['src/union/eslintDisable.jsx', 'src/union/UnionWorker.min.jsx'])
        .pipe(concat('UnionWorker.min.jsx'))
        .pipe(gulp.dest('src/union'))
})


gulp.task('obfuscate-worker', gulp.series('uglify-worker','merge-eslint'))

// gulp.task('build', gulp.series('uglify-worker','merge-eslint','run-build'))