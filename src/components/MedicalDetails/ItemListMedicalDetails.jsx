import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Foundation from "react-native-vector-icons/Foundation";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import themes from '../../../themes';
const ItemListMedicalDetails = () => {
  return (
    <View style={{width:"100%",paddingTop:10,paddingBottom:10,marginBottom:10,backgroundColor:"white",borderRadius:10,paddingLeft:"5%",paddingRight:"5%"}}>
        {/* <View style={{width:"100%",flexDirection:"row"}}>
            <View style={{width:'10%'}}>
                <FontAwesome name={'money'} size={20} color={themes.green}/>
            </View>
            <View style={{width:'80%'}}>
                <Text style={{fontSize:15,fontWeight:'600',color:themes.green}}>Tổng thanh toán</Text>
                <Text style={{fontWeight:"500",color:'gray'}}>150.000 đ</Text>
            </View>
        </View> */}
        <View style={styles.bodyShowInfor}>

        </View>
  </View>
  )
}

export default ItemListMedicalDetails

const styles = StyleSheet.create({
    so
})