import path from 'path';

function getSettings() {
  // var rootPath = "/";
  return {
    dist: "resources",
    copyAssets: [
      'src/index.html'
    ],

    jsAssets: ['src/**/js/**/*.js'],
    mainJs: 'src/js/index.js',
    mainScss: 'src/scss/index.scss',
    devServerPort: 9000,
    eslintOverride: path.resolve(__dirname, 'customEslintrc'),
    devServer: {
      disableHostCheck: true
    },
    webpack: {
      output: {
        path: __dirname + "/resources"
      } 
    }
  };
}

export default {
  customerPortalSettings: getSettings()
};