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
  StatusBar,
  Button
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Foundation from "react-native-vector-icons/Foundation";
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import JobsReceived from "./JobsReceived";
import Header from "../../components/header/Header";
import HomeSelectButton from "../../components/selectionbar/HomeSelectButton";
import themes from "../../../themes";
import InfoService from "../../components/selectionbar/InfoService";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const NursesWallet = ({navigation}) => {
  const openDrawer = ()=>{
    navigation.openDrawer()
  }
  return (
    <View style={styles.container}>
      <Header namePage={'Ví tiền'} nameLeftIcon={'navicon'} handleLeftButton={openDrawer}/>
      <View style={{flex:1,width:'100%'}}>
        <View style={{height:'20%',width:'100%',justifyContent:"center",alignItems:"center",backgroundColor:themes.green2}}>
            <Entypo name={'wallet'} size={50} color={themes.green}/>
        </View>
        <TouchableOpacity style={[styles.btn,{borderBottomWidth:1,borderBlockColor:themes.gray}]}>
          <Text>Tài khoản nhận tiền</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text>Quy định nhận tiền</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default NursesWallet

const styles = StyleSheet.create({
  container:{
    height:windowHeight,
    width:windowWidth,
  },
  btn:{
    height:"6%",
    width:'100%',
    backgroundColor:'white',
    justifyContent: 'center',
    paddingLeft:'4%'
  }
})