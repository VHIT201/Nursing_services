import { StyleSheet, Text, View,Dimensions,Image } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
  } from 'react-native-reanimated';
import 'react-native-gesture-handler';

import ChooseRole from '../accounts/ChooseRole';
import themes from '../../../themes'
import { useEffect, useState } from 'react';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Waitview = ({navigation}) => {

    const [count, setCount] = useState(6);
    
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (count === 0) {
        clearInterval(intervalId); 
        navigation.navigate('Login')
      } else {
        console.clear();
        console.log(`${count}`);
        setCount((prevCount) => prevCount - 1);
      }
    }, 1000);

    
    return () => clearInterval(intervalId);
  }, [count]);


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