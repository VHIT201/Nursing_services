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
import InfoService from "../../components/selectionbar/InfoService";
import Header from "../../components/header/Header";
import themes from "../../../themes";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const NursesReport = ({navigation}) => {
  const openDrawer = () =>{
    navigation.openDrawer()
  }
  return (
    <View style={styles.container}>
      <Header handleLeftButton={openDrawer} nameLeftIcon={'navicon'} namePage={'Báo cáo'}/>
      <View style={styles.body}>
        <View style={styles.box}>
          <View style={styles.top}>
            <Text style={[styles.text,{color:"white"}]}>Ngày 10/11/2023</Text>
            <Text style={[styles.text,{color:"white"}]}>1.500.000 đ</Text>
          </View>
          <View style={{flex:1, width:'100%',paddingLeft:"5%",paddingRight:'5%',justifyContent:"space-evenly",alignItems:'flex-start'}}>
            <View style={{flexDirection:'row',justifyContent:"space-between",alignItems:"center"}}>
              <Text style={[styles.text,{color:"black"}]}>Đã nhận : </Text>
              <Text style={[styles.text,{color:"black"}]}>500.000đ</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:"space-between",alignItems:"center"}}>
              <Text style={[styles.text,{color:"black"}]}>Chưa thanh toán : </Text>
              <Text style={[styles.text,{color:"black"}]}>500.000đ</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:"space-between",alignItems:"center"}}>
              <Text style={[styles.text,{color:"black"}]}>Khách đặt : </Text>
              <Text style={[styles.text,{color:"black"}]}>500.000đ</Text>
            </View>
          </View>
        </View>
        
        
        
      </View>
    </View>
  )
}

export default NursesReport

const styles = StyleSheet.create({
  container:{
    height:windowHeight,
    width:windowWidth,
  },
  body:{
    flex:1,
    width:"100%",
    paddingLeft:'1%',
    paddingRight:"1%"
    
  },
  box:{
    width:'100%',
    marginTop:20,
    height:200,
    borderRadius:10,
    borderWidth:1,
    borderColor:themes.gray,
    backgroundColor:"white"
  },
  top:{
    height:'20%',
    width:'100%',
    backgroundColor:themes.green,
    justifyContent:'space-between',
    alignItems:'center',
    paddingLeft:'5%',
    paddingRight:'5%',
    flexDirection:'row',
    borderTopRightRadius:10,
    borderTopLeftRadius:10
  },
  text:{
    fontSize:15,
    fontWeight:'500',
    
  },

})