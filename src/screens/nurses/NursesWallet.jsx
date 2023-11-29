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
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const NursesWallet = ({navigation}) => {
  const openDrawer = ()=>{
    navigation.openDrawer()
  }
  const [visibleModal,setVisibleModal]= useState(false)
  const [visibleModal1,setVisibleModal1]= useState(false)

  const handleModalLeftButton = ()=>{
    setVisibleModal(false)
  }
  const handleModalLeftButton1 = ()=>{
    setVisibleModal1(false)
  }
  return (
    <View style={styles.container}>
      <Header namePage={'Ví tiền'} nameLeftIcon={'navicon'} handleLeftButton={openDrawer}/>
      <View style={{flex:1,width:'100%'}}>
        <View style={{height:'20%',width:'100%',justifyContent:"center",alignItems:"center",backgroundColor:themes.green2}}>
            <Entypo name={'wallet'} size={50} color={themes.green}/>
            <Text style={{fontSize:22,fontWeight:'600',color:themes.green}}>500.000 đ</Text>
        </View>
        <TouchableOpacity onPress={()=>setVisibleModal(true)} style={[styles.btn,{borderBottomWidth:1,borderBlockColor:themes.gray}]}>
          <Text>Tài khoản nhận tiền</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setVisibleModal1(true)} style={styles.btn}>
          <Text>Quy định nhận tiền</Text>
        </TouchableOpacity>
      </View>
      {
        visibleModal&&(
          <View style={styles.modal1}>
          <Header namePage={'Ví tiền'} nameLeftIcon={'chevron-left'} handleLeftButton={handleModalLeftButton}/>
          <View style={{flex:1,width:'100%',paddingTop:'5%',paddingLeft:"5%",paddingRight:"5%",gap:10}}>
            <Text style={{fontSize:16,fontWeight:"600", marginBottom:10,color:themes.green}}>Tài khoản nhận tiền</Text>
            <Text style={{color:themes.green}}>Tên chủ tài khoản</Text>
            <View style={styles.boxText}>
              <TextInput style={{height:"100%",width:"100%"}} placeholder="Nhập tên chủ tài khoản">

              </TextInput>
            </View>
            <Text style={{color:themes.green}}>Ngân hàng nhận thanh toán</Text>
            <TouchableOpacity style={[styles.boxText,{flexDirection:"row"}]}>
              <Text>Ngân hàng</Text>

            </TouchableOpacity>
            <Text style={{color:themes.green}}>Số tài khoản ngân hàng</Text>
            <View style={styles.boxText}>
              <TextInput style={{height:"100%",width:"100%"}} placeholder="Số tài khoản ngân hàng">

              </TextInput>
                        
            </View>
            <TouchableOpacity style={{height:40,marginTop:40,width:"100%",borderRadius:10,justifyContent:"center",alignItems:"center",backgroundColor:themes.green}}>
              <Text style={{fontSize:15,fontWeight:"500",color:'white'}}>Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>
        )
      }
      {
        visibleModal1&&(
          <View style={styles.modal1}>
          <Header namePage={'Quy định ví tiền'} nameLeftIcon={'chevron-left'} handleLeftButton={handleModalLeftButton1}/>
          <View style={{flex:1,width:'100%',paddingTop:'5%',paddingLeft:"5%",paddingRight:"5%",gap:10}}>
            <View style={{height:"10%",width:"100%",justifyContent:"center",alignItems:'center'}}>
              <Image style={{height:"100%",width:"100%"}} resizeMode="contain" source={require('../../assets/Icon/logo.png')}/>
            </View>
            <Text style={{fontSize:18,fontWeight:'600',textAlign:'center',marginTop:20,color:themes.green}}>
            CÁC ĐIỀU KHOẢN THỎA THUẬN DỊCH VỤ</Text>
            <View style={{width:"100%",paddingLeft:"5%",paddingRight:"5%"}}>
              <Text style={{fontWeight:"500",fontSize:15}}>• Chiết khấu 25% trên tổng giá trị hóa đơn</Text>
              <Text style={{fontWeight:"500",fontSize:15}}>• Số tiền tối thiểu để có thể giao dịch là 1.000.000 đ</Text>
            </View>
          </View>
        </View>
        )
      }
      
    </View>
  )
}

export default NursesWallet

const styles = StyleSheet.create({
  container:{
    height:windowHeight,
    width:windowWidth,
  },
  btn:{
    height:"6%",
    width:'100%',
    backgroundColor:'white',
    justifyContent: 'center',
    paddingLeft:'4%'
  },
  modal1:{
    height:"100%",
    width:"100%",
    position:"absolute",
    backgroundColor:"white",
  },
  boxText:{
    height:36,
    width:"100%",
    borderWidth:1,
    borderColor:themes.blackwhite,
    justifyContent:"center",
    alignItems:'center',
    paddingLeft:'2%',
    paddingRight:"2%"
  }
})