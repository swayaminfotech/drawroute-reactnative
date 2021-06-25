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

import {Colors,Strings} from "../resources/index";
import {getFontSize, getLayoutSize} from "../resources/ResponsiveHelper";
const { width, height } = Dimensions.get('window');
import MapView, {Animated} from 'react-native-maps';
import Header from '../components/Header';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import Utils from "../helper/Utils"
import {Constants}  from "../networks/Constants";
import MapViewDirections from 'react-native-maps-directions';

export default class MapScreen extends Component{
  constructor(props) {
      super(props);
        this.state={
          latitude: 0,
          longitude: 0,
          desLat:0,
          desLng:0,
          destinationAddress:props.route.params.destinationAddress,
          currentAddress:props.route.params.currentAddress,
          error: null,
          address: null,
          markers:[],
        };
        this.getLocation = this.getLocation.bind(this);
    }

async componentDidMount(){
    Geocoder.init(Constants.GOOGLE_MAP_KEY); // use a valid API key
    if(Utils.isStringNull(this.state.currentAddress)){
      this.getLocation();
    }else {
      this.getSourceLatLngFromAddress(this.state.currentAddress)
    }
    this.getDestiLatLngFromAddress(this.state.destinationAddress)
}

getLocation(){
  Geolocation.getCurrentPosition(
      (position) => {
         this.setState({
             latitude: position.coords.latitude,
             longitude: position.coords.longitude,
         },()=>{
           var currentLocation = {
              latitude: this.state.latitude,
              longitude: this.state.longitude,
           };
           var marker = this.state.markers;
           marker.push(currentLocation);
           this._map.animateCamera(currentLocation, 1);
           this.setState({markers:marker})
        });
      },
      (error) => {
         // See error code charts below.
         this.setState({
           error: error.message
         }),
         console.log(error.code, error.message);
       },
       {
         enableHighAccuracy: false,
         timeout: 10000,
         maximumAge: 100000
       }
   );
}

getSourceLatLngFromAddress(address){
    // Search by address
    var location = "";
    Geocoder.from(address)
    .then(json => {
       location = json.results[0].geometry.location;
       this.setState({latitude:location.lat,longitude:location.lng},()=>{
         var currentLocation = {
              latitude: this.state.latitude,
              longitude: this.state.longitude,
         };
         var marker = this.state.markers;
         marker.push(currentLocation);
         this.setState({markers:marker})
       })
    })
    .catch(error => console.warn(error));
}

getDestiLatLngFromAddress(address){
    // Search by address
    var location = "";
    Geocoder.from(address)
    .then(json => {
       location = json.results[0].geometry.location;
       this.setState({desLat:location.lat,desLng:location.lng},()=>{
         var destinationLocation = {
              latitude: this.state.desLat,
              longitude: this.state.desLng,
         };
        var marker = this.state.markers;
        marker.push(destinationLocation);
        this.setState({markers:marker})
       })
    })
    .catch(error => console.warn(error));
}

mapMarkers = () => {
  return this.state.markers.map(marker => (
       <MapView.Marker.Animated
         coordinate={{ latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude) }}
         title={marker.title}
       />
   ))
  }

render(){
  const {latitude,longitude,desLat,desLng} = this.state;
  const origin = {latitude: latitude, longitude: longitude};
  const destination = {latitude: desLat, longitude: desLng};
  return(
      <View style={styles.MainContainer}>
        <StatusBar backgroundColor={Colors.app_color} />
        <Header
          title={Strings.your_route}
          Navigate={this.props.navigation}
          isBack={true}
          colorBack="#fff"
          style={{color:'#000'}}
          navigation={this.props.navigation} />
        <MapView.Animated
          ref={component => this._map = component}
          style={styles.mapStyle}
          showsUserLocation={true}
          zoomEnabled={true}
          zoomControlEnabled={true}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.01750,
            longitudeDelta: 0.01750 * (width / height),
          }}
          >
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={Constants.GOOGLE_MAP_KEY}
            strokeWidth={3}
            strokeColor="black"
          />
          {
            this.mapMarkers()
          }
        </MapView.Animated>
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
  mapStyle: {
    position: 'absolute',
    top: getLayoutSize(65),
    left: 0,
    right: 0,
    bottom: 0,
  },
});
