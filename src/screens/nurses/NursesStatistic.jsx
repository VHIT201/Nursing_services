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
import themes from "../../../themes";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const NursesStatistic = ({navigation}) => {
  const openDrawer = ()=>{
    navigation.openDrawer()
  }


  return (
    <View style={styles.container}>
      <Header namePage={'Thống kê'} nameLeftIcon={'navicon'} handleLeftButton={openDrawer}/>
      <View style={{flex:1,width:"100%"}}>
        <View style={{height:'30%',width:'100%',backgroundColor:'white'}}>
          <View style={{height:"20%",width:"100%",borderWidth:1,borderColor:themes.gray,justifyContent:"center",alignItems:"flex-start",paddingLeft:'4%'}}>
            <Text style={{fontSize:12,fontWeight:'500'}}>THỐNG KÊ GIAO DỊCH</Text>
          </View>
          <View style={{flex:1,width:"100%"}}>
            <View style={{height:'50%',width:"100%",flexDirection:"row"}}>
              <TouchableOpacity style={{height:'100%',width:'50%',borderRightWidth:1,borderRightColor:themes.gray,justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontSize:12}}>TOÀN BỘ VIỆC</Text>
                <Text style={{fontSize:12}}>20</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{height:'100%',width:'50%',justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:12}}>THÀNH CÔNG</Text>
                <Text style={{fontSize:12}}>10</Text>
              </TouchableOpacity>
            </View>
            <View style={{height:'50%',width:"100%",flexDirection:"row",borderTopWidth:1,borderTopColor:themes.gray,borderBottomWidth:1,borderBottomColor:themes.gray}}>
              <TouchableOpacity style={{height:'100%',width:'50%',borderRightWidth:1,borderRightColor:themes.gray,justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontSize:12}}>ĐANG XỬ LÝ</Text>
                <Text style={{fontSize:12}}>5</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{height:'100%',width:'50%',justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:12}}>ĐANG CHỜ</Text>
                <Text style={{fontSize:12}}>5</Text>
              </TouchableOpacity>
            </View>
          </View>
          
        </View>
      </View>
    </View>
  )
}

export default NursesStatistic

const styles = StyleSheet.create({
  container:{
    height:windowHeight,
    width:windowWidth,
  },
})