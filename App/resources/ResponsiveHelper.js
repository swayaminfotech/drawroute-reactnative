import {Dimensions, PixelRatio} from 'react-native';
const {height, width} = Dimensions.get('window');

const aspectRatio = width/(Platform.OS === "ios" ? 380 : 480);

const getLayoutSize = valueDimen => {
  var newScale = ((aspectRatio * valueDimen) - valueDimen ) * 0.6 + valueDimen
  return newScale
};

const getFontSize = valueFontSize => {
  var newScale = ((aspectRatio * valueFontSize) - valueFontSize ) * 0.7 + valueFontSize
  return newScale
};

export {
  getLayoutSize,
  getFontSize
};
