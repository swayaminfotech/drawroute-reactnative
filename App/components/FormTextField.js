import React, { Component } from 'react';
import {  Platform, StyleSheet, Text, TouchableOpacity, TextInput, View  } from 'react-native';
import {Colors, CommanStyles} from "../resources/index"

const FormTextField = (props) => {
  return (
    <View style={CommanStyles.textFieldContainer}>
      <TextInput
          {...props}
          ref={props.forwardRef}
          style={CommanStyles.textFieldStyle}
          placeholderTextColor={Colors.text_field_hint_color}
          underlineColorAndroid="transparent"
        />
      { /*!!props.errorText && (<Text style={CommanStyles.textFieldErrorText}>{props.errorText}</Text>)*/}
    </View>
  );
};

export default FormTextField
