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
import dataService from "../../seeders/dataService";
const CustomerChooseSerVice = ({navigation}) => {
    const handleLeftButton = () =>{
        navigation.goBack()
    }

// const [services, setServices] = useState([
//         { id: 1, service: 'Chăm sóc bệnh nhân tại nhà', state: false },
//         { id: 2, service: 'Chăm sóc bệnh nhân tại bệnh viện', state: false },
//         { id: 3, service: 'Chăm sóc người già tại nhà', state: false },
//         { id: 4, service: 'Chăm sóc bệnh nhân giai đoạn cuối', state: false },
// ]);

const services = dataService
console.log(services)

const handleButton = ()=>{
    console.log(services[1])
}

  return (
    <View style={styles.container}>
      <Header nameLeftIcon={'chevron-left'} namePage={'Chăm sóc - Điều dưỡng'} handleLeftButton={handleLeftButton}/> 
      <View style={{flex:1,width:"100%"}}>
        <FlatList
            data={services}
            renderItem={({ item }) => (
                <HomeSelectButton handlePress={handleButton} title={item.service} />
                
                )}
            keyExtractor={(item) => item.id} 
            />
      </View>
    </View>
  )
}

export default CustomerChooseSerVice

const styles = StyleSheet.create({
    container:{
        height:"100%",
        width:"100%",
        
    },
})