import React, { useState, useEffect } from "react";
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
  
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Foundation from "react-native-vector-icons/Foundation";
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import themes from '../../../themes';
import { useDispatch,useSelector } from 'react-redux';
import { registerUser } from "../../redux/slices/userSlice";
import Input from "../../components/textInput/TextInput";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Register = ({navigation}) => {

  //SECTION - Redux
  const dataRedux = useSelector((state)=> state.user)
  // console.log(dataRedux.error)
  const message = dataRedux.error


useEffect(() => {
  if(message.length > 0){
    for(let i = 0; i < message.length; i++){
       if(message[i].message == 'Password Password must be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, one digit.'){
        setErrorPassword(false)
       }
       if(message[i].message == 'ConfirmPassword Confirm password does not match password!'){
        setErrorConfirmPassword(false)
       }
       if(message[i].message == 'Email Invalid value'){
        setErrorEmail(false)
       }
       if(message[i].message == 'PhoneNumber Phone number is already exist!'){
        setErrorPhonenumber(false)
       }
       if(message[i].message == 'Register successful!'){
        navigation.navigate('Login')
       }
    }
  }
}, [message]);


// error
const [errorEmail, setErrorEmail] = useState(true)
const [errorPhonenumber, setErrorPhonenumber] = useState(true)
const [errorPassword, setErrorPassword] = useState(true)
const [errorConfirmPassword, setErrorConfirmPassword] = useState(true)

//dispatch
  const dispatch = useDispatch()

    //useState
    
    const [registerData, setRegisterData] = useState({fullname:'',email:'',phoneNumber:'',password:'',confirmPassword:''})
    const [data,setData] = useState([])
    //function
    //Name


      const handleRegister = async () => {
        console.log("Bắt đầu đăng ký ", registerData)
        dispatch(registerUser(registerData))  
      }

  return (
    <KeyboardAwareScrollView enableOnAndroid={true} enableAutomaticScroll={true} style={{flex:1,width:windowWidth}}>
    <View style={styles.container}>
        <Image style={{height:80,width:80,marginBottom:10}} resizeMode="contain" source={require('../../assets/Icon/logo.png')}/>
        <Text style={{fontSize:24,fontWeight:"600",marginBottom:30,color:themes.green}}>Tạo tài khoản</Text>
        <View style={styles.coverTextInput}>
          <Input 
            placeholder='Tên' 
            leftIconName={'user'}
            onChangeText={(text) => setRegisterData(prevRegiterData => ({ ...prevRegiterData, fullname: text }))} 
            isTrue={true}
            />
        </View>
        <View style={{height:20}}></View>

        <View style={styles.coverTextInput}>
          <Input 
            placeholder='Email' 
            leftIconName={'mail'}
            onChangeText={(text) => setRegisterData(prevRegiterData => ({ ...prevRegiterData, email: text }))} 
            isTrue={errorEmail}
            />
        </View>
        <View style={{height:20}}></View>

        <View style={styles.coverTextInput}>
          <Input 
            placeholder='Số điện thoại' 
            leftIconName={'phone'}
            onChangeText={(text) => setRegisterData(prevRegiterData => ({ ...prevRegiterData, phoneNumber: text }))} 
            isTrue={errorPhonenumber}
            />
        </View>
        <View style={{height:20}}></View>

          <View style={styles.coverTextInput}>
            <Input 
              placeholder='Mật khẩu' 
              leftIconName={'lock'}
              onChangeText={(text) => setRegisterData(prevRegiterData => ({ ...prevRegiterData, password: text }))} 
              isTrue={errorPassword}
              />
        </View>
                <View style={{height:20}}></View>

        <View style={styles.coverTextInput}>
            <Input 
              placeholder='Xác nhận mật khẩu' 
              leftIconName={'lock'}
              onChangeText={(text) => setRegisterData(prevRegiterData => ({ ...prevRegiterData, confirmPassword: text }))} 
              isTrue={errorConfirmPassword}
              />
        </View>
        <TouchableOpacity onPress={handleRegister} style={{width:'100%',height:50,borderRadius:10,backgroundColor:themes.green,marginTop:30,justifyContent:'center',alignItems:"center"}}>
            <Text style={{fontSize:15,fontWeight:"500",color:'white'}}>TẠO TÀI KHOẢN</Text>
        </TouchableOpacity>

        <View style={styles.bottomText}>
            <Text>Đã có tài khoản? </Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                <Text style={{color:themes.green}}>Đăng nhập</Text>
            </TouchableOpacity>
        </View>
        <View style={{height:'5%'}}></View>
    </View>
    </KeyboardAwareScrollView>
  )
}

export default Register

const styles = StyleSheet.create({
    container:{
        height:windowHeight,
        width:windowWidth,
        justifyContent:"center",
        alignItems: 'center',
        paddingLeft:'4%',
        paddingRight:'4%',
        paddingBottom:'8%',
    },
    textInput: {
        width: "100%",
        height: '6%',
        flexDirection: "row",
        borderRadius: 10,
        backgroundColor: '#F9FAFB',
        borderWidth:0.5,
        borderColor:'#F9FAFB',
        
      },
      focusedTextInput: {
        
        borderWidth:0.5,
        shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowColor:themes.green,
          shadowRadius: 10,
          elevation: 5,
      },
      bottomText:{
        flexDirection:"row",
        height:20,
        width:"100%",
        justifyContent:"center",
        alignItems: "center",
        marginTop:40
      },
      coverTextInput:{
        height:'6%',
        width:"100%",
        backgroundColor:"blue",
        borderRadius:10,
        justifyContent: 'center',
        alignItems: 'center',
      }
    
})