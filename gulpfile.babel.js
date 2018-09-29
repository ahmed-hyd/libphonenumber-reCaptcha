import gulp from 'gulp';
import grommetToolbox from 'grommet-toolbox';
import opts from './grommet-toolbox.config';

//determine which portal to build
grommetToolbox(gulp, opts.customerPortalSettings);

/* NON-GROMMET GULP TASKS */

var fs = require('fs'),
  bump = require('gulp-bump'),
  jsoncombine = require('gulp-jsoncombine'),
  semver = require('semver');

var getPackageJson = function () {
  return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
};

gulp.task('bump-patch', function () {
  var pkg = getPackageJson();
  var newVer = semver.inc(pkg.version, 'patch');

  return gulp.src('./package.json')
    .pipe(bump({
      version: newVer
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('bump-minor', function () {
  var pkg = getPackageJson();
  var newVer = semver.inc(pkg.version, 'minor');

  return gulp.src('./package.json')
    .pipe(bump({
      version: newVer
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('bump-major', function () {
  var pkg = getPackageJson();
  var newVer = semver.inc(pkg.version, 'major');

  return gulp.src('./package.json')
    .pipe(bump({
      version: newVer
    }))
    .pipe(gulp.dest('./'));
});

// pulls libraries from NPM and places them in the src folder - only has to be done occasionally
gulp.task('build', function () {
  gulp.run('bump-patch');
});

gulp.task('dev-app', function () {
  gulp.run('dev');
});

gulp.task('dist', function () {
  gulp.run('dist');
});
