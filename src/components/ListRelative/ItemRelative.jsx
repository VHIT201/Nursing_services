import React from 'react';
import { 
  TouchableOpacity, 
  Image,
  Text
} from 'react-native';
import themes from '../../../themes';

const RelativeItem = ({item, handlePress, setModalRelativesData}) => {
    console.log(item)
  return (
    <TouchableOpacity 
      onPress={() => {
        handlePress(item._id);
        setModalRelativesData(true);
      }}
      style={{
        flexDirection: "row",
        height: 60,
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

      <Text 
        style={{
          fontSize: 16,
          fontWeight: '500' 
        }}
      >
        {item.fullname}  
      </Text>
    </TouchableOpacity>
  )
}

export default RelativeItem;