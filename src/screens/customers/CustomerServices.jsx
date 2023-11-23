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
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CustomerServices = ({navigation}) => {
  const [isSelecting,setIsSelecting] = useState(0)
  const [modalVisible,setModalVisible] = useState(false)
  const handleListItem =()=>{
    setModalVisible(true)
  }
  const handleModalLeftButton =()=>{
    setModalVisible(false)
  }
  const openDrawer = ()=>{
    navigation.openDrawer()
  }

  return (
    <View style={styles.container}> 
      <Header nameLeftIcon={'navicon'} namePage={'Công việc'} handleLeftButton={openDrawer}/>
      <View style={styles.body}>
        <View style={{height:"6%",width:"100%",flexDirection:'row',alignItems:'center',justifyContent:"space-between"}}>
          <TouchableOpacity onPress={()=>setIsSelecting(0)} style={ isSelecting===0 ?styles.btnAct:styles.btn}>
            <Text style={{fontSize:12}}>Đang chờ duyệt</Text>
          </TouchableOpacity>
          <View style={{height:"40%",width:1,backgroundColor:themes.gray}}></View>
          <TouchableOpacity onPress={()=>setIsSelecting(1)} style={ isSelecting===1 ?styles.btnAct:styles.btn}>
            <Text style={{fontSize:12}}>Đang thực hiện</Text>
          </TouchableOpacity>
          <View style={{height:"40%",width:1,backgroundColor:themes.gray}}></View>
          <TouchableOpacity onPress={()=>setIsSelecting(2)} style={ isSelecting===2 ?styles.btnAct:styles.btn}>
            <Text style={{fontSize:12}}>Đã hoàn thành</Text>
          </TouchableOpacity>
          <View style={{height:"40%",width:1,backgroundColor:themes.gray}}></View>
          <TouchableOpacity onPress={()=>setIsSelecting(3)} style={ isSelecting===3 ?styles.btnAct:styles.btn}>
            <Text style={{fontSize:12}}>Đã hủy bỏ</Text>
          </TouchableOpacity>
          
        </View>
        <View style={{height:"94%",width:"100%",paddingTop:"1%"}}>
          <View style={styles.itemListService}> 
            <View style={{height:'10%',width:"100%"}}>
              <CalendarListItem handleOnpress={handleListItem}/>
              <CalendarListItem handleOnpress={handleListItem}/>
              <CalendarListItem handleOnpress={handleListItem}/>
              <CalendarListItem handleOnpress={handleListItem}/>
              
            </View>
          </View>
        </View>
      </View>
      {
        modalVisible && (
          <View style={styles.modal}>
            <ServiceDetails handleHeaderLeftButton={handleModalLeftButton}/>
          </View>
        )
      }


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
  itemListService:{
    height:200,
    width:"100%",
  },
  modal:{
    height:"100%",
    width:"100%",
    backgroundColor:"white",
    position:"absolute"
  }
})