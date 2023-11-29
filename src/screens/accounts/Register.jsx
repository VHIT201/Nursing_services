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
  Image
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Foundation from "react-native-vector-icons/Foundation";
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import themes from '../../../themes';
import * as userService from '../../services/userService'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Register = ({navigation}) => {
    //useState
    const [isNameFocused, setisNameFocused] = useState(false);
    const [inputNameValue, setInputNameValue] = useState('');
    const [isEmailFocused, setisEmailFocused] = useState(false);
    const [inputEmailValue, setInputEmailValue] = useState('');
    const [isPhoneFocused, setisPhoneFocused] = useState(false);
    const [inputPhoneValue, setInputPhoneValue] = useState('');
    const [isPasswordFocused, setisPasswordFocused] = useState(false);
    const [inputPasswordValue, setInputPasswordValue] = useState('');
    const [isConfirmPasswordFocused, setisConfirmPasswordFocused] = useState(false);
    const [inputConfirmPasswordValue, setInputConfirmPasswordValue] = useState('');
    
    const [registerData, setRegisterData] = useState({fullname:'',email:'',phoneNumber:'',password:'',confirmPassword:''})
    const [data,setData] = useState([])
    //function
    //Name
    const handleFocusName = () => {
        setisNameFocused(true);
      };
    
      const handleBlurName = () => {
        setisNameFocused(false);
      };
    
      
      //Email
    const handleFocusEmail = () => {
        setisEmailFocused(true);
      };
    
      const handleBlurEmail = () => {
        setisEmailFocused(false);
      };
    
      
      //Phone
    const handleFocusPhone = () => {
        setisPhoneFocused(true);
      };
    
      const handleBlurPhone = () => {
        setisPhoneFocused(false);
      };
    
      
      //Password
    const handleFocusPassword = () => {
        setisPasswordFocused(true);
      };
    
      const handleBlurPassword = () => {
        setisPasswordFocused(false);
      };
    
      
      //ConfirmPassword
    const handleFocusConfirmPassword = () => {
        setisConfirmPasswordFocused(true);
      };
    
      const handleBlurConfirmPassword = () => {
        setisConfirmPasswordFocused(false);
      };
    
      
      
      const handleChangeName = (text) => {
        setInputNameValue(text);
        setisNameFocused(!!text);
        setRegisterData(prevRegiterData => ({ ...prevRegiterData, fullname: text }));
        
      };
      
      const handleChangeEmail = (text) => {
        setInputEmailValue(text);
        setisEmailFocused(!!text);
        setRegisterData(prevRegiterData => ({ ...prevRegiterData, email: text }));
        
      };
      const handleChangePhone = (text) => {
        setInputPhoneValue(text);
        setisPhoneFocused(!!text);
        setRegisterData(prevRegiterData => ({ ...prevRegiterData, phoneNumber: text }));
        
      };
      const handleChangePassword = (text) => {
        setInputPasswordValue(text);
        setisPasswordFocused(!!text);
        setRegisterData(prevRegiterData => ({ ...prevRegiterData, password: text }));
      };
      const handleChangeConfirmPassword = (text) => {
        setInputConfirmPasswordValue(text);
        setisConfirmPasswordFocused(!!text);
        setRegisterData(prevRegiterData => ({ ...prevRegiterData, confirmPassword: text }));
        
      };

      
      const handleRegister = async () => {
        console.log(registerData)
        const response = await userService.registerUser(registerData)
        setData(response)
        
      }
      
  return (
    <KeyboardAwareScrollView enableOnAndroid={true} enableAutomaticScroll={true} style={{flex:1,width:windowWidth}}>
    <View style={styles.container}>
        <Text style={{fontSize:24,fontWeight:"600"}}>Create account</Text>
        <Text style={{fontSize:14,fontWeight:"400",marginBottom:30}}>Create new account</Text>
        
        <View style={[styles.textInput, isNameFocused && styles.focusedTextInput]}>
          <View style={{ height: '100%', width: '10%', justifyContent: "center", alignItems: 'center', }}>
            <FontAwesome name='user' size={20} color={isNameFocused|| inputNameValue!=''?  themes.green : themes.gray } />
          </View>
          <TextInput
            placeholder='Tên'
            onFocus={handleFocusName}
            onBlur={handleBlurName}
            onChangeText={handleChangeName}
            style={{ height: '100%', width: '90%', paddingLeft: 4, paddingRight: 20, borderTopRightRadius: 10, borderBottomRightRadius: 10, color: isNameFocused ? 'black' : 'black' }}
          />
        </View>
        <View style={{height:20}}></View>

        <View style={[styles.textInput, isEmailFocused && styles.focusedTextInput]}>
          <View style={{ height: '100%', width: '10%', justifyContent: "center", alignItems: 'center', }}>
            <FontAwesome name='envelope-o' size={20} color={isEmailFocused|| inputEmailValue!=''?  themes.green : themes.gray } />
          </View>
          <TextInput
            placeholder='Email'
            onFocus={handleFocusEmail}
            onBlur={handleBlurEmail}
            onChangeText={handleChangeEmail}
            style={{ height: '100%', width: '90%', paddingLeft: 4, paddingRight: 20, borderTopRightRadius: 10, borderBottomRightRadius: 10, color: isEmailFocused ? 'black' : 'black' }}
          />
        </View>
        <View style={{height:20}}></View>
        <View style={[styles.textInput, isPhoneFocused && styles.focusedTextInput]}>
          <View style={{ height: '100%', width: '10%', justifyContent: "center", alignItems: 'center', }}>
            <FontAwesome name='phone' size={20} color={isPhoneFocused|| inputPhoneValue!=''?  themes.green : themes.gray } />
          </View>
          <TextInput
            placeholder='Số điện thoại'
            onFocus={handleFocusPhone}
            onBlur={handleBlurPhone}
            onChangeText={handleChangePhone}
            style={{ height: '100%', width: '90%', paddingLeft: 4, paddingRight: 20, borderTopRightRadius: 10, borderBottomRightRadius: 10, color: isPhoneFocused ? 'black' : 'black' }}
          />
        </View>
        <View style={{height:20}}></View>

        <View style={[styles.textInput, isPasswordFocused && styles.focusedTextInput]}>
                <View style={{ height: '100%', width: '10%', justifyContent: "center", alignItems: 'center', }}>
                    <FontAwesome name='lock' size={20} color={isPasswordFocused|| inputPasswordValue!=''?  themes.green : themes.gray } />
                </View>
                <TextInput
                    placeholder='Mật khẩu'
                    onFocus={handleFocusPassword}
                    onBlur={handleBlurPassword}
                    onChangeText={handleChangePassword}
                    style={{ height: '100%', width: '90%', paddingLeft: 4, paddingRight: 20, borderTopRightRadius: 10, borderBottomRightRadius: 10, color: isPasswordFocused ? 'black' : 'black' }}
                />
                </View>
                <View style={{height:20}}></View>

        <View style={[styles.textInput, isConfirmPasswordFocused && styles.focusedTextInput]}>
                <View style={{ height: '100%', width: '10%', justifyContent: "center", alignItems: 'center', }}>
                    <FontAwesome name='lock' size={20} color={isConfirmPasswordFocused|| inputConfirmPasswordValue!=''?  themes.green : themes.gray } />
                </View>
                <TextInput
                    placeholder='Nhập lại mật khẩu'
                    onFocus={handleFocusConfirmPassword}
                    onBlur={handleBlurConfirmPassword}
                    onChangeText={handleChangeConfirmPassword}
                    style={{ height: '100%', width: '90%', paddingLeft: 4, paddingRight: 20, borderTopRightRadius: 10, borderBottomRightRadius: 10, color: isConfirmPasswordFocused ? 'black' : 'black' }}
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
    
})