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
import Header from "../../components/header/Header";
import HomeSelectButton from "../../components/selectionbar/HomeSelectButton";
import themes from "../../../themes";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const CustomerNotification = ({navigation}) => {
  const openDrawer = ()=>{
    navigation.openDrawer()
  }

  return (
    <View style={styles.container}>
      <Header nameLeftIcon={'navicon'} namePage={'Thông báo'} handleLeftButton={openDrawer}/>
      <View style={styles.body}>
        <TouchableOpacity style={{flexDirection:"row",width:"100%",height:120,borderBottomWidth:1, borderBottomColor:themes.green}}>
          <View style={{width:'10%',height:"100%",justifyContent:"flex-start",alignItems:"center"}}>
            <Image resizeMode="contain" style={{height:"50%",width:"100%",justifyContent:"flex-start",alignItems:"center"}} source={require('../../assets/Icon/logo.png')}></Image>
          </View> 
          <View style={{width:'90%',height:"100%",paddingRight:'5%',justifyContent:"space-evenly",paddingTop:'2%',paddingBottom:'2%'}}>
            <Text style={{fontWeight:"600",color:'#1F2937'}}>Tiêm vắc xin phòng bệnh covid-19</Text>
            <Text style={{fontSize:12,color:'#1F2937'}}>Trong bối cảnh dịch bệnh covid-19 hiện nay, tiêm vắc xin phòng bệnh covid-19 là một trong các chiến lược để đẩy lùi dịch. Chúng ta sẽ tìm hiểu để nắm rõ về vấn đề này.</Text>
            <Text style={{fontWeight:"400",color:'#1F2937',fontSize:10}}>03:37 - 10/11/2023</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:"row",width:"100%",height:120,borderBottomWidth:1, borderBottomColor:themes.green}}>
          <View style={{width:'10%',height:"100%",justifyContent:"flex-start",alignItems:"center"}}>
            <Image resizeMode="contain" style={{height:"50%",width:"100%",justifyContent:"flex-start",alignItems:"center"}} source={require('../../assets/Icon/logo.png')}></Image>
          </View> 
          <View style={{width:'90%',height:"100%",paddingRight:'5%',justifyContent:"space-evenly",paddingTop:'2%',paddingBottom:'2%'}}>
            <Text style={{fontWeight:"600",color:'#1F2937'}}>Tiêm vắc xin phòng bệnh covid-19</Text>
            <Text style={{fontSize:12,color:'#1F2937'}}>Trong bối cảnh dịch bệnh covid-19 hiện nay, tiêm vắc xin phòng bệnh covid-19 là một trong các chiến lược để đẩy lùi dịch. Chúng ta sẽ tìm hiểu để nắm rõ về vấn đề này.</Text>
            <Text style={{fontWeight:"400",color:'#1F2937',fontSize:10}}>03:37 - 10/11/2023</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:"row",width:"100%",height:120,borderBottomWidth:1, borderBottomColor:themes.green}}>
          <View style={{width:'10%',height:"100%",justifyContent:"flex-start",alignItems:"center"}}>
            <Image resizeMode="contain" style={{height:"50%",width:"100%",justifyContent:"flex-start",alignItems:"center"}} source={require('../../assets/Icon/logo.png')}></Image>
          </View> 
          <View style={{width:'90%',height:"100%",paddingRight:'5%',justifyContent:"space-evenly",paddingTop:'2%',paddingBottom:'2%'}}>
            <Text style={{fontWeight:"600",color:'#1F2937'}}>Tiêm vắc xin phòng bệnh covid-19</Text>
            <Text style={{fontSize:12,color:'#1F2937'}}>Trong bối cảnh dịch bệnh covid-19 hiện nay, tiêm vắc xin phòng bệnh covid-19 là một trong các chiến lược để đẩy lùi dịch. Chúng ta sẽ tìm hiểu để nắm rõ về vấn đề này.</Text>
            <Text style={{fontWeight:"400",color:'#1F2937',fontSize:10}}>03:37 - 10/11/2023</Text>
          </View>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default CustomerNotification

const styles = StyleSheet.create({
  container:{
    height:'100%',
    width:windowWidth,
  },
  body:{
    flex:1,
    width:"100%",
  },
})