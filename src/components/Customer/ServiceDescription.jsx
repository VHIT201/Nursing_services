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

const ServiceDescription = ({handlePress,state}) => {
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
                <Text style={{fontSize:12, fontWeight:'500',color:'gray'}}>Người thực hiện : Phạm Văn Hoàng</Text>
              </View>
          

              <View style={{width:'100%',flexDirection:"column",alignItems:"flex-start",justifyContent:'center'}}>
                <Text style={{fontSize:12,fontWeight:"500",color:'gray'}}>Trạng thái : Đã hủy</Text>
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
          <View style={[styles.topLeftContent, {backgroundColor:"rgba(63, 185, 80, 0.2)",}]}>
            <Text style={{color:'white',fontSize:14,fontWeight:'500'}}>22/12/2023</Text>
          </View>
          <View style={{height:'1%',width:"100%",backgroundColor:"white"}}></View>
          <View style={[styles.bottomLeftContent, {backgroundColor:"rgba(63, 185, 80, 0.2)",}]}>
            <Text style={{fontSize:14,fontWeight:'500',color:'white'}}>9.30 AM</Text>
          </View>
        </View>
        <View style={styles.rightContent}>
          <View style={{width:'100%',flexDirection:"row",alignItems:"center"}}>
            <Text style={{fontSize:14,fontWeight:"600",marginRight:4}}>Phạm Văn Hoàng</Text>
            <Text style={{fontSize:12,fontWeight:"400", color:'gray'}}>42</Text>
          </View>
          <View style={{width:'100%',flexDirection:"row",alignItems:"center"}}>
            <Text style={{fontSize:12,fontWeight:"400", color:'gray',fontWeight:"500"}}>297, hẻm 8, tổ 39c, KP11, P.Tân Phong, Biên Hòa, Đồng Nai</Text>
          </View>
          <View style={{width:'100%',flexDirection:"row",alignItems:"center"}}>
            <Text style={{fontSize:12,fontWeight:"400", color:'gray',fontWeight:"500"}}>Chăm sóc bệnh nhân tại bệnh viện</Text>
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