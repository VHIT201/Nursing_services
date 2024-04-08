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
import { getTransaction } from "../../redux/slices/nurseSlice";
import Loading from "../../components/Progress/Loading";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const NursesStatistic = ({navigation}) => {
  const [statusList, setStatusList] = useState('waiting')
  const dispatch = useDispatch()
  const [tokenUser, setTokenUser] = useState('')
  const listStatus = ['all','waiting', 'happening','complete','cancelled']
  const openDrawer = ()=>{
    navigation.openDrawer()
  }

  const loadingMedicalCase = useSelector(state=> state.medicals.loading)
  
// console.log('test ' , listMedicalByNurseId);
//SECTION - Bắt đầu
  useEffect(() => {
    const getToken = async () => {
      const value = await AsyncStorage.getItem("userToken"); 
      if (value !== null) {
        const data = JSON.parse(value); 
        setTokenUser(data)
        let values = {
          token : data,
          // status : 'waiting',
          nurseId: userDataRedux.user._id
        }
        dispatch(getListMedicalByNurseId(values))
      }
    };
    getToken()
  }, []);
//!SECTION

const userDataRedux = useSelector((state) => state.user)
// console.log(userDataRedux.user._id)
const {listMedicalByNurseId} = useSelector((state) => state.medicals)

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
      case 'waiting':
        return 'Đang chờ'
      default:
        return 'Tất cả'
}
  }
// console.log(statusList);
  return (
    <View style={styles.container}> 
      <Header nameLeftIcon={'navicon'} namePage={'Thống kê'} handleLeftButton={openDrawer}/>
      <View style={styles.body}>
      <ScrollView showsHorizontalScrollIndicator={false}  horizontal style={{ height: "6%", width: "100%" }}>
        {
          listStatus.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setStatusList(item)}
              style={statusList === item ? [styles.btnAct, { borderBottomColor: themes.green }] : styles.btn}>
              <Text style={{ fontSize: 12 }}>{handleChangeStatus(item)}</Text>
            </TouchableOpacity>
          ))
        }
      </ScrollView>

        <View style={{height:"94%",width:"100%",paddingTop:"1%"}}>
        {
              listMedicalByNurseId.length !== 0 ?
              (
                <>
                <ScrollView style={{flex:1,width:'100%',paddingLeft:'1%',paddingRight:"1%"}}>
                    {statusList === 'all' ? (
                      listMedicalByNurseId.map((item, index) => (
                        <ServiceDescription
                          handlePress={() => handlePressServiceDescription(item._id)} 
                          date={item.startDate} 
                          subService={item.subServiceId?.name} 
                          address={item.userId?.address} 
                          name={item.userId?.fullname} 
                          key={index} 
                          state={item.status} 
                        />
                      ))
                    ) : (
                      <>
                        {listMedicalByNurseId.filter(item => item.status === statusList).length === 0 && (
                          <View style={{height:600,width:'100%',justifyContent:"center",alignItems:"center"}}>
                            <Text style={{textAlign: 'center',color:themes.gray}}>Không có ca bệnh nào</Text>
                          </View>
                          
                        )}
                        {listMedicalByNurseId.map((item, index) => (
                          item.status === statusList && (
                            <ServiceDescription
                              handlePress={() => handlePressServiceDescription(item._id)} 
                              date={item.startDate} 
                              subService={item.subServiceId?.name} 
                              address={item.userId?.address} 
                              name={item.userId?.fullname} 
                              key={index} 
                              state={item.status} 
                            />
                          )
                        ))}
                      </>
                    )}
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

      {
        loadingMedicalCase == true && (
          <Loading/>
        )
      }

    </View>
  )
}

export default NursesStatistic

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
    width:windowWidth/4,
    borderBottomWidth:1,
    borderBottomColor:themes.gray,
    justifyContent:"center",
    alignItems:"center"
  },
  btnAct:{
    height:"100%",
    width:windowWidth/4,
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