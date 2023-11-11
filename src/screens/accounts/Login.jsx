import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  Dimensions,
  Image
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Foundation from "react-native-vector-icons/Foundation";
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import themes from '../../../themes';
import Register from './Register';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Login = ({navigation}) => {
  const [isUserNameFocused, setisUserNameFocused] = useState(false);
  const [isPassWordFocused, setisPassWordFocused] = useState(false);
  const [inputUserNameValue, setInputUserNameValue] = useState('');
  const [inputPasswordValue, setInputPasswordValue] = useState('');


  const handleFocusUser = () => {
    setisUserNameFocused(true);
  };

  const handleBlurUser = () => {
    setisUserNameFocused(false);
  };

  const handleChangeUserName = (text) => {
    setInputUserNameValue(text);
    setisUserNameFocused(true);
  };

  const handleFocusPassword = () => {
    setisPassWordFocused(true);
  };

  const handleBlurPassword = () => {
    setisPassWordFocused(false);
  };

  const handleChangePassword = (text) => {
    setInputPasswordValue(text);
    setisPassWordFocused(true);
  };


  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image source={require('../../assets/Icon/logo.png')} style={{ height: '100%', width: '100%' }} resizeMode='contain' />
      </View>
      <View style={styles.bottom}>
        <View style={[styles.textInput, isUserNameFocused && styles.focusedTextInput]}>
          <View style={{ height: '100%', width: '10%', justifyContent: "center", alignItems: 'center', }}>
            <Feather name='mail' size={20} color={isUserNameFocused|| inputUserNameValue!=''?  themes.green : themes.gray } />
          </View>
          <TextInput
            placeholder='Email/ Số điện thoại'
            onFocus={handleFocusUser}
            onBlur={handleBlurUser}
            onChangeText={handleChangeUserName}
            style={{ height: '100%', width: '90%', paddingLeft: 4, paddingRight: 20, borderTopRightRadius: 10, borderBottomRightRadius: 10, color: isUserNameFocused ? 'black' : 'black' }}
          />
        </View>
        <View style={{height:20}}></View>

        <View style={[styles.textInput, isPassWordFocused && styles.focusedTextInput]}>
          <View style={{ height: '100%', width: '10%', justifyContent: "center", alignItems: 'center', }}>
            <FontAwesome name='lock' size={20} color={isPassWordFocused|| inputPasswordValue!=''?  themes.green : themes.gray } />
          </View>
          <TextInput
            placeholder='Mật khẩu'
            onFocus={handleFocusPassword}
            onBlur={handleBlurPassword}
            onChangeText={handleChangePassword}
            style={{ height: '100%', width: '90%', paddingLeft: 4, paddingRight: 20, borderTopRightRadius: 10, borderBottomRightRadius: 10, color: isPassWordFocused ? 'black' : 'black' }}
          />
        </View>

        <View style={{width:'100%',height:30,marginTop:4}}>
            <TouchableOpacity style={{height:'100%',justifyContent:'center',alignItems:'flex-end'}}>
                <Text style={{fontSize:14,color:themes.green}}>Quên mật khẩu ?</Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate('ChooseRole')} style={{width:'100%',height:50,borderRadius:10,backgroundColor:themes.green,marginTop:30,justifyContent:'center',alignItems:"center"}}>
            <Text style={{fontSize:15,fontWeight:"500",color:'white'}}>ĐĂNG NHẬP</Text>
        </TouchableOpacity>
        <View style={styles.bottomText}>
            <Text>Chưa có tài khoản? </Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Register')}>
                <Text style={{color:themes.green}}>Đăng ký</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    width: windowWidth,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F3F4F6"
  },
  top:{
    height: '32%', 
    width: '40%', 
    overflow: 'hidden',
    
  },
  bottom: {
    height: '68%',
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    
  },
  textInput: {
    width: "100%",
    height: '10%',
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
});

export default Login;
