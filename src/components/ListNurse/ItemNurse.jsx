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

const ItemNurse = ({item, handlePress}) => {
    const rating = 3;
    const maxStars = 5;
    const yellowStars = rating > 0 ? rating : 0;
  
    return (
      <TouchableOpacity 
        style={{
          height: 120,
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
          <Image style={{ height: 80, width: 80, borderRadius:60 }} resizeMode='contain' source={{uri:'https://hapotravel.com/wp-content/uploads/2023/03/chon-loc-25-avatar-gai-xinh-dep-nhu-than-tien-ty-ty_7.jpg'}} />
        </View>
  
        <View style={{ height: "80%", width: '42%', justifyContent: "center", alignItems: "flex-start",paddingLeft:'1%' }}>
          <Text style={{ fontSize: 15, fontWeight: '600' , color: themes.green}}>Phạm Văn Hoàng</Text>
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
          <Text style={{ fontSize: 14, fontWeight: '500' , color:'orange'}}>Điều dưỡng</Text>
          <Text style={{ fontSize: 14, fontWeight: '500' , color :"gray"}}>7am - 18pm</Text>
        </View>
  
        <View style={{ height: "70%", width: '32%', justifyContent: "space-evenly", alignItems: "center"}}>
            <View style={{justifyContent:"center",alignItems:'center'}}>
                <Text style={{fontSize:13,fontWeight:'500',color:"gray"}}>Kinh nghiệm</Text>
                <Text style={{fontSize:13,fontWeight:'500',color:themes.green}}>5 năm</Text>
            </View>
            
            <TouchableOpacity style={{height:26, width:'80%',backgroundColor:themes.green,borderRadius:20,justifyContent:"center",alignItems:'center'}}>
                <Text style={{fontSize:11,fontWeight:"500",color:'white'}}>Xem đánh giá</Text>
            </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

export default ItemNurse

const styles = StyleSheet.create({

})