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
import AntDesign from "react-native-vector-icons/AntDesign";
import JobsReceived from "../../screens/nurses/JobsReceived";
import themes from "../../../themes";
const HomeSelectButton = ({ title, navigation, handlePress }) => {
  return (
    <TouchableOpacity onPress={() => handlePress()} style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} resizeMode='contain' source={require('../../assets/Icon/logo.png')} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    paddingRight: '2%',
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  logoContainer: {
    width: '20%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: '60%',
    width: '60%',
  },
  titleContainer: {
    width: '80%',
    height: '100%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    paddingLeft: '5%',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: themes.green,
  },
});

export default HomeSelectButton;