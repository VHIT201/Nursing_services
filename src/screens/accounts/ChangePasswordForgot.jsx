import { StyleSheet, Text, View,Dimensions,StatusBar,TextInput,TouchableOpacity } from 'react-native'
import React, { useState,useEffect } from 'react'
import Header from '../../components/header/Header';
import themes from '../../../themes';
import { useDispatch,useSelector, } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { resetPassword } from '../../redux/slices/userSlice';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ChangePasswordForgot = ({navigation,route}) => {
  const [message,setMessage] = useState('')
  const dispatch = useDispatch();
  const [password, setPassword] = useState('')
  const {verifyOtp} = route.params;
  console.log("data truyền qua : ",verifyOtp)

  const handleChangePassword = () => {
    const dataChangePassword = {
      email : verifyOtp.email,
      password : password,
      otp : verifyOtp.otp,

    }
    dispatch(resetPassword(dataChangePassword));
  }




  return (
    <View style={styles.container}>
      <StatusBar hide/>
      <Header namePage={'Nhập mật khẩu mới'} nameLeftIcon={'chevron-left'}/>
      <View style={{flex:1,width:"100%",justifyContent:"center",alignItems:"center"}}>
        <Text style={{fontSize:18,fontWeight:'600',color:themes.green,marginBottom:20}}>Vui lòng nhập mật khẩu mới</Text>
        <View style={{height:'6%',marginBottom:10,width:'90%',justifyContent:"center",alignItems:'center',borderWidth:1,borderColor:themes.gray,borderRadius:10,paddingLeft:'5%',paddingRight:'5%'}}>
            <TextInput onChangeText={(text) => setPassword(text)}  placeholder='Nhập mật khẩu' style={{height:'80%',width:'100%'}}/>
        </View>
        <TouchableOpacity onPress={handleChangePassword} style={{height:'5%',width:'90%',justifyContent:"center",alignItems:'center',backgroundColor:themes.green,borderRadius:10,paddingLeft:'5%',paddingRight:'5%'}}>
            <Text style={{color:'white',fontWeight:"600"}}>Cập nhật mật khẩu</Text>
        </TouchableOpacity>
        <View style={{height:'40%'}}></View>
      </View>
    </View>
  )
}

export default ChangePasswordForgot

const styles = StyleSheet.create({
    container:{
        height:windowHeight,
        width:windowWidth,
        
    }
})