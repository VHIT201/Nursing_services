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
import { useSelector,useDispatch } from 'react-redux';
import { getInfoUser } from "../../redux/slices/userSlice";
import { getListServices, getListSubServices, getListSubServicesByIDService } from "../../redux/slices/servicesSlice";
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
import Header from "../../components/header/Header";
import HomeSelectButton from "../../components/selectionbar/HomeSelectButton";
import Loading from "../../components/Progress/Loading";
import themes from "../../../themes";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const CustomerHome = ({navigation}) => {
  //redux
  const dispatch = useDispatch()
  const [visibleModal,setVisibleModal] = useState(false)

 const {user} = useSelector((state) => state.user)
const userLoading = useSelector((state) => state.user.loading)
const serviceLoading = useSelector((state) => state.services.loading)
console.log(serviceLoading);
  // console.log(userId);
  const openDrawer = ()=>{
    navigation.openDrawer()
  }
  const handleHomeButton = (id) =>{
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
    navigation.navigate('ServiceForm',{name,id})
  }



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
  const dataSubService = useSelector((state) => state.services)
  const listSubService = dataSubService.subServices.subService

  return (
    <View style={styles.container}>
      <StatusBar/>
      <Header nameLeftIcon={'navicon'} handleLeftButton={openDrawer} namePage={'Trang chủ'} />
      <View style={styles.body}>
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
                      <HomeSelectButton handlePress={()=>handlePressItemModal(item.name,item._id)}   nameLeftIcon={'chevron-left'}  title={item.name} />
                      )}
                  keyExtractor={(item) => item._id} 
                  />
            </View>
            
          </View>
        )
      }
      {
        userLoading == true && (
          <Loading/>
        )
      }
      {
        serviceLoading == true && (
          <Loading/>
        )
      }
    </View>
  )
}

export default CustomerHome

const styles = StyleSheet.create({
  container:{
    height:"100%",
    width:'100%',
    position:"relative"
  },
  body:{
    flex:1,
    width:'100%',
    paddingLeft:"5%",
    paddingRight:"5%",
    paddingTop:4
  },
  modal:{
    position:"absolute",
    height:"100%",
    width:"100%",
    backgroundColor:"white",
    zIndex:2
  },
  modal1:{
    position:"absolute",
    height:"100%",
    width:"100%",
    backgroundColor:"white",
    zIndex:3
  },
  modal2:{
    position:"absolute",
    height:windowHeight,
    width:"100%",
    backgroundColor:"white",
    zIndex:4
  },
  btn:{
    height:'7%',
    width:"100%",
    flexDirection:'row',
    paddingLeft:'5%',
    paddingRight:"5%",
    alignItems:"center",
    justifyContent:"space-between",
    borderBottomColor:themes.gray,
    borderBottomWidth:1
  },
  btnAct:{
    height:'7%',
    width:"100%",
    flexDirection:'row',
    paddingLeft:'5%',
    paddingRight:"5%",
    alignItems:"center",
    justifyContent:"space-between",
    borderBottomColor:themes.green,
    borderBottomWidth:1
  },
  modal1Btn:{
    flexDirection:"row",
    justifyContent:"space-between",
    borderWidth:1,
    width:"48%",
    alignItems:"center",
    paddingLeft:"4%",
    paddingRight:"4%",
    borderColor:themes.gray
  },
  text:{
    fontSize:14,
   
  },
  textBoldBlack:{
    fontWeight:'600',
    color:themes.green
  }
})