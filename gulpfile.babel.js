import path from 'path';
import gulp from 'gulp';
import gulpsync from 'gulp-sync';
import gutil from 'gulp-util';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';
import webdriver from 'gulp-webdriver';
import gulpdocker from 'gulp-docker';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from './webpack.config.js';
import R from 'ramda';
import selenium from 'selenium-standalone';
import pkg from './package.json';
const sync = gulpsync(gulp).sync;
let seleniumServer;

function onDone(taskName, done) {
  return (err, stats) => {
    if (err) throw new gutil.PluginError(taskName, err);
    else gutil.log('[' + taskName + ']', stats.toString());

    if (done) done();
  };
}

gulp.task('webdriver', () => {
  return gulp
    .src('./wdio.conf.js')
    .pipe(webdriver({
      wdioBin: path.join(__dirname, 'node_modules', '.bin', 'wdio')
    }))
    .on('error', () => {
      seleniumServer.kill();
      process.exit(1);
    })
    .on('end', () => {
      seleniumServer.kill();
    });
});

gulp.task('selenium', (done) => {
  selenium.install({ logger: console.log}, () => {
    selenium.start((err, child) => {
      if (err) return done(err);
      seleniumServer = child;
      done();
    });
  });
});

gulp.task('test', sync(['selenium', 'webdriver']));

gulp.task('build', ['client:build', 'server:build']);
gulp.task('watch', ['client:watch', 'server:watch']);

gulp.task('client:build', (done) => {
  webpack(webpackConfig.client).run(onDone('client:build', done));
});

gulp.task('client:watch', (done) => {
  webpack(webpackConfig.client).watch(100);
});

gulp.task('server:build', (done) => {
  webpack(webpackConfig.server).run(onDone('server:build', done));
});


gulp.task('server:watch', (done) => {
  webpack(webpackConfig.server).watch(100);
});
