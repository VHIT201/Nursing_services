import React, { useState, useEffect } from "react";
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
import JobsReceived from "./JobsReceived";
import Header from "../../components/header/Header";
import HomeSelectButton from "../../components/selectionbar/HomeSelectButton";
import themes from "../../../themes";
import InfoService from "../../components/selectionbar/InfoService";
import dataService from "../../seeders/dataService";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from "../../components/Progress/Loading";
import { getListServices, getListSubServicesByIDService } from "../../redux/slices/servicesSlice";
import { getInfoUser } from "../../redux/slices/userSlice";
import { useDispatch,useSelector } from 'react-redux';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const NursesHome = ({navigation}) => {
  const [visibleModal,setVisibleModal] = useState(false)

    //redux
    const dispatch = useDispatch()
    const loadingUser = useSelector(state=> state.user.loading)
    // console.log(loadingUser);
    const loadingService = useSelector((state)=> state.services.loading)
    const {user} = useSelector(state=> state.user)
  
    // console.log(loadingService);
    //SECTION - Bắt đầu
    useEffect(() => {
      const getToken = async () => {
        const value = await AsyncStorage.getItem("userToken"); //Lấy token từ store
        if (value !== null) {
          const data = JSON.parse(value); 
          // console.log(data)
          dispatch(getListServices())
          dispatch(getInfoUser(data))
        }
        if(value == null){
          // navigation.navigate('Login')
        }
      };
      getToken()
    }, []);


    const dataServices = useSelector((state) => state.services)
    const listServices = dataServices.services
    // console.log(listServices);
    const dataSubService = useSelector((state) => state.services)
    const listSubService = dataSubService.subServices.subService

  const openDrawer = ()=>{
    navigation.openDrawer()
  }
  const handleNavigation = () =>{
    navigation.navigate('JobsReceived')
  }

  const handleHomeButton = (id) =>{
    // findSubServicesById(id)

    const idService = id
    // console.log(idService)
    // dispatch(getListSubServices(idService))
    dispatch(getListSubServicesByIDService(idService))
    setVisibleModal(true)
  }
  const handleLeftModalButton = () =>{
    setVisibleModal(false)
  }

  const handlePressItemModal = (name,id) =>{
    navigation.navigate('JobsReceived',{name,id})
  }

{/* <EvilIcons name="navicon" size={30} color={'white'}/> */}
  return (
    <View style={styles.container}>
      <StatusBar/>
      <Header namePage={'Trang chủ'} handleLeftButton={openDrawer} nameLeftIcon={'navicon'}/>
      {
        user.wallet <= 500000 && (
          <View style={{height:30,width:"100%",justifyContent:"center",alignItems:"center",flexDirection:'row'}}>
        <Text style={{fontSize:12, fontWeight:'500',color:"red"}}>Số tiền trong tài khoản không đủ điều kiện giao dịch, </Text>
        <TouchableOpacity onPress={()=>navigation.navigate('NursesWallet')} style={{height:30,justifyContent:"center",alignItems:"center"}}>
          <Text style={{fontSize:12, fontWeight:'500',textDecorationLine:"underline",color:'red'}}>xem tại đây !</Text>
        </TouchableOpacity>
      </View>
        )
      }
      <View style={{flex:1,width:'100%',paddingLeft:"5%",paddingRight:"5%",marginTop:4}}>
      <FlatList
          data={listServices}
          renderItem={({ item }) => (
            <HomeSelectButton handlePress={()=>handleHomeButton(item._id)} nameLeftIcon={'chevron-left'} title={item.name} />
                                    )}
          keyExtractor={(item) => item._id} 
        />
      </View>
      {
        visibleModal &&(
          <View style={styles.modal}>
            <Header nameLeftIcon={'chevron-left'} handleLeftButton={handleLeftModalButton} namePage={dataSubService.subServices.name} /> 
            <View style={{flex:1,width:"100%"}}>
              <FlatList
                  data={listSubService}
                  renderItem={({ item }) => (
                      <HomeSelectButton handlePress={()=>handlePressItemModal(item.name,item._id)} countMedicalExamination={item.countMedicalExamination}  nameLeftIcon={'chevron-left'}  title={item.name} />
                      )}
                  keyExtractor={(item) => item._id} 
                  />
            </View>
          </View>
        )
      }
      {
        loadingUser == true && (
          <Loading/>
        )
      }
      {
        loadingService == true && (
          <Loading/>
        )
      }
    </View>
  )
}

export default NursesHome

const styles = StyleSheet.create({
  container:{
    height:'100%',
    width:windowWidth,
    position:"relative"
  },
  modal:{
    position:"absolute",
    height:"100%",
    width:"100%",
    backgroundColor:"white",
    zIndex:2
  },
})