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
import ServiceDetails from "../../components/ServiceDetails/ServiceDetails";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const JobsReceived = ({navigation}) => {
  const [visibleModal,setVisibleModal] = useState(false)
  const handleHeaderLeftButton = () =>{
    navigation.goBack()
  }
  const handleItemPress = ()=>{
    setVisibleModal(true)
  }
  const handleModalHeaderLeftButton = () =>{
    setVisibleModal(false)
  }
  return (
    <View style={styles.container}>
      <Header handleLeftButton={handleHeaderLeftButton} nameLeftIcon={'arrow-left'} namePage={'Chăm sóc - Điều dưỡng'}/>
      <View style={styles.body}>
        <InfoService handlePress={handleItemPress} state={'happening'}/>
        <InfoService handlePress={handleItemPress} state={'notReceived'}/>
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