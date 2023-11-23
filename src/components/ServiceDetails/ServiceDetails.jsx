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
import Header from "../header/Header";
import themes from "../../../themes";

const ServiceDetails = ({handleHeaderLeftButton}) => {
  return (
    <View style={styles.container}>
      <Header handleLeftButton={handleHeaderLeftButton} nameLeftIcon={'chevron-left'} namePage={'Chi tiết'}/>
      <View style={styles.body}>
        <Text style={styles.text}>Thông tin đặt lịch</Text>
        <View style={{height:"40%",width:'100%',flexDirection:'column',justifyContent:'space-between'}}>
          <Text style={[styles.text,{color:"black"}]}>Mã dịch vụ :  
          <Text style={{fontWeight:'400',fontSize:14,color:"black"}}> DV 001</Text></Text>
          <Text style={[styles.text,{color:"black"}]}>Dịch vụ :  
          <Text style={{fontWeight:'400',fontSize:14,color:"black"}}> Chăm sóc bệnh nhân tại nhà</Text></Text>
          <Text style={[styles.text,{color:"black"}]}>Người đặt dịch vụ :  
          <Text style={{fontWeight:'400',fontSize:14,color:"black"}}> Lê Công Vinh</Text></Text>
          <Text style={[styles.text,{color:"black"}]}>Số điện thoại :  
          <Text style={{fontWeight:'400',fontSize:14,color:"black"}}> 0382823786</Text></Text>
          <Text style={[styles.text,{color:"black"}]}>Ngày bắt đầu :  
          <Text style={{fontWeight:'400',fontSize:14,color:"black"}}> 10-11-2023</Text></Text>
          <Text style={[styles.text,{color:"black"}]}>Ngày kết thúc :  
          <Text style={{fontWeight:'400',fontSize:14,color:"black"}}> 10-11-2023</Text></Text>
          <Text style={[styles.text,{color:"black"}]}>Giờ bắt đầu :  
          <Text style={{fontWeight:'400',fontSize:14,color:"black"}}> 8:00 am</Text></Text>
          <Text style={[styles.text,{color:"black"}]}>Giờ kết thúc :  
          <Text style={{fontWeight:'400',fontSize:14,color:"black"}}> 10:00 am</Text></Text>
          <Text style={[styles.text,{color:"black"}]}>Địa chỉ :  
          <Text style={{fontWeight:'400',fontSize:14,color:"black"}}> 298, hẻm 8, tổ 38c, khu phố 11, P.Tân Phong, BH, ĐN</Text></Text>
          
        </View>
        <Text style={styles.text}>Người thực hiện : <Text style={{fontWeight:'500',fontSize:14,color:"black"}}>ĐD Phạm Văn Mách</Text></Text>
        <Text style={styles.text}>Số điện thoại : <Text style={{fontWeight:'500',fontSize:14,color:"black"}}>0382823786</Text></Text>
        
        <Text style={styles.text}>Giá dịch vụ : <Text style={{fontWeight:'500',fontSize:14,color:"black"}}>258.000 đ</Text></Text>
        <Text style={styles.text}>Phương thức thanh toán : <Text style={{fontWeight:'500',fontSize:14,color:"black"}}>Tiền mặt</Text></Text>
        <Text style={styles.text}>Tình trạng : <Text style={{fontWeight:'500',fontSize:14,color:"black"}}>Chưa thanh toán</Text></Text>
        <View style={{flex:1,width:"100%",justifyContent:"flex-start",paddingTop:"10%"}}>
          <TouchableOpacity style={{height:40,width:'100%',backgroundColor:themes.green,justifyContent:'center',alignItems:'center',borderRadius:10}}>
            <Text style={{color:'white',fontWeight:"600"}}>Xác nhận giao dịch</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default ServiceDetails

const styles = StyleSheet.create({
    container:{
        height:'100%',
        width:"100%"
    },
    body:{
        flex:1,
        width:'100%',
        paddingLeft:"5%",
        paddingRight:"5%",
        paddingTop:'4%',
        gap:16
    },
    text:{
      fontSize:16,
      fontWeight:"600",
      color:themes.green
    }
})