import React from 'react';
import { 
  TouchableOpacity, 
  Image,
  Text,
  View
} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Foundation from "react-native-vector-icons/Foundation";
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import themes from '../../../themes';

const RelativeItem = ({item, handlePress}) => {
    // console.log(item)

      // Lấy thời gian hiện tại
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  // Tính tuổi dựa trên số nhập vào
  const calculateAge = (number) => {
    const dateObj = new Date(number);
    const year = dateObj.getFullYear()
    const age = currentYear - year
    return age
  };



  return (
    <TouchableOpacity 
      onPress={handlePress}
      style={{
        flexDirection: "row",
        height: 70,
        width: "100%",
        alignItems: "center",
        borderBottomWidth: 0.5,
        borderBottomColor: themes.green  
      }}
    >
      <Image 
        style={{
          height: "80%", 
          width: '20%'
        }} 
        resizeMode="contain" 
        source={item.avatar ? {uri: item.avatar} : require('../../assets/Icon/user.png')}
      />

    <View style={{height:'100%',width:"60%",justifyContent:"space-between",alignItems:"flex-start", paddingTop:'3%',paddingBottom:'3%'}}>
    <Text style={{fontSize: 16,fontWeight: '500', color:themes.green }}>{item.fullname} </Text>
    <Text style={{fontSize: 14,fontWeight: '500', color:'gray' }}>{  calculateAge(item.dateOfBirth) } tuổi </Text>
    </View>
    <View style={{height:'100%',width:"20%",justifyContent:"center",alignItems:'center'}}>
        <FontAwesome5 name={'angle-right'} size={20} color={themes.green}/>
    </View>

    </TouchableOpacity>
  )
}

export default RelativeItem;