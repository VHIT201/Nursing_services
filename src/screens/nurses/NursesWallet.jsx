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
  Button,
  Linking
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Foundation from "react-native-vector-icons/Foundation";
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import JobsReceived from "./JobsReceived";
import Header from "../../components/header/Header";
import HomeSelectButton from "../../components/selectionbar/HomeSelectButton";
import themes from "../../../themes";
import InfoService from "../../components/selectionbar/InfoService";
import call from 'react-native-phone-call';

import {Clipboard} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const NursesWallet = ({navigation}) => {
  const openDrawer = ()=>{
    navigation.openDrawer()
  }
  const [chooseItemListBank, setChooseItemListBank] = useState('')
  const handleChooseBankProfile = (number) => {
    setChooseItemListBank(number)
  }
  const phoneNumber = '0382823785';
  const handleCall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  const copyToClipboard = () => {
    Clipboard.setString('hello world');
  };

  return (
    <View style={styles.container}>
      <Header namePage={'Ví tiền'} nameLeftIcon={'navicon'} handleLeftButton={openDrawer}/>

      <ScrollView style={styles.body}>
        <View style={{flex:1,width:'100%',alignItems:"center"}}>
          <View style={styles.topView}>
            <View style={{height:50,width:'90%',flexDirection:'row',backgroundColor:'#f2f2f2',borderRadius:10,alignItems:"center",paddingLeft:"5%",paddingRight:"5%"}}>
              <View style={{height:'100%',width:'10%',justifyContent:"center",alignItems:"center"}}>
                <Image style={{height:30,width:30}} resizeMode="contain" source={require('.././../assets/Icon/logo.png')}/>
              </View>
              <View style={{height:"100%",width:"90%",justifyContent:"center",paddingLeft:'3%'}}>
                <Text style={{fontSize:14, color:'gray', fontWeight:"500"}}>Số dư ví : 
                  <Text style={{color:'black'}}>{`  500.000đ`}</Text>
                </Text>
              </View>
              
            </View>
            <View style={styles.boxTextInput}>
              <View style={{padding:5,backgroundColor:'white',justifyContent:"center",alignItems:'center',position:'absolute',top:'-40%',left:'6%'}}>
                <Text style={{fontSize:12,color:'gray',fontWeight:'500'}}>Số tiền cần rút</Text>
              </View>
              <TextInput keyboardType="number-pad" placeholder="0đ" style={{height:windowHeight*0.045,width:'86%',fontSize:17,fontWeight:'500'}}>

              </TextInput>
            </View>
            <View style={{width:"90%",alignItems:"flex-start",marginTop:6}}>
              <Text style={{fontSize:11,color:'red'}}>Số tiền trong ví phải lớn hơn 500.000đ để tiếp tục công việc !</Text>
            </View>
            </View>
            
            <View style={{flexDirection:'row',width:'90%',marginTop:30,alignItems:'center',justifyContent:"space-between"}}>
              <Text style={{fontSize:15,color:"#424242",fontWeight:'500'}}>PHƯƠNG THỨC NHẬN TIỀN</Text>
              <TouchableOpacity>
                <Text style={{fontSize:12,color:themes.green,fontWeight:'500'}}>Lịch sử giao dịch</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={[styles.bottomView, {flexDirection: "row", borderColor: chooseItemListBank == 1 ? themes.green : themes.gray}]}>
              <View style={{height:windowHeight*0.06,width:'18%',justifyContent:"center",alignItems:"center"}}>
                <Image style={{height:'100%',width:'100%'}} resizeMode="cover" source={require('../../assets/Icon/MB.png')}/>
              </View>
              <View style={{height:windowHeight*0.06,justifyContent:"center",width:'62%',paddingLeft:"2%"}}>
                <Text style={{fontWeight:'600',fontSize:15,color:"#424242",marginBottom:2}}>MB Bank</Text>
                <Text style={{fontSize:12,fontWeight:'500',color:"#424242",lineHeight:16}}>PHẠM VĂN HOÀNG</Text>
              </View>
              <TouchableOpacity onPress={()=>handleChooseBankProfile(1)} style={{height:windowHeight*0.06,width:'20%',justifyContent:"center",alignItems:"flex-end"}}>
                {
                  chooseItemListBank == 1 ?
                  (
                    <Ionicons color={themes.green} size={22} name={'radio-button-on-sharp'}/>
                  )
                  :
                  (
                    <Ionicons size={22} name={'radio-button-off-sharp'}/>
                  )
                }

              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.bottomView, {flexDirection: "row", borderColor: chooseItemListBank == 2 ? themes.green : themes.gray}]}>
              <View style={{height:windowHeight*0.06,width:'18%',justifyContent:"center",alignItems:"center"}}>
                <Image style={{height:'100%',width:'100%'}} resizeMode="cover" source={require('../../assets/Icon/MB.png')}/>
              </View>
              <View style={{height:windowHeight*0.06,justifyContent:"center",width:'62%',paddingLeft:"2%"}}>
                <Text style={{fontWeight:'600',fontSize:15,color:"#424242",marginBottom:2}}>MB Bank</Text>
                <Text style={{fontSize:12,fontWeight:'500',color:"#424242",lineHeight:16}}>PHẠM VĂN HOÀNG</Text>
              </View>
              <TouchableOpacity onPress={()=>handleChooseBankProfile(2)} style={{height:windowHeight*0.06,width:'20%',justifyContent:"center",alignItems:"flex-end"}}>
                {
                  chooseItemListBank == 2 ?
                  (
                    <Ionicons color={themes.green} size={22} name={'radio-button-on-sharp'}/>
                  )
                  :
                  (
                    <Ionicons size={22} name={'radio-button-off-sharp'}/>
                  )
                }

              </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.bottomView,{paddingTop:10,paddingBottom:10}]}>
              <Ionicons color={themes.green} size={20} name={'add-sharp'}/>
            </TouchableOpacity>


            <View style={{flexDirection:'row',width:'90%',marginTop:30,alignItems:'center',justifyContent:"space-between"}}>
              <Text style={{fontSize:15,color:"#424242",fontWeight:'500'}}>PHƯƠNG THỨC NẠP TIỀN</Text>
              <TouchableOpacity>
                <Text style={{fontSize:12,color:themes.green,fontWeight:'500'}}>Lịch sử giao dịch</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.bottomView,{paddingTop:20,paddingBottom:20}]}>
              <View style={styles.innerItemHorizontal}>
                <Text style={styles.innerItemHorizontal_title}>Chuyển tiền đến</Text>
                <Text style={styles.innerItemHorizontal_content}>PHAM VAN HOANG</Text>
              </View>
              <View style={styles.innerItemHorizontal}>
                <Text style={styles.innerItemHorizontal_title}>NGÂN HÀNG</Text>
                <Text style={styles.innerItemHorizontal_content}>TMCP QUÂN ĐỘI (MB BANK)</Text>
              </View>
              <View style={[styles.innerItemHorizontal,{marginBottom:0}]}>
                <Text style={styles.innerItemHorizontal_title}>STK</Text>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <Text style={styles.innerItemHorizontal_content}>0382823785</Text>
                  <View style={{width:10}}></View>
                  <TouchableOpacity onPress={copyToClipboard}>
                    <Ionicons color={themes.green} size={14} name={'clipboard-outline'}/>
                  </TouchableOpacity>
                  
                </View>
                
              </View>
              <View style={{height:1, width:"90%",backgroundColor:themes.gray,marginTop:20, marginBottom:20}}></View>
              <View style={{width:'100%',justifyContent:"center",marginBottom:8}}>
                <Text style={{fontSize:14,color:"red"}}>Nội dung : ALODIEUDUONG NTK + Mã điều dưỡng</Text>
              </View>
              <View style={{width:'100%',justifyContent:"center"}}>
                <Text style={{fontSize:14,color:"black"}}>Lưu ý : sau 1 giờ kể từ khi chuyển khoản nhưng chưa được giải quyết, có thể khiếu nại qua tổng đài 
                <TouchableOpacity onPress={handleCall}>
                  <Text style={{color:'red',fontWeight:'500'}}>0382823785</Text>
                </TouchableOpacity></Text>
              </View>
            </View>
            <View style={{height:100}}></View>
        </View>
      </ScrollView>
      
      <View style={styles.bottomContainButton}>
        <TouchableOpacity  style={{height:windowHeight*0.06,width:"90%",backgroundColor:themes.green,borderRadius:10,justifyContent:"center",alignItems:"center"}}>
          <Text style={{fontSize:15,fontWeight:"500",color:'white'}}>Rút tiền</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}


export default NursesWallet

const styles = StyleSheet.create({
  container:{
    height:windowHeight,
    width:windowWidth,
    backgroundColor:"white",
    position:'relative'
  },
  bottomContainButton:{
    width:"100%",
    flexDirection:"row",
    position:'absolute',
    bottom:0,
    justifyContent:"center",
    paddingBottom:10
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
  },
  body:{
    flex:1,
    width:"100%",
  },
  topView:{
    paddingTop:16,
    paddingBottom:20,
    borderWidth:1,
    borderColor:themes.gray,
    backgroundColor:'white',
    width:'94%',
    borderRadius:10,
    marginTop:20,
    alignItems:"center",
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5, 
  },
  boxTextInput:{
    marginTop:20,
    paddingTop:10,
    paddingBottom:10,
    width:'90%',
    borderWidth:1,
    borderColor:themes.green,
    borderRadius:10,
    position:"relative",
    alignItems:'center'
  },
  bottomView:{
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:"5%",
    paddingRight:"5%",
    borderWidth:1,
    borderColor:themes.gray,
    backgroundColor:'white',
    width:'94%',
    borderRadius:10,
    marginTop:10,
    alignItems:"center",
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25, 
    shadowRadius: 3, 
    elevation: 5, 
  },
  innerItemHorizontal:{
    flexDirection:'row',
    width:'100%',
    alignItems:'center',
    justifyContent:'space-between',
    marginBottom:10
  },
  innerItemHorizontal_title:{
    fontSize:14,
    fontWeight:"400",
    color:'gray'
  },
  innerItemHorizontal_content:{
    fontSize:14,
    fontWeight:"500",
    color:'black'
  },

})