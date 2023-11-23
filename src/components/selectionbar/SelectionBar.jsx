import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React,{useState} from 'react'
import themes from '../../../themes'
import SelectServices from '../../screens/accounts/Nurse/SelectServices'
const SelectionBar = ({name,code,navigation}) => {
  const [userCode,setUserCode] = useState('')

  const handleOnpress = ({code}) =>{
    if(code === 'DD'){
      navigation.navigate('SelectServices')
    }
    if(code === 'KH'){
      navigation.navigate('CustomerDrawerNavigation')
    }

  }
  return (
    <TouchableOpacity onPress={()=>handleOnpress({code})}  style={styles.container}>
      <View style={{width:'20%',height:'100%',borderTopLeftRadius:10,borderBottomLeftRadius:10,justifyContent:"center",alignItems:"center"}}>
        <Image style={{height:'60%',width:"60%",justifyContent:"center",alignItems:"center"}}  resizeMode='contain'
        source={require('../../assets/Icon/logo.png')}/>
      </View>
      <View style={{width:'80%',height:'100%',borderTopRightRadius:10,borderBottomRightRadius:10,justifyContent:'center'}}>
        <Text style={{fontSize:16,fontWeight:"500",color:themes.green}}>{name}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default SelectionBar

const styles = StyleSheet.create({
    container:{
        height:70,
        width:"100%",
        backgroundColor:"white",
        borderRadius:10,
        marginTop:20,
        flexDirection:"row"
    },
})