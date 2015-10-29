var gulp = require('gulp');
var gulpJade = require('gulp-jade');
var gulpLess = require('gulp-less');
var gulpSourceMaps = require('gulp-sourcemaps');
var gulpMinifyCss = require('gulp-minify-css');
var gulpPrettify = require('gulp-prettify');
var browserSync = require('browser-sync');

//JADE编译并美化
gulp.task('jade', function() {
    return gulp.src('src/jade/*.jade')
        .pipe(gulpJade({
            pretty: true
        }))
        .pipe(gulp.dest('src/html/'))
        .pipe(gulpPrettify({"indent-size": 0}))
        .pipe(gulp.dest('src/html/'))
        .pipe(gulp.dest('dist/html/'))
});

//less编译并生成map
gulp.task('less',function(){
    return gulp.src('src/assets/less/*.less')
        .pipe(gulpSourceMaps.init())
        .pipe(gulpLess())
        .pipe(gulpSourceMaps.write())
        .pipe(gulp.dest('src/assets/css'))
});

//浏览器同步
gulp.task('browserSync', function() {
    return browserSync({
        files: ["src/html/*.html","src/assets/css/**"],
        server: {
            baseDir: "src"
        }
    });
});

//及时编译
gulp.task('watch', function () {
    gulp.watch('src/assets/less/**', ['less']);
    gulp.watch('src/jade/**', ['jade']);
});

//生产环境的配置任务
gulp.task('default', ['browserSync','watch']);


//压缩CSS到部署环境
gulp.task('cleanCss',function(){
    return gulp.src('src/assets/css/*.css')
        .pipe(gulpMinifyCss())
        .pipe(gulp.dest('dist/assets/css'))
});



/*
gulp.task('less', function () {
    gulp.src('src/less/*.less')
        .pipe(gulpSourceMaps.init())
        .pipe(gulpLess())
        .pipe(gulpAutoprefixer({
            browsers: ['> 5%','last 3 Explorer versions'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            remove:true //是否去掉
            // 不必要的前缀 默认：true
        })).pipe(gulpMinifyCss({
            compatibility: 'ie7'
        }))
        .pipe(gulpSourceMaps.write())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('default', ['jade','less']);
gulp.watch('src/jade/**.jade,src/less/**.less', ['default']);

/*
* gulp.task('minjs', function () {
 gulp.src('src/js/*.js') // 要压缩的js文件
 .pipe(uglify())  //使用uglify进行压缩,更多配置请参考：
 .pipe(gulp.dest('dist/js')); //压缩后的路径
 });

 gulp.task('default', ['minjs']);
* */