import React, { useState,useEffect,useContext} from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Foundation from "react-native-vector-icons/Foundation";
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import themes from '../../../themes';
import { useDispatch,useSelector } from 'react-redux';
import { createAsyncThunk } from "@reduxjs/toolkit";
import Header from "../../components/header/Header";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const RegisterAsANurse = ({navigation}) => {


  const handleLeftButton = () => {
    navigation.goBack()
  }


  return (
    <View style={[styles.container]}>
        <Header namePage={'Đăng ký điều dưỡng'} handleLeftButton={handleLeftButton} nameLeftIcon={'chevron-left'}/>
        <KeyboardAwareScrollView enableOnAndroid={true} enableAutomaticScroll={true} style={{flex:1,width:"100%"}}>

        <View style={{height:30}}></View>
        <View style={{height:100,width:'100%',justifyContent:"center",alignItems:"center"}}>
          {/* <TouchableOpacity onPress={uploadImage} style={{height:100,width:100,borderRadius:50,borderWidth:2,borderColor:themes.gray,justifyContent:"center",alignItems:'center'}}> */}
          <TouchableOpacity  style={{height:100,width:100,borderRadius:50,borderWidth:2,borderColor:themes.gray,justifyContent:"center",alignItems:'center'}}>
          <Image style={{height: 100, width: 100,borderRadius:50}} resizeMode="contain" source={user.avatar ? {uri: user.avatar} : placeholder} />
          </TouchableOpacity>
        </View>
        <View style={{width:'100%', alignItems:"center",height:20,marginTop:20}}>
          <Text style={[styles.text,{fontSize:18,color:themes.green,lineHeight:20}]}></Text>
        </View>
        <View style={{width:'100%',paddingLeft:"5%",paddingRight:'5%',gap:4,marginTop:10}}>
          <Text style={styles.text}>Họ & tên</Text>
          <View style={{borderWidth:1,height:34,width:"100%",paddingLeft:'2%',paddingRight:"2%"}}>
            <TextInput  style={{height:'100%',width:"100%"}} placeholder="Họ và tên"></TextInput>
          </View>
        </View>
        <View style={{width:'100%',paddingLeft:"5%",paddingRight:'5%',gap:4,marginTop:10,flexDirection:"row",justifyContent:"space-between"}}>
        <View style={{width:"40%",gap:4}}>
        <Text style={styles.text}>Giới tính</Text>
          <TouchableOpacity style={{borderWidth:1,height:34,position:'relative',width:"100%",paddingLeft:'4%',paddingRight:"4%",flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
            <Text>Nữ</Text>
            <Ionicons name='person' size={16}/>
          </TouchableOpacity>
        </View>
        <View style={{width:"50%",gap:4}}>
        <Text style={styles.text}>Ngày sinh</Text>
          <View style={{borderWidth:1,height:34,width:"100%",paddingLeft:'4%',paddingRight:"4%",justifyContent:"space-between",alignItems:"center",flexDirection:"row",paddingRight:'10%'}}>
            <Text></Text>
            <TouchableOpacity >
            {/* <TouchableOpacity onPress={hanldeModalDatapicker}> */}
              <AntDesign name={'calendar'} size={20} color={themes.green}/>
            </TouchableOpacity>
          </View>
        </View>
        </View>
        
        <View style={{width:'100%',paddingLeft:"5%",paddingRight:'5%',gap:4,marginTop:10}}>
          <Text  style={styles.text}>Số điện thoại</Text>
          <View style={{borderWidth:1,height:34,width:"100%",paddingLeft:'2%',paddingRight:"2%"}}>
            <TextInput  style={{height:'100%',width:"100%"}} placeholder="Số điện thoại"></TextInput>
          </View>
        </View>
        <View style={{width:'100%',paddingLeft:"5%",paddingRight:'5%',gap:4,marginTop:10}}>
          <Text style={styles.text}>Email</Text>
          <View style={{borderWidth:1,height:34,width:"100%",paddingLeft:'2%',paddingRight:"2%"}}>
            <TextInput  style={{height:'100%',width:"100%"}} placeholder="Email"></TextInput>
          </View>
        </View>
        <View style={{width:'100%',paddingLeft:"5%",paddingRight:'5%',gap:4,marginTop:10}}>
          <Text style={styles.text}>Địa chỉ</Text>
          <View style={{borderWidth:1,height:34,width:"100%",paddingLeft:'2%',paddingRight:"2%"}}>
            <TextInput  style={{height:'100%',width:"100%"}} placeholder="Địa chỉ"></TextInput>
          </View>
        </View>
        <View style={{width:'100%',paddingLeft:"5%",paddingRight:'5%',gap:4,marginTop:10}}>
          <Text style={styles.text}>Tải lên hồ sơ cá nhân</Text>
          <View style={{height:60,width:"100%",paddingLeft:"1%",paddingRight:"5%"}}>
            {/* <TouchableOpacity onPress={pickPDFFile}> */}
            <TouchableOpacity >
              <Image style={{height:60,width:60,backgroundColor:themes.gray}} resizeMode="contain" source={require('../../assets/Icon/upload.png')}/>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={{height:200,width:"100%",alignItems:"center",justifyContent:"flex-start",paddingTop:"10%"}}>
          <TouchableOpacity  style={{height:"30%",width:'90%',backgroundColor:themes.green,justifyContent:"center",alignItems:"center",borderRadius:10}}>
          {/* <TouchableOpacity onPress={handleUpdateUser} style={{height:"30%",width:'90%',backgroundColor:themes.green,justifyContent:"center",alignItems:"center",borderRadius:10}}> */}
            <Text style={{fontSize:16,fontWeight:"500",color:'white'}}>Lưu thay đổi</Text>
          </TouchableOpacity>
        </View>




        {/* {openModalDatePicker && (
        <DateTimePicker
          value={datePicker}
          mode={'date'}
          display="calendar"
          onChange={onChangeDatePicker}
        />
      )} */}
        
        </KeyboardAwareScrollView>

      </View>
  )
}

export default RegisterAsANurse

const styles = StyleSheet.create({
  container:{
    height:windowHeight,
    width:'100%',
  },
  avatar:{
    height:'20%',
    width:"100%",
    justifyContent:"center",
    alignItems:"center"
  },
})