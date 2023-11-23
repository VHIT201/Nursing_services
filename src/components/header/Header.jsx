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
import EvilIcons from "react-native-vector-icons/EvilIcons";
import themes from "../../../themes";

const Header = ({namePage,handleLeftButton,nameLeftIcon}) => {
  return (
    <View style={styles.container}>
    <View style={{width:'14%',height:"100%",justifyContent:"center",alignItems:'center'}}>
      <TouchableOpacity onPress={()=>handleLeftButton()}>
        <FontAwesome name={nameLeftIcon} size={26} color={'white'}/>
        {/* <EvilIcons name="navicon" size={30} color={'white'}/> */}
      </TouchableOpacity>
    </View>
    <View style={{width:'72%',height:"100%",justifyContent:"center",alignItems:"center"}}>
      <Text style={{fontSize:19,fontWeight:'600',color:'white',textAlign:'center'}}>{namePage}</Text>
    </View>
     
      <View style={{width:'14%',height:"100%",justifyContent:"center",alignItems:"center"}}>
        <TouchableOpacity>
          <AntDesign name="phone" size={26} color={'white'}/>
        </TouchableOpacity>
        </View>

        <View></View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container:{
    height:"8%",
    width:"100%",
    backgroundColor:themes.green,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
  }
})