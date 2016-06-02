const packageConfig = require("./package");

const ASSETS_DIR = "./assets";
const DIST_DIR = "./dist";

desc("Removes all build-related files");
task("cleanup", () => {
  jake.rmRf(DIST_DIR + "/*");
});

desc("Builds the sources and generates a .tar.gz");
task("package", ["cleanup"], () => {
  jake.cpR(ASSETS_DIR, DIST_DIR + "/");
  jake.cpR("index.html", DIST_DIR + "/");
  jake.exec([
    "./node_modules/.bin/webpack -p --config webpack.config.prod.js",
    `tar -czf soundboard-${packageConfig.version}.tar.gz ${DIST_DIR}`,
    `rm -rf ${DIST_DIR}/*`,
    `mv soundboard*.tar.gz ${DIST_DIR}/`
  ], complete);
});
