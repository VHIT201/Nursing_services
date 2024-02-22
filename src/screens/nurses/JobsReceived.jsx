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
import InfoService from "../../components/selectionbar/InfoService";
import Header from "../../components/header/Header";
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getListMedicalByNurseId,getMedicalById } from "../../redux/slices/medicalCaseSlice";
import { useSelector,useDispatch } from 'react-redux';
import ServiceDetails from "../../components/ServiceDetails/ServiceDetails";
import ServiceDescription from "../../components/Customer/ServiceDescription";
import themes from "../../../themes";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const JobsReceived = ({navigation}) => {
  const dispatch = useDispatch()
  const route = useRoute();
  const { name, id } = route.params;
  const [visibleModal,setVisibleModal] = useState(false)
  const userDataRedux = useSelector((state) => state.user)
  const {listMedicalByNurseId} = useSelector((state) => state.medicals)
  const {listMedicalBySubId} = useSelector((state) => state.medicals)
// console.log('test ' , listMedicalByNurseId);
  const handleHeaderLeftButton = () =>{
    navigation.goBack()
  }
  const handleItemPress = ()=>{
    setVisibleModal(true)
  }
  const handleModalHeaderLeftButton = () =>{
    setVisibleModal(false)
  }
//SECTION - Bắt đầu
  useEffect(() => {
    const getToken = async () => {
      const value = await AsyncStorage.getItem("userToken"); //Lấy token từ store
      if (value !== null) {
        const data = JSON.parse(value); 
        let values = {
          token : data,
          // status : 'waiting',
          nurseId: userDataRedux.user._id,
          id : id
        }
        
        // dispatch(getListMedicalByNurseId(values))
        dispatch(getMedicalById(values))
      }
    };
    getToken()
  }, []);
  //!SECTION

  const handlePressServiceDescription = (idSub) => {
    navigation.navigate('MedicalDetails', {idSub : idSub});
  }

  return (
    <View style={styles.container}>
      <Header handleLeftButton={handleHeaderLeftButton} nameLeftIcon={'arrow-left'} namePage={name}/>
      <View style={styles.body}>
              {
                listMedicalBySubId == null ? 
                (
                    <View style={{flex:1,width:"100%",justifyContent:'center',alignItems:'center'}}>
                      <Text style={{color:themes.gray,marginBottom:100}}>Hiện tại không có ca bệnh nào</Text>
                    </View>
                )
                :
                (
                  <ScrollView style={{flex:1,width:'100%',paddingLeft:'1%',paddingRight:"1%"}}>
                  {
                      listMedicalBySubId.map((item, index) => (
                        item.status == 'waiting' && (
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
                )
                
              }



                
      </View>
      {
        visibleModal&&(
          <View style={styles.modal}>
            <ServiceDetails handleHeaderLeftButton={handleModalHeaderLeftButton}/>
          </View>
        )
      }
      
    </View>
  )
}

export default JobsReceived

const styles = StyleSheet.create({
  container:{
    height:'100%',
    width:'100%',
    position:"relative"
  },
  body:{
    flex:1,
    width:'100%',
    paddingLeft:'1%',
    paddingRight:'1%'
  },
  modal:{
    height:"100%",
    width:"100%",
    position:"absolute",
    backgroundColor:"white"
  }
})