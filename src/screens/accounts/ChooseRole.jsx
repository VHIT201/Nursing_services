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
  Image,
  StatusBar
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Foundation from "react-native-vector-icons/Foundation";
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";


import Header from '../../components/header/Header'
import themes from "../../../themes";
import SelectionBar from "../../components/selectionbar/SelectionBar";
import dataRole from "../../seeders/dataRole";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ChooseRole = ({navigation}) => {
  return (
    <View style={styles.container}>
    <StatusBar/>
      <Header namePage={'Chọn vai trò'}/>
      <View style={{flex:1,width:"100%",paddingTop:"4%",paddingLeft:'4%',paddingRight:'4%'}}>
        <View style={{width:"100%",justifyContent:"center",alignItems:'center'}}>
          <Text style={{fontSize:18,fontWeight:"600",color:themes.green}}>Đăng ký vai trò sử dụng</Text>
        </View>

        <FlatList
          data={dataRole}
          renderItem={({ item }) => (
            <SelectionBar name={item.name} code={item.code} navigation={navigation}/>
          )}
          keyExtractor={(item) => item.name} 
        />
        
      </View>
    </View>
  )
}

export default ChooseRole

const styles = StyleSheet.create({
  container:{
    height:windowHeight,
    width:windowWidth,
    backgroundColor:themes.white1
  },
})