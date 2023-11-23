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
import JobsReceived from "./JobsReceived";
import Header from "../../components/header/Header";
import HomeSelectButton from "../../components/selectionbar/HomeSelectButton";
import themes from "../../../themes";
import InfoService from "../../components/selectionbar/InfoService";
import dataService from "../../seeders/dataService";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const NursesHome = ({navigation}) => {

  const openDrawer = ()=>{
    navigation.openDrawer()
  }
  const handleNavigation = () =>{
    navigation.navigate('JobsReceived')
  }

  const [services, setServices] = useState([
    { id: 1, service: 'Chăm sóc - điều dưỡng', state: false },
    { id: 2, service: 'Thủ thuật điều dưỡng', state: false },
    { id: 3, service: 'Phục hồi chức năng', state: false },
    { id: 4, service: 'Châm cứu - Bấm huyệt', state: false },
    { id: 5, service: 'Mẹ và bé', state: false },
    { id: 6, service: 'Đặt lịch xét nghiệm tại nhà', state: false },
  ]);
{/* <EvilIcons name="navicon" size={30} color={'white'}/> */}
  return (
    <View style={styles.container}>
      <StatusBar/>
      <Header namePage={'Trang chủ'} handleLeftButton={openDrawer} nameLeftIcon={'navicon'}/>
      <View style={{flex:1,width:'100%'}}>
      <FlatList
          data={services}
          renderItem={({ item }) => (
            <HomeSelectButton handlePress={handleNavigation} title={item.service} />
            
            )}
          keyExtractor={(item) => item.id} 
        />
        
      </View>
      
    </View>
  )
}

export default NursesHome

const styles = StyleSheet.create({
  container:{
    height:'100%',
    width:windowWidth,

  },
  
})