import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
  StatusBar
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Foundation from "react-native-vector-icons/Foundation";
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";


import Header from '../../components/header/Header'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ChooseRole = () => {
  return (
    <View style={styles.container}>
      <Header/>
    </View>
  )
}

export default ChooseRole

const styles = StyleSheet.create({
  container:{
    height:windowHeight,
    width:windowWidth,
  },
})