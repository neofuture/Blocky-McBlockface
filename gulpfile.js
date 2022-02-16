var gulp = require("gulp"),
    rename = require("gulp-rename");

gulp.task('deploy', function(){
    gulp.src(['build/debug/**/*'])
        .pipe(gulp.dest('../../___Cordova/Blocky Puzzle 2/platforms/ios/www'))
        .pipe(gulp.dest('../../___Cordova/Blocky Puzzle 2/www'));
});


gulp.task("default", function () {
    gulp.watch("./src/core/**/*", ['build']);
    gulp.watch("./assets/**/*", ['build']);
});


gulp.task('copyAssets', function(){
    gulp.src(['assets/**/*'])
        .pipe(gulp.dest('build/dev/assets'))
        .pipe(gulp.dest('build/debug/assets'))
        .pipe(gulp.dest('build/release/assets'));

    gulp.src(['src/core/**/*'])
        .pipe(gulp.dest('build/dev/core'))
        .pipe(gulp.dest('build/debug/core'))
        .pipe(gulp.dest('build/release/core'));

    gulp.src(['src/templates/index.tmp'])
        .pipe(rename("index.html"))
        .pipe(gulp.dest('build/dev'))
        .pipe(gulp.dest('build/debug'))
        .pipe(gulp.dest('build/release'));

});

gulp.task("build", ['copyAssets', 'deploy']);