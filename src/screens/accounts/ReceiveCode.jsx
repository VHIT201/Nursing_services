import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions,TouchableOpacity } from 'react-native';
import React, { useState, useRef,useEffect } from 'react';
import themes from '../../../themes';
import Header from '../../components/header/Header';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { useDispatch,useSelector } from 'react-redux';
import { verifyCode } from '../../redux/slices/userSlice';
const ReceiveCode = ({navigation,route}) => {
  const dispatch = useDispatch()

 const messageSuccess = 'Verify otp success!'
  const message = useSelector(state => state.user.message)
  console.log('message : ',message)
  const [countdown, setCountdown] = useState(60);

  const [code, setCode] = useState(Array(6).fill(''));
  const textInputs = useRef([]);
  const verifyEmail = route.params.verifyEmail;

  const data = useSelector((state) => state.user.message)
  // console.log(verifyEmail)

   //data verify
    const [verifyOtp, setVerifyOtp] = useState({email:verifyEmail.email,otp:''})
    const [tempOtp,setTempOtp] = useState('')
    // console.log(verifyOtp)


  const handleLeftButton = () =>{
    navigation.navigate('Login')
  }

  // let interval, isLoading = false;

  // const countdownHandler = () => {
  
  //   interval = setInterval(() => {
  
  //     if(countdown > 0) {
  //       setCountdown(prev => prev - 1); 
  //     }
  
  //     if(countdown === 0) {
  //       isLoading = true;
  //       setCountdown(prev => prev - 1);
  //     }
  
  //   }, 1000);
  
  // }
  
  // useEffect(() => {
  
  //   if(isLoading) {
  //     clearInterval(interval);
  //     navigation.navigate('Login');
  //   }
  
  // }, [countdown, isLoading])

  const onChangeText = (text, inputIndex) => {
    if (text === '') {
      setCode(prevCode => {
        const newCode = [...prevCode];
        newCode[inputIndex] = '';
        return newCode;
      });

      if (inputIndex > 0) {
        textInputs.current[inputIndex - 1].focus();
      }
    } else {
      setCode(prevCode => {
        const newCode = [...prevCode];
        newCode[inputIndex] = text;
        return newCode;
      });

      if (inputIndex < 5) {
        textInputs.current[inputIndex + 1].focus();
      }
    }
  };
  

  const onSubmitEditing = () => {
    if (code.join('').length === 6) {
      const mergedCode = code.join('');
      console.log(mergedCode.length);
      if(mergedCode.length == 6){
        setVerifyOtp({
          email: verifyEmail.email,  
          otp: mergedCode
        });
        
        
      }
      
      
    }
    
  };

  useEffect(() => {
    console.log((verifyOtp));
    }
  , [verifyOtp])

  useEffect(() => {
    if(message === messageSuccess)
    {
      navigation.navigate('ChangePasswordForgot',{verifyOtp})
      
    }
    }
  , [message])





const handleSubmitOtp = async () =>{
  dispatch(verifyCode(verifyOtp))
}

  

  return (
    <View style={styles.container}>
      <StatusBar />
      <Header namePage={'Xác nhận mã xác minh'} nameLeftIcon={'chevron-left'} handleLeftButton={handleLeftButton}/>
      <View style={styles.body}>
        <Text style={styles.title}>Nhập mã xác minh</Text>
        <Text style={styles.subtitle}>Chúng tôi đã gửi 1 tin nhắn xác minh đến địa chỉ <Text style={styles.email}>{verifyEmail.email}
        </Text> của bạn, hãy kiểm tra và nhập lại 6 số chúng tôi đã gửi.
        </Text>
        <View style={styles.codeContainer}>
            {[...Array(6)].map((_, i) => (
            <View key={i} style={styles.codeInputContainer}>
                <TextInput
                style={styles.codeInput}
                value={code[i]}
                onChangeText={text => onChangeText(text, i)}
                ref={ref => textInputs.current[i] = ref}
                keyboardType="numeric"
                maxLength={1}
                returnKeyType={i === 5 ? "done" : "next"}
                onSubmitEditing={i === 5 ? onSubmitEditing : null}
                />
            </View>
            ))}
        </View>
        <View style={{flex:1,width:'100%',alignItems:"center",paddingTop:"2%"}}>
        <TouchableOpacity onPress={handleSubmitOtp} style={{height:50,width:100,backgroundColor:themes.green,borderRadius:10,justifyContent:'center',alignItems:"center"}}>
              <Text style={{fontSize:16,fontWeight:"600",color:'white'}}>Gửi</Text>
        </TouchableOpacity>
        <View style={{height:40}}></View>
          <View style={{height:170,width:170,borderRadius:85,alignItems:"center",justifyContent:"center"}}>
            <View style={{height:160,width:160,borderRadius:80,borderWidth:3,borderColor:themes.gray,alignItems:"center",justifyContent:"center"}}>
                <Text style={{fontWeight:'500',fontSize:30,color:themes.green}}>{countdown}</Text>
              </View>
          </View>
        </View>
        <View style={{height:'20%'}}></View>
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",

  },
  body:{
    flex:1,
    width:'100%',
    paddingLeft:"5%",
    paddingRight:"5%",
    justifyContent: 'flex-start',
    alignItems:"center",
    paddingTop:'10%'
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "400",
    textAlign: "center",
  },
  codeContainer: {
    width: '100%',
    height: "10%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  codeInputContainer: {
    height: '60%',
    width: '12%',
    borderWidth: 1,
    borderColor: themes.gray,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight:4
  },
  codeInput: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: 'center',
    fontSize:16
  },
  email:{
    fontSize:15,
    fontWeight:'500',
    color:themes.green
  }
});

export default ReceiveCode;