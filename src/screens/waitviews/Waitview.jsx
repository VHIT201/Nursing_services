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
import { loginUser,getRelativeUser } from '../../redux/slices/userSlice';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';

const Waitview = ({navigation}) => {
    

    const [count, setCount] = useState(6);
    



  //redux
  const dispatch = useDispatch()



  useEffect(() => {
    const getData = async () => {
      try {
        const stateLogin = await AsyncStorage.getItem('stateLogin')
        console.log('state Login nè : ', stateLogin)

        
        if (stateLogin == null) {
          navigation.navigate('Login')
        }
        if(stateLogin !== null ){
          navigation.navigate('ChooseRole')
          const value = await AsyncStorage.getItem('userToken');
          console.log('Value token : ', value)
        }
      } catch (error) {
        console.log('Lỗi khi đọc dữ liệu:', error);
        // navigation.navigate('Login')
      }
    };


    getData();
  }, []);






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