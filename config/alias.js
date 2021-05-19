const path = require('path');

module.exports = {
  // Support React Native Web
  // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
  'react-native': 'react-native-web',
  'components': path.resolve('src/components'),
  'utils': path.resolve('src/utils'),
  'img': path.resolve('src/img'),
  'api': path.resolve('src/api'),
  'store': path.resolve('src/store'),
  'style': path.resolve('src/style'),
  'theme': path.resolve('src/theme'),
  'translations': path.resolve('src/translations'),
}