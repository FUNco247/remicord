import gulp from "gulp";
import del from "del";
import minify from "gulp-csso";
import autoprefixer from "gulp-autoprefixer";
import node_sass from "node-sass";
import sass from "sass";
import babel from "gulp-babel";
import uglify from "gulp-uglify";
sass.compiler = node_sass;

const routes = {
  css: {
    watch: "statics/scss/*",
    src: "statics/scss/**/*.scss",
    dest: "dist/css",
  },
  script: {
    watch: "statics/js/*",
    src: "statics/js/**/*.js",
    dest: "dist/js",
  },
};

const styles = () =>
  gulp
    .src(routes.css.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        flexbox: true,
        grid: "autoplace",
      })
    )
    .pipe(minify())
    .pipe(gulp.dest(routes.css.dest));

const watchStyle = () => {
  gulp.watch(routes.css.watch, styles);
};

const cleanStyle = () => del(["dist/styles.css"]);

const prepareStyle = gulp.series([cleanStyle]);

const assetsStyle = gulp.series([styles]);

const liveStyle = gulp.parallel([watchStyle]);

export const style = gulp.series([prepareStyle, assetsStyle, liveStyle]);

const scripts = () =>
  gulp
    .src(routes.script.src)
    .pipe(babel({}))
    .pipe(uglify())
    .pipe(gulp.dest(routes.script.dest));

const watchScript = () => {
  gulp.watch(routes.script.watch, scripts);
};

const cleanScripts = () => del(["dis/js"]);

const prepareScript = gulp.series([cleanScripts]);

const assetsScript = gulp.series([scripts]);

const liveScript = gulp.parallel([watchScript]);

export const script = gulp.series([prepareScript, assetsScript, liveScript]);
