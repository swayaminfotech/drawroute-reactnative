import {Alert, DialogBox} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import moment from 'moment';

export default class Utils {
   static isConnected = async () => {
      const response = await NetInfo.fetch();
      if(response.isConnected === false) {
          Alert.alert(
             'Alert',
             'Not internet connection available',
             [{text: 'OK', onPress: () => {}},]);
      }
      return response.isConnected;
   }

  static isConnectedCheck = async () => {
     const response = await NetInfo.fetch();
     return response.isConnected;
  }

  // static async isNetworkAvailable(){
  //   const response = await NetInfo.fetch();
  //   return response.isConnected;
  // }

  static getDayAgo = (fromDate) => {

    let CreatedDate = new Date(fromDate)
    let today = new Date()
    let requiredDiffrentDays

    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((CreatedDate - today) / oneDay));

    if (diffDays >= 360) {
        requiredDiffrentDays = Math.floor(diffDays / 360) == 1 ? `${Math.floor(diffDays / 365)} year ago` : `${Math.floor(diffDays / 365)} years ago`
    } else if (diffDays >= 30) {
        requiredDiffrentDays = Math.floor(diffDays / 30) == 1 ? `${Math.floor(diffDays / 30)} month ago` : `${Math.floor(diffDays / 30)} months ago`
    } else if (diffDays < 30) {
        requiredDiffrentDays = (diffDays == 1 || diffDays == 0) ? `${diffDays} day ago` : `${diffDays} days ago`
    }

    return requiredDiffrentDays;
  }

static getDaysDifferentFromDate(date, date1) {
  var msDiff = new Date(date1).getTime() - new Date(date).getTime();
  var daysDiffent = Math.floor(msDiff / (1000 * 60 * 60 * 24));
  return daysDiffent;
}

static getTodayDateDifferentFromDate(date) {
  var msDiff = new Date(date).getTime() - new Date().getTime();
  var daysDiffent = Math.floor(msDiff / (1000 * 60 * 60 * 24));
  return daysDiffent;
}

static getPrecentageFromDate(startDate, endDate) {
  // var msDiff = new Date(date).getTime() - new Date().getTime();
  // var daysDiffent = Math.floor(msDiff / (1000 * 60 * 60 * 24));
  const endDateValue = moment(moment(endDate).format("DD-MM-YYYY")).valueOf();
  const nowDate = moment(moment().format("DD-MM-YYYY")).valueOf();
  const startDateValue = moment(moment(startDate).format("DD-MM-YYYY")).valueOf();
  if(nowDate<=endDateValue) {
    var perce = (nowDate - startDateValue)/(endDateValue - startDateValue);
    console.log("Percentage "+perce);
    return perce * 100;
  } else {
    return 100;
  }
}

static getDaysDifferent(startDate, endDate) {
  const endDateValue = moment(endDate);
  const startDateValue = moment(startDate);
  var daysDifferent = endDateValue.diff(startDateValue, 'days');
  return daysDifferent+ (daysDifferent > 0 ? " days" : " day" );
}

static DailogBox = (text, text1) => {
  // setTimeOut(()=>{Alert.alert(text,text1),0);
  setTimeOut(()=> {Alert.alert(text,text1)
  },0);
}

  static isValidEmailAddress = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(text) === false)
    {
      return false;
    }
    else {
      return true;
    }
  }

  static getParseStringValue(value) {
    if(value === null || value === "" || value === "[]" || value === "null" || value === undefined) {
      return "";
    } else {
      return value;
    }
  }

  static isStringNull = (text) => {
    if(text === null || text === "" || text === "[]" || text === "null" || text === undefined)
    {
      return true;
    }
    else {
      return false;
    }
  }

  static isValidUsername = (text) => {
    let regn = /^[a-zA-Z\s]+$/ ;
    if(regn.test(text) === false){
      return false;
    }else {
      return true;
    }
  }

  static isValidPassword =(text) => {
    let regx = /^(?=,*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-za-z\d@$!%*#?&]{6,}$/;
    if(regx.test(text) === false){
      return false;
    }else {
      return true;
    }
  }

  static isEmpty(obj) {
      for(var key in obj) {
          if(obj.hasOwnProperty(key))
              return false;
      }
      return true;
  }

}
