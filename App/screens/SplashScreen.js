import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  Image

} from 'react-native';

import {Colors} from "../resources/index";
import {getFontSize, getLayoutSize} from "../resources/ResponsiveHelper";
const { width, height } = Dimensions.get('window');

export default class SplashScreen extends Component{

componentDidMount(){
  setTimeout(()=> {
    this.props.navigation.replace('HomeScreen');
  },2000);
}

render(){
  return(
      <View style={styles.MainContainer}>
        <StatusBar backgroundColor={Colors.app_color} />
        <Image source={require("../assets/app_icon.png")} style={styles.image} resizeMode="contain"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer:{
    width:"100%",
    height:height,
    flex:1,
    backgroundColor:Colors.white,
    justifyContent:'center',
  },
  image:{
    width:getLayoutSize(300),
    height:getLayoutSize(300),
    justifyContent: 'center',
    alignSelf: 'center'
  },
  image_logo:{
    width:getLayoutSize(300),
    height:getLayoutSize(150),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop:getLayoutSize(10)
  },
});
