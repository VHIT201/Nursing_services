import { StyleSheet, Text, View } from 'react-native'
import React, { useState,useEffect,useContext } from "react";
import Input from '../components/textInput/TextInput'

const Test = () => {
  const [inputValue, setInputValue] = useState('');
  const handleChange = (text) => {
    setInputValue(text);
  }

  return (
    <View style={styles.container}>
      <Input height={60} width={'100%'} placeholder={'Email'} onChangeText={handleChange} leftIconName={'mail'} isTrue={false}/>
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
        alignItems:"center"
    }
})