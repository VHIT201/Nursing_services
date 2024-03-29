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
import themes from "../../../themes";

const ServiceDescription = ({handlePress,state,name, age, address, subService, idSub, date, time, nurse}) => {
  // console.log(nurse)
  const handleColorState = (state) =>{
    switch(state) {
      case 'waiting':
        return themes.yellow
      case 'happening':
        return themes.blue
      case 'complete':
        return themes.green
      case 'cancelled':
        return themes.red
      default:
        return themes.green
    }
  }

  const convertISOtoDDMMYYYY = (isoDateString)=> {
    const dateObject = new Date(isoDateString);
    const day = dateObject.getDate().toString().padStart(2, '0');
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObject.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  function convertISOTo24hr(dateTimeString) {
    const dateObject = new Date(dateTimeString);
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return formattedTime;
  }
  



  const handleBottom = (state) => {
      if(state == 'waiting'){
        return (
          <View style={{width:'100%',flexDirection:"row",alignItems:"center",justifyContent:'space-around'}}>
            <TouchableOpacity style={[styles.btn, {backgroundColor:handleColorState(state)}]}>
              <Text style={{color:'white',fontWeight:"500",fontSize:13}}>Chấp nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, {backgroundColor:'#9CA3AF'}]}>
              <Text style={{color:'white',fontWeight:"500",fontSize:13}}>Từ chối</Text>
            </TouchableOpacity>
          </View>
        )
      }
      else {
        return (
          <>
              <View style={{width:'100%',flexDirection:"row",alignItems:"center"}}>
                <Text style={{fontSize:12, fontWeight:'500',color:'gray'}}>Người thực hiện : {nurse}</Text>
              </View>
              <View style={{width:'100%',flexDirection:"column",alignItems:"flex-start",justifyContent:'center'}}>
                <Text style={{fontSize:12,fontWeight:"500",color:'gray'}}>Trạng thái : {state == 'happening' ?('đang diễn ra') : ('Đã hủy')}</Text>
              </View>
          </>
        )
      }
  }
     
        // waiting yellow
        // happening blue 
        // complete green
        // cancelled red

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.container,styles.containerShadowAndroid]}>
      <View style={{width:"94%",height:"100%",flexDirection:"row", borderWidth:1,borderRadius:10,borderColor:themes.gray,}}>
        <View style={[styles.leftContent, {backgroundColor:handleColorState(state)}]}>
          <View style={[styles.topLeftContent, ]}>
            <Text style={{color:'white',fontSize:14,fontWeight:'500'}}>{convertISOtoDDMMYYYY(date)}</Text>
          </View>
          <View style={{height:'1%',width:"100%",backgroundColor:"white"}}></View>
          <View style={[styles.bottomLeftContent, ]}>
            <Text style={{fontSize:14,fontWeight:'500',color:'white'}}>{convertISOTo24hr(date)}</Text>
          </View>
        </View>
        <View style={styles.rightContent}>
          <View style={{width:'100%',flexDirection:"row",alignItems:"center"}}>
            <Text style={{fontSize:14,fontWeight:"600",marginRight:4}}>{name}</Text>
            <Text style={{fontSize:12,fontWeight:"400", color:'gray'}}>42</Text>
          </View>
          <View style={{width:'100%',flexDirection:"row",alignItems:"center"}}>
            <Text style={{fontSize:12,fontWeight:"400", color:'gray',fontWeight:"500"}}>{address}</Text>
          </View>
          <View style={{width:'100%',flexDirection:"row",alignItems:"center"}}>
            <Text style={{fontSize:12,fontWeight:"400", color:'gray',fontWeight:"500"}}>{subService}</Text>
          </View>
          {handleBottom(state)}
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ServiceDescription

const styles = StyleSheet.create({
    container:{
        height:160,
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
        marginTop:10,
        borderRadius:10,
        
    },
    containerShadowAndroid :{

    },
    text:{
      fontWeight:'500',
    },
    leftContent:{
      width:'30%',
      height:"100%",
      borderTopLeftRadius:10,
      borderBottomLeftRadius:10
    },
    rightContent:{
      width:'70%',
      height:"100%",
      paddingLeft:'5%',
      paddingRight:'5%',
      justifyContent:"space-around",
      paddingTop:'2%',
      paddingBottom:"2%",
    },
    topLeftContent :{
      height:'49.5%',
      width:"100%",
      borderTopLeftRadius:10,
      justifyContent:"center",
      alignItems:'center'
    },
    bottomLeftContent :{
      height:'49.5%',
      width:"100%",
      borderBottomLeftRadius:10,
      justifyContent:"center",
      alignItems:'center'
    },
    btn:{
      height:36,
      width:"48%",
      borderRadius:10,
      justifyContent:"center",
      alignItems:"center"
      
    }
})