import { StyleSheet, Text, View,Dimensions,Image } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
  } from 'react-native-reanimated';
import 'react-native-gesture-handler';
import { useDispatch,useSelector } from 'react-redux';
import ChooseRole from '../accounts/ChooseRole';
import themes from '../../../themes'
import { useEffect, useState } from 'react';
import { loginUser,getRelativeUser, getInfoUser } from '../../redux/slices/userSlice';
import { getListServices } from '../../redux/slices/servicesSlice';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';

const Waitview = ({navigation}) => {

  // console.log('data : ', data)
  const dataUser = useSelector((state) => state.user);
  // console.log('data User : ', dataUser.user.role)
  const [userDataRedux, setUserDataRedux] = useState(dataUser)
  

  //reudux
  const servicesDataRedux = useSelector((state) => state.services)
  // console.log(servicesDataRedux)



  //redux
  const dispatch = useDispatch()



  useEffect(() => {

    const getData = async () => {
      try {
        // const stateLogin = await AsyncStorage.getItem('stateLogin')
        const valueToken = await AsyncStorage.getItem('userToken');
        // const isUserLoggedIn = stateLogin ? JSON.parse(stateLogin) : false;
        // console.log('isUserLoggedIn : ', isUserLoggedIn);
        console.log('Value token : ', valueToken);

        if(valueToken !== null ) {
          console.log('Đã đăng nhập');
          const value = await AsyncStorage.getItem('userToken');
          const data = JSON.parse(value); 
          // console.log('start user data redux : ', userDataRedux)
          dispatch(getInfoUser(data)) 
          dispatch(getListServices())
          
        }
        else {
        // else (isUserLoggedIn != true) {
//          console.log('isUserLoggedIn !== true : ', isUserLoggedIn);
          navigation.navigate('Login')
        }
      } catch (error) {
        console.log('Lỗi khi đọc dữ liệu:', error);
        navigation.navigate('Login')
      }
    };


    getData();
    
  }, []);


useEffect(() => {
  if(dataUser.user.role == 'user'){
    navigation.navigate('CustomerDrawerNavigation')
    // navigation.navigate('NursingDrawerNavigation')
  }
  if(dataUser.user.role == 'nurse'){
    navigation.navigate('NursingDrawerNavigation')
  }
  // if(dataUser.user.role == ''){
  //   navigation.navigate('Login')
  // }
}, [dataUser]);






  return (
    <View style={styles.container}>
      <StatusBar hidden/>
     
    </View>
  )
}

export default Waitview

const styles = StyleSheet.create({
    container:{
        height:windowHeight,
        width:windowWidth,
        backgroundColor:themes.green,
        justifyContent:'center',
        alignItems:"center",
        padding:20
    },
})