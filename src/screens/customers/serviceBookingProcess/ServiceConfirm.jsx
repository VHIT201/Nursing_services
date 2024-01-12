import React, { useState,useEffect } from "react";
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
  Button,
  useWindowDimensions
} from "react-native";
import { useSelector,useDispatch } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { getListServices, getListSubServices, getListSubServicesByIDService } from "../../../redux/slices/servicesSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Foundation from "react-native-vector-icons/Foundation";
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../../../components/header/Header";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import themes from "../../../../themes";
import NumberPlease from 'react-native-number-please';
import RelativeItem from "../../../components/ListRelative/ItemRelative";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ServiceConfirm = ({navigation}) => {
  const route = useRoute();
  const [dataService, setDataService] = useState(null);
  useEffect(() => {
    if (route.params && route.params.startDate && route.params.endTime && route.params.startTime) {
      const startDate = new Date(route.params.startDate);
      const endTime = new Date(route.params.endTime);
      const startTime = new Date(route.params.startTime);
  
      setDataService({ ...route.params, startDate, endTime, startTime });
    }
  }, [route.params]);
  
  

  if (!dataService) {
    return <Text>Loading...</Text>;
  }
  console.log('Data Service:', dataService);

  //SECTION - Hàm lọc thời gian
  const extractTime = (datetime) => {
    const date = new Date(datetime);
  
    const hours = date.getHours();
    const formattedHours = hours < 10 ? `0${hours}` : hours; 
  
    const minutes = date.getMinutes();
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
    return `${formattedHours}:${formattedMinutes}`;
  };
  

//!SECTION
  //SECTION - Hàm lọc ngày
  const extractDay = (datetime) => {
    const date = new Date(datetime);
  
    const day = date.getDate();
    const formattedDay = day < 10 ? `0${day}` : day;
  
    const month = date.getMonth() + 1; 
    const formattedMonth = month < 10 ? `0${month}` : month;
  
    const year = date.getFullYear();
  
    return `${formattedDay}/${formattedMonth}/${year}`;
  };
  
  

//!SECTION

const handleCreateMedical = () =>{

}

  return (
    <View style={styles.container}>
            <Header nameLeftIcon={'chevron-left'} handleLeftButton={()=>navigation.goBack()} namePage={'Xác nhận dịch vụ'} />
            <View style={[styles.body,{paddingTop:"5%",paddingLeft:"5%",paddingRight:"5%"}]}>
              <Text style={{fontWeight:"600",fontSize:16,color:themes.green}}>Thông tin đặt lịch</Text>
              <View style={{flexDirection:'row',width:"100%",marginTop:20}}>
                <View style={{width:"30%",gap:10}}>
                  <Text style={styles.textBoldBlack}>Mã dịch vụ</Text>
                  <Text style={styles.textBoldBlack}>Dịch vụ</Text>
                  <Text style={styles.textBoldBlack}>Nhóm dịch vụ</Text>
                  <Text style={styles.textBoldBlack}>Ngày bắt đầu</Text>
                  <Text style={styles.textBoldBlack}>Giờ bắt đầu</Text>
                  <Text style={styles.textBoldBlack}>Giờ kết thúc</Text>
                  <Text style={styles.textBoldBlack}>Số ngày</Text>
                </View>
                <View style={{width:"70%",gap:10}}>
                  <Text style={styles.text}>DV001</Text>
                  <Text style={styles.text}>{dataService.nameService}</Text>
                  <Text style={styles.text}>Chăm sóc - Điều dưỡng</Text>
                  <Text style={styles.text}>{extractDay(dataService.startDate)}</Text>
                  <Text style={styles.text}>{extractTime(dataService.startTime)}</Text>
                  <Text style={styles.text}>{extractTime(dataService.endTime)}</Text>
                  <Text style={styles.text}>1</Text>
                </View>
              </View>
              <Text style={{fontWeight:"600",fontSize:15,marginTop:30,color:themes.green,marginBottom:10}}>Người sử dụng dịch vụ</Text>
              <Text style={{fontSize:15}}>{dataService.serviceUsers.fullname}</Text>
              <Text style={{fontWeight:"600",fontSize:15,marginTop:30,color:themes.green,marginBottom:10}}>Điều dưỡng</Text>
              <Text style={{fontSize:15}}>Hiện tại chưa có điều dưỡng nào !</Text>
              <Text style={{fontWeight:"600",fontSize:15,marginTop:20,color:themes.green,marginBottom:10}}>Địa chỉ sử dụng dịch vụ</Text>
              <Text style={{fontSize:15}}>{dataService.serviceUsers.address}</Text>
              
              <View style={{height:20,width:'100%',flexDirection:'row',justifyContent:'space-between',alignItems:"center",marginTop:20,paddingRight:"30%"}}>
                <Text style={{fontSize:15,color:themes.green,fontWeight:'600'}}>Giá dịch vụ</Text>
                <Text style={{fontSize:15,fontWeight:"500",color:"red"}}>500.000 đ</Text>
              </View>
              <View style={{height:20,width:'100%',flexDirection:'row',justifyContent:'space-between',alignItems:"center",marginTop:20,paddingRight:"30%"}}>
                <Text style={{fontSize:15,color:themes.green,fontWeight:'600'}}>Phương thức thanh toán</Text>
                <Text style={{fontSize:15,fontWeight:"500",color:"red"}}>Tiền mặt</Text>
              </View>
              
            </View>
            <View style={{flex:1,width:"100%",justifyContent:'flex-end',paddingBottom:"5%",alignItems:"center"}}>
                <TouchableOpacity onPress={handleCreateMedical} style={{height:50,width:"90%",backgroundColor:themes.green,borderRadius:10,justifyContent:"center",alignItems:"center"}}>
                  <Text style={{color:'white',fontSize:16,fontWeight:"600"}}>Xác nhận</Text>
                </TouchableOpacity>
              </View>

          </View>
  )
}

export default ServiceConfirm

const styles = StyleSheet.create({
  container:{
    height:'100%',
    width:"100%",
    backgroundColor:"white",
  },
  textBoldBlack:{
    color:themes.green,
    fontSize:15,
    fontWeight:"500"
  },
  text:{
    fontSize:15,
    fontWeight:'500'
  }
})