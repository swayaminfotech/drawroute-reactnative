import {Platform, StyleSheet, Dimensions, } from 'react-native';
import {getFontSize, getLayoutSize} from "./ResponsiveHelper"
import Colors from "./Colors";
//import AppFonts from "./Fonts";
import TextFontSize from "./TextFontSize";
import ScaleSizeUtils from "./ScaleSizeUtils";
import AppFonts from "./Fonts";

const { width, height } = Dimensions.get('window');

const CommanStyles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: Colors.white
    },
    textFieldStyle: {
      fontSize: getFontSize(15),
      width: '100%',
      backgroundColor: Colors.text_field_background_color,
      borderRadius: getLayoutSize(5),
      color: Colors.black,
      fontFamily: AppFonts.font_regular,
      paddingLeft:getLayoutSize(10)
    },
    textFieldContainer: {
      width: '100%',
      fontSize:TextFontSize.INTRO_TEXT,
      fontFamily: AppFonts.font_regular,
      height:getLayoutSize(50),
      borderColor:Colors.border_color_text,
      borderWidth:1.5,
      borderRadius:4,
      marginTop:10,
      margin:ScaleSizeUtils.MARGIN,
      paddingLeft:ScaleSizeUtils.TEXT_INPUT_PADDING,
      backgroundColor:Colors.very_light_gray
    },

    inputTitleText:{
      color:Colors.black,
      fontSize:TextFontSize.INPUT_TITLE_TEXT,
      marginTop:getLayoutSize(20),
      fontFamily: AppFonts.font_regular,
    },
    modalBackground: {
      alignItems:'center',
      flexDirection: 'column',
      backgroundColor : 'rgba(48, 48, 48, 0.8)',
      height: '100%',
      justifyContent: 'center',
    },

    activityIndicator: {
      backgroundColor: '#FFFFFF',
      height: getLayoutSize(150),
      width: getLayoutSize(150),
      borderRadius: getLayoutSize(10),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around'
    },

    errorBackground: {
      backgroundColor : Colors.error_background,
      height: '11%',
      elevation: 2.0,
      shadowColor: '#000000',
      shadowOffset: {
          width: 1,
          height: 3
      },
      shadowOpacity: 0.2,
      borderWidth:1,
      borderRadius:4,
      margin:getLayoutSize(10),
      borderColor:Colors.error_border,
      padding:getLayoutSize(15),
      flexDirection:'row',
    },

});
export default CommanStyles
