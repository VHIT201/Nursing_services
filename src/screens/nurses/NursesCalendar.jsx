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
import InfoService from "../../components/selectionbar/InfoService";
import Header from "../../components/header/Header";
import themes from "../../../themes";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const NursesCalendar = ({navigation}) => {
  const [appointmentList,setAppointmentList] = useState(true)
  const [visibleModal, setVisibleModal] = useState(false)
  const openDrawer = ()=>{
    navigation.openDrawer()
  }
  const handleLeftButton = () =>{
    setAppointmentList(true)

  }
  const handleRightButton = () =>{
    setAppointmentList(false)
  }
  return (
    <View style={styles.container}>
      <Header nameLeftIcon={'navicon'} handleLeftButton={openDrawer} namePage={'Lịch của tôi'}/>
      <View style={styles.body}>
        <View style={{flexDirection:"row",height:"6%",width:'100%',justifyContent:"space-between",alignItems:"center"}}>
          <TouchableOpacity onPress={()=>handleLeftButton()} style={appointmentList===true ? styles.btnAct : styles.btn}>
            <Text>Danh sách lịch hẹn</Text>
          </TouchableOpacity>
          <View style={{height:'70%',width:'0.6%',backgroundColor:themes.gray}}></View>
          <TouchableOpacity onPress={()=>handleRightButton()} style={appointmentList===true ? styles.btn : styles.btnAct}>
            <Text>Danh sách đã hẹn</Text>
          </TouchableOpacity>
        </View>
        
          
          
          {
            appointmentList === true ?
            (
              <>
              <ScrollView style={{flex:1,width:'100%',paddingLeft:'1%',paddingRight:"1%"}}>
              <InfoService state={'notReceived'}/>
              <InfoService state={'happening'}/>
              <InfoService state={'complete'}/>
              <InfoService state={'cancelled'}/>
              
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
  )
}

export default NursesCalendar

const styles = StyleSheet.create({
  container:{
    height:'100%',
    width:windowWidth,
    position:'relative'
  },
  body:{
    flex:1,
    width:'100%'
  },
  btn:{
    justifyContent: 'center',
    alignItems:"center",
    width:'49.2%',
    height:"100%",
    borderBottomWidth:2,
    borderBottomColor:themes.gray
  },
  btnAct:{
    justifyContent: 'center',
    alignItems:"center",
    width:'49.2%',
    height:"100%",
    borderBottomWidth:2,
    borderBottomColor:themes.green
  },
  modal:{
    height:"100%",
    width:"100%",
    position:"absolute"
  }
})