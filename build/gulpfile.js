const gulp = require('gulp')
const fs = require('fs')
const zip = require('gulp-zip')

gulp.task('default', () => {
  const name = 'new-tab-address-bar-workaround' // name of package
  const version = JSON.parse(fs.readFileSync('../code/manifest.json')).version

  return gulp.src('../code/**/*')
    .pipe(zip(`${name}-v${version}.zip`))
    .pipe(gulp.dest('../releases/'))
})
