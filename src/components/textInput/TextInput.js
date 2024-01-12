
import React, { useState,useEffect,useContext } from "react";
import { View, TextInput,StyleSheet, } from 'react-native';
import Feather from "react-native-vector-icons/Feather";
import themes from "../../../themes";
const Input = ({
  leftIconName,
  leftIconLibrary,
  placeholder, 
  onFocus,
  onBlur,
  onChangeText,
  style,
  color,
  height,
  width,
  isTrue,
  value,
  numberOfLines,
  readOnly
}) => {

    const [text, setText] = useState('');
    const [isFocused, setFocused] = useState(false);
    // Handle focus
const handleFocus = () => {
    setFocused(true);
  }
  
  // Handle blur  
  const handleBlur = () => {
    if(text===''){
      setFocused(false);
    }
    else{
      setFocused(true)
    }
  }
  
  // Handle text change
  const handleChangeText = (text) => {
    setText(text);
    onChangeText(text); 
  }

  useEffect(() => {
    if(text !== '') {
      setFocused(true);
    }
  }, [text]); 



  return (

      <View style={[styles.textInput, {height,width}, isFocused && styles.focusedTextInput, !isTrue && styles.error]}>
          <View style={{ height: '100%', width: '10%', justifyContent: "center", alignItems: 'center', }}>
            <Feather name={leftIconName} size={20} color={(isFocused || text !== '') ? themes.green : (isTrue === false ? themes.red : themes.gray)}/>
          </View>
          <TextInput
            multiline={true}
            numberOfLines={3}
            placeholder={placeholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={value}
            onChangeText={handleChangeText}
            scrollEnabled = {true}
            readOnly = {readOnly}
            style={{ height: '100%', width: '90%', paddingLeft: 4, paddingRight: 20, borderTopRightRadius: 10, borderBottomRightRadius: 10, color: isFocused ? 'black' : 'black' }}
          />
        </View>

  )
};

const styles = StyleSheet.create({
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
        shadowColor:themes.green,
        elevation: 5,
    },
    error: {
      borderWidth:0.5,
      // borderBottomColor:'red',
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
      height:'100%',
      width:"100%",
      alignItems: "center",
      
    },
    modalForgetPassword:{
      height:'100%',
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
  
  
export default Input;