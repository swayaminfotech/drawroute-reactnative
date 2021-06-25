import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  Image,
  Modal,
  PermissionsAndroid

} from 'react-native';

import {getFontSize, getLayoutSize} from "../resources/ResponsiveHelper";
const { width, height } = Dimensions.get('window');
import PrimaryButton from "../components/PrimaryButton"
import {Colors, CommanStyles, TextFontSize, Strings, ScaleSizeUtils,AppFonts } from "../resources/index"
import FormTextField from "../components/FormTextField"
import Utils from "../helper/Utils"

export default class HomeScreen extends Component{
  constructor(props) {
      super(props);
        this.state={
          isError:false,
          errorTitle:'',
          errorMessage:'',
          isLoading:false,
          currentAddress:'',
          destinationAddress:'',
        };
    }

componentDidMount(){
  this.GetAllPermissions();
}

async hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    //return status === 'granted';
    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return console.log("You can use the camera");
    } else {
      return console.log("Camera permission denied");
    }
  }

  async GetAllPermissions() {
    try {
      if (Platform.OS === "android") {
        const userResponse = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
        ]);
        if (userResponse) {
          return true;
        }
      }
    } catch (err) {

    }
    return null;
  }

async isValid() {
    const {destinationAddress} = this.state
    var isValid = true;

    if(Utils.isStringNull(destinationAddress)) {
        isValid = false;
        this.setState({isError:true,errorTitle: Strings.destination_address_title,errorMessage:Strings.destination_address_message});
        setTimeout(()=> {
          this.setState({isError:false});
        },1500);
    } else {
      var isInternetConnected = await Utils.isConnected();

      if(isValid && !isInternetConnected) {
        isValid = false;
        this.setState({isError:true,errorTitle: Strings.network_title,errorMessage:Strings.network_message});
        setTimeout(()=> {
          this.setState({isError:false});
        },1500);
      }else {
        this.props.navigation.navigate('MapScreen',{destinationAddress:this.state.destinationAddress,currentAddress:this.state.currentAddress});
      }
    }
  }

render(){
  const { errorTitle,errorMessage,currentAddress,destinationAddress} = this.state;
  return(

      <View style={styles.MainContainer}>
        <StatusBar backgroundColor={Colors.app_color} />
        <Image source={require("../assets/app_icon.png")} style={styles.image} resizeMode="contain"/>
        <Modal
          transparent={true}
          animationType={'fade'}
          visible={this.state.isError}
          onRequestClose={() => {}}>
          <View style={CommanStyles.errorBackground}>
            <Image source={require("../assets/ic_info.png")} style={styles.error_image} resizeMode="contain"/>
            <View style={{flexDirection:'column',marginLeft:getLayoutSize(15)}}>
                <Text style={[styles.error_title]}>{errorTitle}</Text>
                <Text style={[styles.error_text]}>{errorMessage}</Text>
            </View>
         </View>
       </Modal>
        <Text style={[CommanStyles.inputTitleText,{marginTop:getLayoutSize(40)}]}>{Strings.current_address}</Text>
        <FormTextField
            errorText={""}
            forwardRef={(input) => { this.currentAddressField = input; }}
            returnKeyType = {"next"}
            value={currentAddress}
            onChangeText={(text) => this.setState({currentAddress: text})}
            onSubmitEditing={() => { this.destinationAddressField.focus(); }} />
        <Text style={[CommanStyles.inputTitleText,{marginTop:getLayoutSize(40)}]}>{Strings.destination_address}</Text>
        <FormTextField
            errorText={""}
            forwardRef={(input) => { this.destinationAddressField = input; }}
            returnKeyType = {"next"}
            value={destinationAddress}
            onChangeText={(text) => this.setState({destinationAddress: text})}
            />
        <PrimaryButton onPressButton={()=>{this.isValid()}} >{Strings.draw_route}</PrimaryButton>
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
    padding: ScaleSizeUtils.PADDING_DEFAULT,
  },
  image:{
    width:getLayoutSize(200),
    height:getLayoutSize(200),
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

  error_image:{
    width:getLayoutSize(55),
    height:getLayoutSize(55),
  },

  error_title:{
    color:Colors.error_border,
    fontSize:TextFontSize.INPUT_TITLE_TEXT,
    fontFamily: AppFonts.font_medium,
  },
  error_text:{
    color:Colors.darkGray,
    fontSize:TextFontSize.INPUT_TITLE_TEXT,
    fontFamily: AppFonts.font_regular,
    marginTop:getLayoutSize(5)
  },
});
