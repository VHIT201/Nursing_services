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
import { getAllMedical, createMedical } from "../../../redux/slices/medicalCaseSlice";
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
  const dispatch = useDispatch()
  const route = useRoute();
  // const [dataService, setDataService] = useState(null);
  const dataService = route.params;
  console.log(dataService);


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

  // lọc để show
  const extractDay = (datetime) => {
    const date = new Date(datetime);
  
    const day = date.getDate();
    const formattedDay = day < 10 ? `0${day}` : day;
  
    const month = date.getMonth() + 1; 
    const formattedMonth = month < 10 ? `0${month}` : month;
  
    const year = date.getFullYear();
  
    return `${formattedDay}/${formattedMonth}/${year}`;
  };




const handleCreateMedical = () =>{
  let dataMedicalSubmit = {
    token : tokenUser,
    subServiceId: dataService.subServiceId,
    nurseId: dataService.nurseId,
    // userRelativeId: dataService.userRelativeId,
    discountCode:dataService.discountCode,
    note:dataService.note,
    status:dataService.status,
    startDate: new Date(dataService.startTime),
    endDate: new Date(dataService.endTime),
    totalPrice: dataService.totalPrice
}
    // dispatch(getAllMedical(dataMedicalSubmit))
    dispatch(createMedical(dataMedicalSubmit))
}

  const [tokenUser, setTokenUser] = useState('')
  //SECTION - Get data relatives
  useEffect(() => {
    console.log("bắt đầu tìm kiếm token")
    const getToken = async () => {
      const value = await AsyncStorage.getItem("userToken"); //Lấy token từ store
      if (value !== null) {
        const data = JSON.parse(value); 
        setTokenUser(data)
      }
    };
    getToken()
  }, []);



  return (
    <View style={styles.container}>
            <Header nameLeftIcon={'chevron-left'} handleLeftButton={()=>navigation.goBack()} namePage={'Xác nhận dịch vụ'} />
            <View style={[styles.body,{paddingTop:"5%",paddingLeft:"5%",paddingRight:"5%"}]}>
              <Text style={{fontWeight:"600",fontSize:16,color:themes.green}}>Thông tin đặt lịch</Text>
              <View style={{flexDirection:'column',width:"100%",marginTop:10,alignItems:'center'}}>
                <View style={{width:"100%",flexDirection:"row"}}>
                  <View style={{width:"30%"}}>
                    <Text style={styles.titleInfoMedical}>Mã dịch vụ : </Text>
                  </View>
                  <View style={{width:"70%"}}>
                    <Text>DV001</Text>
                  </View>
                </View>
                <View style={{width:"100%",flexDirection:"row"}}>
                  <View style={{width:"30%"}}>
                    <Text style={styles.titleInfoMedical}>Dịch vụ : </Text>
                  </View>
                  <View style={{width:"70%"}}>
                    <Text>{dataService.nameService}</Text>
                  </View>
                </View>
                <View style={{width:"100%",flexDirection:"row"}}>
                  <View style={{width:"30%"}}>
                    <Text style={styles.titleInfoMedical}>Nhóm dịch vụ : </Text>
                  </View>
                  <View style={{width:"70%"}}>
                    <Text >Chăm sóc - điều dưỡng</Text>
                  </View>
                </View>
                <View style={{width:"100%",flexDirection:"row"}}>
                  <View style={{width:"30%"}}>
                    <Text style={styles.titleInfoMedical}>Ngày bắt đầu : </Text>
                  </View>
                  <View style={{width:"70%"}}>
                    <Text>{extractDay(dataService.startDate)}</Text>
                  </View>
                </View>
                <View style={{width:"100%",flexDirection:"row"}}>
                  <View style={{width:"30%"}}>
                    <Text style={styles.titleInfoMedical}>Giờ bắt đầu : </Text>
                  </View>
                  <View style={{width:"70%"}}>
                    <Text>{extractTime(dataService.startTime)}</Text>
                  </View>
                </View>
                <View style={{width:"100%",flexDirection:"row"}}>
                  <View style={{width:"30%"}}>
                    <Text style={styles.titleInfoMedical}>Giờ kết thúc : </Text>
                  </View>
                  <View style={{width:"70%"}}>
                    <Text>{extractTime(dataService.endTime)}</Text>
                  </View>
                </View>
              </View>
              <Text style={{fontWeight:"600",fontSize:15,marginTop:20,color:themes.green,marginBottom:10}}>Người sử dụng dịch vụ</Text>
              <Text style={{fontSize:15}}>Tên : {dataService.serviceUsers.fullname}</Text>
              <Text style={{fontWeight:"600",fontSize:15,marginTop:20,color:themes.green,marginBottom:10}}>Điều dưỡng</Text>
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
    color:'black',
    fontSize:15,
    fontWeight:"500"
  },
  text:{
    fontSize:15,
    fontWeight:'500'
  },
  titleInfoMedical:{
    fontWeight:"600"
  }
})