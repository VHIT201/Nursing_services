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

const ServiceDescription = ({handlePress}) => {
  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <View style={{height:'20%',width:'100%',flexDirection:"row",justifyContent:"flex-start",alignItems:"center",gap:10, paddingLeft:'4%'}}>
        <FontAwesome name={'calendar'} size={20} color={themes.green}/> 
        <Text style={{fontWeight:"500",color:themes.green}}>NGÀY 10/11/2023</Text>
      </View>
      <View style={{height:"80%",width:"100%",justifyContent:'center',alignItems:'flex-start',paddingLeft:'10%',paddingRight:"1%",gap:4}}>
            <Text style={styles.text}>Công việc : <Text style={{fontWeight:"400"}}>Chăm sóc bệnh nhân tại nhà</Text></Text>
            <Text style={styles.text}>Giờ bắt đầu : <Text style={{fontWeight:"400"}}>10:20</Text></Text>
            <Text style={styles.text}>Số ngày : <Text style={{fontWeight:"400"}}>2</Text></Text>
            <Text style={styles.text}>Tổng tiền : <Text style={{fontWeight:"400"}}>300.000 đ</Text></Text>
            <Text style={styles.text}>Địa chỉ : <Text style={{fontWeight:"400"}}>298, hẻm 8, tổ 41, khu phố 11A, P.Tân Vạn, Biên Hòa</Text></Text>
            <Text style={styles.text}>Người thực hiện : <Text style={{fontWeight:"400"}}>Chưa có người nhận</Text></Text>
            
      </View>
    </TouchableOpacity>
  )
}

export default ServiceDescription

const styles = StyleSheet.create({
    container:{
        height:200,
        width:"100%",
        paddingTop:'2%',
        paddingBottom:"2%",
        borderBottomWidth:1,
        borderBottomColor:themes.green,
    },
    text:{
        fontWeight:'500',
    }
})