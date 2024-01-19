import React from 'react';
import { 
  TouchableOpacity, 
  Image,
  Text,
  View,
  StyleSheet
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

const ItemNurse = ({item, handlePress, fullname, urlAva, stars}) => {
    const rating = stars;
    const maxStars = 5;
    const yellowStars = rating > 0 ? rating : 0;
  
    return (
      <View style={{height:110,width:'100%',justifyContent:"center",alignItems:"center"}}>
      <TouchableOpacity onPress={handlePress} 
        style={{
          height: '90%',
          borderWidth: 1,
          borderColor: themes.gray,
          flexDirection: "row",
          width: "90%",
          alignItems: "center", 

          marginTop: 10,
          borderRadius: 10,
          overflow: 'hidden', 
        }}
      >
        <View style={{ height: "100%", width: '26%', justifyContent: "center", alignItems: "center" }}>
          <Image style={{ height: 70, width: 70, borderRadius:60 }} resizeMode='contain' source={{uri:urlAva}} />
        </View>
  
        <View style={{ height: "80%", width: '42%', justifyContent: "center", alignItems: "flex-start",paddingLeft:'1%' }}>
          <Text style={{ fontSize: 15, fontWeight: '600' , color: themes.green}}>{fullname}</Text>

          <Text style={{ fontSize: 14, fontWeight: '500' , color:'orange'}}>Điều dưỡng</Text>
          <Text style={{ fontSize: 14, fontWeight: '500' , color :"gray"}}>7am - 18pm</Text>
        </View>
  
        <View style={{ height: "70%", width: '32%', justifyContent: "space-evenly", alignItems: "center"}}>
            <View style={{justifyContent:"center",alignItems:'center'}}>
                <Text style={{fontSize:13,fontWeight:'500',color:"gray"}}>Đánh giá</Text>
                
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {[...Array(maxStars)].map((_, index) => (
                    <FontAwesome
                      key={index}
                      name="star"
                      size={14}
                      color={index < yellowStars ? 'gold' : 'gray'}
                      style={{ marginHorizontal: 2 }}
                    />
                  ))}
                </View>
            
            <TouchableOpacity style={{height:26, width:'80%',backgroundColor:themes.green,borderRadius:20,justifyContent:"center",alignItems:'center'}}>
                <Text style={{fontSize:11,fontWeight:"500",color:'white'}}>Xem đánh giá</Text>
            </TouchableOpacity>
        </View>
      </TouchableOpacity>
      </View>
    );
  };

export default ItemNurse

const styles = StyleSheet.create({

})