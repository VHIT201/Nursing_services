import React, { useState,useEffect,useContext } from "react";
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
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Foundation from "react-native-vector-icons/Foundation";
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import themes from '../../../themes';
import Register from './Register';
import { useDispatch,useSelector } from 'react-redux';
import { createAsyncThunk } from "@reduxjs/toolkit";
import Loading from "../../components/Progress/Loading";
import { loginUser, updateUser, forgotPassword,getInfoUser } from "../../redux/slices/userSlice";
import { StatusBar } from "expo-status-bar";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';



const Login = ({navigation}) => {
  
  // biến tạm
  const error1 = 'Password must be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, one digit.'
  const error2 = 'Password does not match!'
  const error3 = 'Invalid value'
  const error4 = 'Phone number not found!'
  const error5 = 'Email not found!'
  // kiểm thử
  const now = new Date();
  const time = now.toLocaleTimeString();

  //redux
  const dispatch = useDispatch()

  //lấy data redux
  const userDataRedux = useSelector((state) => state.user)
  const isLoggedIn = useSelector((state) => state.user.success);
  const error = useSelector((state) => state.user.error)

  // console.log('error : ',error[0].message)

  // console.log('user data redux : ',userDataRedux.user)
  // trang loading
  const [notification,setNotification] = useState(false)

// kiểm tra sự kiện focus
  const [isUserNameFocused, setisUserNameFocused] = useState(false);
  const [isPassWordFocused, setisPassWordFocused] = useState(false);

  // kiểm tra nội dung
  const [inputUserNameValue, setInputUserNameValue] = useState('');
  const [inputPasswordValue, setInputPasswordValue] = useState('');
    //sai mật khẩu
  const [wrongPassword,setWrongPassword] = useState(false)
  const [showWrongPassword,setShowWrongPassword] = useState(false)
  const [showWrongPassword1,setShowWrongPassword1] = useState(false)
  const [showWrongPassword2,setShowWrongPassword2] = useState(false)
  const [showWrongUsername,setShowWrongUsername] = useState(false)
  const [showWrongUsername1,setShowWrongUsername1] = useState(false)
  

  //Quên mật khẩu
  const [verifyEmail, setVerifyEmail] = useState({email:''})

  const handleVerifyEmail = (text)=>{
    setVerifyEmail(prevVerifyEmail => ({ ...prevVerifyEmail, email: text }));
  }


  // forgotPassword
    const [modalForgotPassword,setModalForgotPassword] = useState(false)
  // dữ liệu 
  const [user,setUser] = useState({email:'',phoneNumber:'',password:''})

  const handleFocusUser = () => {
    setisUserNameFocused(true);
  };

  const handleBlurUser = () => {
    setisUserNameFocused(false);
  };
  const handleBlurPassword = () => {
    setisPassWordFocused(false);
  };

  const handleChangeUserName = (text) => {
    setInputUserNameValue(text);
    setisUserNameFocused(true);
    if(text.includes('@'))
    {
      setUser(prevUser => ({ ...prevUser, email: text }));
      setUser(prevUser => ({ ...prevUser, phoneNumber: '' }));
    }
    else{
      setUser(prevUser => ({ ...prevUser, phoneNumber: text }));
      setUser(prevUser => ({ ...prevUser, email: '' }));
    }
    
  };

  const handleChangePassword = (text) => {
    setInputPasswordValue(text);
    setisPassWordFocused(true);
    setUser(prevUser => ({ ...prevUser, password: text }));
  };


  const handleFocusPassword = () => {
    setisPassWordFocused(true);
  };


  //SECTION - Xử lý login
  const handleLogin = async () => {
    
    console.log(time)
    //đẩy thông tin login vào redux
    if(user.phoneNumber){
      const dataLogin = {phoneNumber:user.phoneNumber, password:user.password}
      // console.log(dataLogin)
      dispatch(loginUser(dataLogin))


    }
    if(user.email.includes('@')){
      const dataLogin = {email:user.email, password:user.password}
      console.log(dataLogin)
      dispatch(loginUser(dataLogin))
    }
    
    
 
    const handleLoginSuccess = () => {
      navigation.navigate('ChooseRole');
    }
    


    if(error[0]?.message === error1){
      console.log(error[0].message)
      setWrongPassword(true)
    }
    if(error[0]?.message === error2){
      console.log(error[0].message)
      setWrongPassword(true)
    }
    
  }
  
  const storePassword = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('userPassword', jsonValue);
    } catch (e) {
      // saving error
    }
  };
  
    useEffect(() => {
      if(userDataRedux.success === true){
        // console.log('token nè : ',userDataRedux.user.accessToken)
        dispatch(getInfoUser({token : userDataRedux.user.accessToken}))
        handleLoginSuccess() 
        storePassword(user.password)
        storeData(userDataRedux)
    }
    }, [userDataRedux.success])
  
    
  
  const handleLoginSuccess = () => {
    navigation.navigate('ChooseRole');
  }

  useEffect(() => {
    if(error[0]?.message === error1) {
      setShowWrongPassword(true);
  
      const timer = setTimeout(() => {
        setShowWrongPassword(false);
      }, 5000);
  
      return () => clearTimeout(timer);
    }
    if(error[0]?.message === error2) {
      setShowWrongPassword1(true);
  
      const timer = setTimeout(() => {
        setShowWrongPassword1(false);
      }, 5000);
  
      return () => clearTimeout(timer);
    }
    if(error[0]?.message === error3) {
      setShowWrongPassword2(true);
  
      const timer = setTimeout(() => {
        setShowWrongPassword2(false);
      }, 5000);
  
      return () => clearTimeout(timer);
    }
    if(error[0]?.message === error4) {
      setShowWrongUsername(true);
  
      const timer = setTimeout(() => {
        setShowWrongUsername(false);
      }, 5000);
  
      return () => clearTimeout(timer);
    }
    if(error[0]?.message === error5) {
      setShowWrongUsername1(true);
  
      const timer = setTimeout(() => {
        setShowWrongUsername1(false);
      }, 5000);
  
      return () => clearTimeout(timer);
    }


  }, [error]);

  //Xử lý quên mật khẩu
  const hanldeVerifyEmail = async () =>{
    // console.log(email)
    dispatch(forgotPassword(verifyEmail))
    navigation.navigate('ReceiveCode', {verifyEmail});
  }

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(userDataRedux);
      await AsyncStorage.setItem('userStoreData', jsonValue);
    } catch (e) {
      // saving error
    }
  };




  

  return (
    <View style={styles.container}>
    <StatusBar hidden/>
      <View style={styles.top}>
        <Image source={require('../../assets/Icon/logo.png')} style={{ height: '60%', width: '60%' }} resizeMode='contain' />
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

        <View style={[styles.textInput, wrongPassword===true ? styles.error : isPassWordFocused && styles.focusedTextInput]}>
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
            <TouchableOpacity onPress={()=>setModalForgotPassword(true)} style={{height:'100%',justifyContent:'center',alignItems:'flex-end'}}>
                <Text style={{fontSize:14,color:themes.green}}>Quên mật khẩu ?</Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleLogin} style={{width:'100%',height:50,borderRadius:10,backgroundColor:themes.green,marginTop:30,justifyContent:'center',alignItems:"center"}}>
            <Text style={{fontSize:15,fontWeight:"500",color:'white'}}>ĐĂNG NHẬP</Text>
        </TouchableOpacity>
        <View style={styles.bottomText}>
            <Text>Chưa có tài khoản? </Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Register')}>
                <Text style={{color:themes.green}}>Đăng ký</Text>
            </TouchableOpacity>
        </View>
      </View>
      {
        userDataRedux.loading && 
        (<View style={styles.modal}>
          <Loading/>
         </View>)
      }
      {
        userDataRedux.success &&(
        <View style={styles.modal}>
          <View style={{height:40,width:200,justifyContent:"center",alignItems:"center",marginTop:'30%'}}>
              <Text style={{fontWeight:"600",color:themes.green}}>Đăng nhập thành công</Text>
          </View>
         </View>
         )
      }
      {
        showWrongPassword &&(
        <View style={styles.modal}>
          <View style={{height:100,width:400,justifyContent:"center",alignItems:"center",marginTop:'30%'}}>
              <Text style={{fontWeight:"600",color:'red',textAlign:"center"}}>Mật khẩu phải dài ít nhất 6 ký tự và chứa ít nhất một chữ thường, một chữ hoa, một chữ số.</Text>
          </View>
         </View>
         )
      }
      {
        showWrongPassword1 &&(
        <View style={styles.modal}>
          <View style={{height:100,width:400,justifyContent:"center",alignItems:"center",marginTop:'30%'}}>
              <Text style={{fontWeight:"600",color:'red',textAlign:"center"}}>Sai mật khẩu</Text>
          </View>
         </View>
         )
      }
      {
        showWrongPassword2 &&(
        <View style={styles.modal}>
          <View style={{height:100,width:400,justifyContent:"center",alignItems:"center",marginTop:'30%'}}>
              <Text style={{fontWeight:"600",color:'red',textAlign:"center"}}>Bạn cần nhập đầy đủ thông tin !</Text>
          </View>
         </View>
         )
      }
      {
        showWrongUsername &&(
        <View style={styles.modal}>
          <View style={{height:100,width:400,justifyContent:"center",alignItems:"center",marginTop:'30%'}}>
              <Text style={{fontWeight:"600",color:'red',textAlign:"center"}}>Không tìm thấy số điện thoại !</Text>
          </View>
         </View>
         )
      }
      {
        showWrongUsername1 &&(
        <View style={styles.modal}>
          <View style={{height:100,width:400,justifyContent:"center",alignItems:"center",marginTop:'30%'}}>
              <Text style={{fontWeight:"600",color:'red',textAlign:"center"}}>Không tìm thấy email !</Text>
          </View>
         </View>
         )
      }
      {
        modalForgotPassword && (
        <View style={styles.modalForgetPassword}>
          <StatusBar hidden/>
            <TouchableOpacity onPress={()=> setModalForgotPassword(false)} style={{height:"100%",width:"100%",backgroundColor:"rgba(156, 163, 175, 0.2)",justifyContent:"center",alignItems:"center",position:"absolute",zIndex:4}}>
              <View style={styles.forgetPassword}>
                <Text style={{fontSize:22,fontWeight:"600",color:themes.green,marginBottom:10,marginBottom:20}}>Quên mật khẩu</Text>
                <View style={{height:"16%",borderRadius:10,width:'100%',backgroundColor:"rgba(156, 163, 175, 0.2)",justifyContent:"center",alignItems:"center",paddingLeft:"5%",paddingRight:"5%"}}>
                  <TextInput onChangeText={handleVerifyEmail} style={{height:"100%",width:"100%"}} placeholder="Nhập email"/>
                </View>
                <TouchableOpacity onPress={hanldeVerifyEmail} style={{height:'14%',width:"100%",justifyContent:'center',alignItems:"center",backgroundColor:themes.green,borderRadius:10,marginTop:10}}>
                  <Text style={{fontSize:16,fontWeight:"600",color:"white"}}>Đặt lại mật khẩu</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
      </View>
        )
      }
      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:'20%',
    height: windowHeight,
    width: windowWidth,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    position:"relative"

  },
  top:{
    height: '32%', 
    width: '40%', 
    overflow: 'hidden',
    justifyContent:"center",
    alignItems:"center"
    
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
  error: {
    borderWidth:0.5,
    borderBottomColor:'red',
    shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 10,
      shadowColor: 'red',
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
  modal:{
    position:"absolute",
    height:windowHeight*1.2,
    width:"100%",
    alignItems: "center",
    
  },
  modalForgetPassword:{
    height:windowHeight,
    width:"100%",
    justifyContent:"center",
    alignItems:"center",
    position:"absolute",
    
  },
  forgetPassword:{
    height:'40%',
    width:"100%",
    backgroundColor:"white",
    justifyContent:"center",
    alignItems:"center",
    paddingLeft:"5%",
    paddingRight:"5%",
    gap:10
  }
});

export default Login;
