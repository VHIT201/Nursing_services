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
import InfoService from "../../components/selectionbar/InfoService";
import ServiceDescription from "../../components/Customer/ServiceDescription";
import CalendarListItem from "../../components/Customer/CalendarListItem";
import ServiceDetails from "../../components/ServiceDetails/ServiceDetails";
import { useSelector,useDispatch } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getListMedicalByNurseId, getListMedicalByUserId } from "../../redux/slices/medicalCaseSlice";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CustomerServices = ({navigation}) => {
  const [statusList, setStatusList] = useState('waiting')
  const dispatch = useDispatch()
  const [isSelecting,setIsSelecting] = useState(0)
  const [modalVisible,setModalVisible] = useState(false)
  const [appointmentList,setAppointmentList] = useState(true)
  const listStatus = ['waiting', 'happening','complete','cancelled']
  const openDrawer = ()=>{
    navigation.openDrawer()
  }
  const {listMedicalByUserId} = useSelector((state) => state.medicals)
  console.log(listMedicalByUserId)
  const handlePressServiceDescription = (idSub) => {
    navigation.navigate('MedicalDetails', {idSub : idSub});
  }

  const handleChangeStatus = (status) => {
    switch(status) {
      case 'happening':
        return 'Đang diễn ra'
      case 'complete':
        return 'Hoàn thành'
      case 'cancelled':
        return 'Đã hủy'
      default:
        return 'Đang chờ'
}
  }

  return (
    <View style={styles.container}> 
      <Header nameLeftIcon={'navicon'} namePage={'Công việc'} handleLeftButton={openDrawer}/>
      <View style={styles.body}>
        <View style={{height:"6%",width:"100%",flexDirection:'row',alignItems:'center',justifyContent:"space-between"}}>
        {
          listStatus.map((item,index)=>(
            <TouchableOpacity onPress={()=>setStatusList(item)} key={index} style={ statusList == item ?[styles.btnAct,{borderBottomColor:themes.green}]:styles.btn}>
              <Text style={{fontSize:12}}>{handleChangeStatus(item)}</Text>
            </TouchableOpacity>
          ))
        }
        </View>
        <View style={{height:"94%",width:"100%",paddingTop:"1%"}}>
        {
              listMedicalByUserId.length !== 0 ?
              (
                <>
              <ScrollView style={{flex:1,width:'100%',paddingLeft:'1%',paddingRight:"1%"}}>
                {
                  listMedicalByUserId.map((item, index) => (
                    item.status == statusList && (
                      <ServiceDescription handlePress={()=>handlePressServiceDescription(item._id)} 
                                          date={item.startDate} 
                                          subService={item.subServiceId?.name} 
                                          address={item.userId?.address} 
                                          name={item.userId.fullname} 
                                          key={index} 
                                          state={item.status} />
                    )
                  ))
                }


                <View style={{height:100,width:'100%'}}></View>
              </ScrollView>
                </>
              ) 
              :
              (
                <View style={{flex:1,width:'100%',justifyContent:"center",alignItems:"center",}}> 
                  <Text style={{color:themes.gray}}>Danh sách lịch trống</Text>
                  <View style={{height:100}}></View>
                </View> 
              )
            
                }

        </View>
      </View>



    </View>
  )
}

export default CustomerServices

const styles = StyleSheet.create({
  container:{
    height:"100%",
    width:"100%",
    position:"relative"  
  },
  body:{
    flex:1,
    width:"100%",
    paddingLeft:'1%',
    paddingRight:"1%"
  },
  btn:{
    height:"100%",
    width:"24%",
    borderBottomWidth:1,
    borderBottomColor:themes.gray,
    justifyContent:"center",
    alignItems:"center"
  },
  btnAct:{
    height:"100%",
    width:"24%",
    borderBottomWidth:1,
    borderBottomColor:themes.green,
    justifyContent:"center",
    alignItems:"center"
  },

  modal:{
    height:"100%",
    width:"100%",
    backgroundColor:"white",
    position:"absolute"
  }
})