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
const HomeSelectButton = ({title,navigation,handlePress}) => {
  return (
    <TouchableOpacity onPress={()=>handlePress()} style={styles.container}>
      <View style={{width:'20%',height:'100%',borderTopLeftRadius:10,borderBottomLeftRadius:10,justifyContent:"center",alignItems:"center"}}>
        <Image style={{height:'60%',width:"60%",justifyContent:"center",alignItems:"center"}}  resizeMode='contain'
        source={require('../../assets/Icon/logo.png')}/>
      </View>
      <View style={{width:'80%',height:'100%',borderTopRightRadius:10,borderBottomRightRadius:10,justifyContent:'center'}}>
        <Text style={{fontSize:18,fontWeight:"500",color:themes.green}}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default HomeSelectButton

const styles = StyleSheet.create({
    container:{
        height:70,
        width:"100%",
        backgroundColor:"white",
        alignItems: 'center',
        flexDirection:"row",
        marginBottom:10,
        paddingRight:"2%"
    },
})