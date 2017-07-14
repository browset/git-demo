'use strict';

/*
 *LESS编译 压缩 合并
 *js合并 压缩 混淆（简介变量名）
 *img复制
 *html压缩
*/
//载入gulp包
var gulp=require('gulp');




//注册任务

//LESS编译 压缩 合并(一般没必要)
//引入less编译包
var less=require('gulp-less');

var cssnano=require('gulp-cssnano');

gulp.task('style',function(){
	gulp.src(['src/style/*.less','!src/style/_*.less'])
	.pipe(less())
	.pipe(cssnano())
	.pipe(gulp.dest('dist/style'))
	.pipe(browserSync.reload({stream:true}))//刷新
})

//js合并 压缩 混淆（简介变量名）

var concat=require('gulp-concat');

var uglify=require('gulp-uglify');

gulp.task('script',function(){
	gulp.src('src/script/*.js')
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/script'))
	.pipe(browserSync.reload({stream:true}))
})



//img复制
gulp.task('img',function(){
	gulp.src('src/image/*.*')
	.pipe(gulp.dest('dist/image'))
	.pipe(browserSync.reload({stream:true}))
})



//html压缩
var htmlmin=require('gulp-htmlmin');

gulp.task('html',function(){
	gulp.src('src/*.html')
	.pipe(htmlmin({
		collapseWhitespace:true,
		removeComments:true
	}))
	.pipe(gulp.dest('dist/'))
	.pipe(browserSync.reload({stream:true}))

})


var browserSync=require('browser-sync');
//建立服务器，实现自动化操作
gulp.task('serve',function(){
	browserSync({
		server: {baseDir:['dist/']}	//服务器根目录
	}, function(err, bs) {
    console.log(bs.options.getIn(["urls", "local"]));
	});

//watch监听文件变动调用函数
	gulp.watch('src/style/*.less',['style']);
	gulp.watch('src/script/*.js',['script']);
	gulp.watch('src/*.html',['html']);
	gulp.watch('src/image/*.*',['img']);
})


