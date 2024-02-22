import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState,useEffect,useContext } from "react";
import Input from '../components/textInput/TextInput'
import themes from '../../themes';
import { useSelector,useDispatch } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { getListNurseByIDSubservice } from '../redux/slices/medicalCaseSlice';
import AsyncStorage from "@react-native-async-storage/async-storage";
const Test = () => {


  useEffect(() => {
    // console.log("bắt đầu tìm kiếm token")
    const getToken = async () => {
      const value = await AsyncStorage.getItem("userToken"); //Lấy token từ store
      if (value !== null) {
        const data = JSON.parse(value); 
        setUserToken(data)
      }
    };
    getToken()
  }, []);


  const dispatch = useDispatch()

  const [userToken, setUserToken] = useState('')
  const hanldePress = () => {
    let id = '657c4294f3b7efaf17b473d9'

    let values = {token : userToken, service : id}
    dispatch(getListNurseByIDSubservice(values))
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={hanldePress} style={styles.btn}>
        <Text>Test get list nurse by subService id</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Test

const styles = StyleSheet.create({
    container:{
        height:"100%",
        width:"100%",
        // backgroundColor:"gray",
        justifyContent:"center",
        alignItems:"center",
    },
    btn:{
      height:40,
      width:'80%',
      backgroundColor:themes.green,
      justifyContent:"center",
      alignItems:'center',
      borderRadius:10
    }
})