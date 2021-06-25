import React, { Component } from 'react';
import {  Platform, StyleSheet, Text, TouchableOpacity, View  } from 'react-native';
import {Colors, TextFontSize , AppFonts, ScaleSizeUtils } from "../resources/index"

const PrimaryButton = ({ children, onPressButton }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPressButton}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton


const styles = StyleSheet.create({
  button: {
    width: '75%',
    backgroundColor: Colors.app_color,
    padding: ScaleSizeUtils.PADDING_AUTH_BUTTON,
    marginTop: ScaleSizeUtils.MARGIN_TOP_AUTH_BUTTON,
    borderRadius: 50,
    alignSelf:'center'
  },
  buttonText: {
    fontSize: TextFontSize.TEXT_SIZE_AUTH_BUTTON,
    textAlign: 'center',
    fontFamily: AppFonts.font_regular,
    color: Colors.white,
  }
});
