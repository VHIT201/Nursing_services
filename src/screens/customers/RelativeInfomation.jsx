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
  StatusBar,
  Button
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Foundation from "react-native-vector-icons/Foundation";
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../../components/header/Header";
import HomeSelectButton from "../../components/selectionbar/HomeSelectButton";
import themes from "../../../themes";
import InfoService from "../../components/selectionbar/InfoService";
import ServiceDescription from "../../components/Customer/ServiceDescription";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const RelativeInfomation = ({navigation}) => {
  const [modalVisible,setModalVisible] = useState(false)

  const openDrawer = ()=>{
    navigation.openDrawer()
  }
  const handleLeftButton =()=>{
    setModalVisible(false)
  }


  return (
    <View style={styles.container}>
      <Header nameLeftIcon={'navicon'} namePage={'Người thân'} handleLeftButton={openDrawer}/>
      <View style={{flex:1,width:"100%",alignItems:"center"}}>
        <View style={{height:50,width:"100%",marginTop:20,justifyContent:"center",alignItems:"center"}}>
          <TouchableOpacity onPress={()=>setModalVisible(true)} style={{height:"100%",width:"40%",borderWidth:1,borderColor:themes.green,borderRadius:10,justifyContent:"center",alignItems:'center'}}>
            <Text style={{fontWeight:'500', color:themes.green}}>Thêm người thân</Text>
          </TouchableOpacity>
        </View>
        <View style={{height:20}}></View>
        <TouchableOpacity style={{flexDirection:"row",height:'8%',width:"100%",alignItems:"center",borderBottomWidth:0.5,borderBottomColor:themes.green}}>
          <Image style={{height:"80%",width:'20%'}} resizeMode="contain" source={require('../../assets/Icon/user.png')}/>
          <Text style={{fontSize:16,fontWeight:'500'}}>Lê Công Vinh</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:"row",height:'8%',width:"100%",alignItems:"center",borderBottomWidth:0.5,borderBottomColor:themes.green}}>
          <Image style={{height:"80%",width:'20%'}} resizeMode="contain" source={require('../../assets/Icon/user.png')}/>
          <Text style={{fontSize:16,fontWeight:'500'}}>Thủy Tiên</Text>
        </TouchableOpacity>
      </View>
      
      {
        modalVisible && 
        (<View style={styles.modal}>
          <Header namePage={'Thông tin người thân'} nameLeftIcon={'chevron-left'} handleLeftButton={handleLeftButton}/>
            <KeyboardAwareScrollView enableOnAndroid={true} enableAutomaticScroll={true} extraScrollHeight={200} style={{flex:1,width:"100%",backgroundColor:'white'}}>
            <View style={{height:100,width:'100%',justifyContent:"center",alignItems:"center"}}>
              <View style={{height:"80%",width:'20%'}}>
                <Image style={{height:"100%",width:"100%"}} resizeMode="contain" source={require('../../assets/Icon/user.png')}/>
              </View>
            </View>
            <View style={{width:'100%', alignItems:"center",height:20}}>
              <Text style={{fontSize:18,fontWeight:"500"}}>Test user</Text>
            </View>
            <View style={{width:'100%',paddingLeft:"5%",paddingRight:'5%',gap:4,marginTop:10}}>
              <Text style={styles.text}>Họ & tên</Text>
              <View style={{borderWidth:1,height:34,width:"100%",paddingLeft:'2%',paddingRight:"2%"}}>
                <TextInput style={{height:'100%',width:"100%"}} placeholder="Họ và tên"></TextInput>
              </View>
            </View>
            <View style={{width:'100%',paddingLeft:"5%",paddingRight:'5%',gap:4,marginTop:10,flexDirection:"row",justifyContent:"space-between"}}>
            <View style={{width:"40%",gap:4}}>
            <Text style={styles.text}>Giới tính</Text>
              <View style={{borderWidth:1,height:34,width:"100%",paddingLeft:'4%',paddingRight:"4%",flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                <Text>Nữ</Text>
                <Ionicons name='person' size={16}/>
              </View>
            </View>
            <View style={{width:"50%",gap:4}}>
            <Text style={styles.text}>Ngày sinh</Text>
              <View style={{borderWidth:1,height:34,width:"100%",paddingLeft:'4%',paddingRight:"4%",justifyContent:"center",alignItems:"flex-start"}}>
                <Text>21/11/2000</Text>
              </View>
            </View>
            </View>
            <View style={{width:'100%',paddingLeft:"5%",paddingRight:'5%',gap:4,marginTop:10}}>
              <Text style={styles.text}>Số điện thoại</Text>
              <View style={{borderWidth:1,height:34,width:"100%",paddingLeft:'2%',paddingRight:"2%"}}>
                <TextInput style={{height:'100%',width:"100%"}} placeholder="Số điện thoại"></TextInput>
              </View>
            </View>
            <View style={{width:'100%',paddingLeft:"5%",paddingRight:'5%',gap:4,marginTop:10}}>
              <Text style={styles.text}>Email</Text>
              <View style={{borderWidth:1,height:34,width:"100%",paddingLeft:'2%',paddingRight:"2%"}}>
                <TextInput style={{height:'100%',width:"100%"}} placeholder="Email"></TextInput>
              </View>
            </View>
            <View style={{width:'100%',paddingLeft:"5%",paddingRight:'5%',gap:4,marginTop:10}}>
              <Text style={styles.text}>Địa chỉ</Text>
              <View style={{borderWidth:1,height:34,width:"100%",paddingLeft:'2%',paddingRight:"2%"}}>
                <TextInput style={{height:'100%',width:"100%"}} placeholder="Địa chỉ"></TextInput>
              </View>
            </View>
            <View style={{width:'100%',paddingLeft:"5%",paddingRight:'5%',gap:4,marginTop:10}}>
              <Text style={styles.text}>Quan hệ</Text>
              <View style={{borderWidth:1,height:34,width:"100%",paddingLeft:'2%',paddingRight:"2%"}}>
                <TextInput style={{height:'100%',width:"100%"}} placeholder="Quan hệ"></TextInput>
              </View>
            </View>
            <View style={{width:'100%',paddingLeft:"5%",paddingRight:'5%',gap:4,marginTop:10}}>
              <Text style={styles.text}>Nhóm máu</Text>
              <View style={{borderWidth:1,height:34,width:"100%",paddingLeft:'2%',paddingRight:"2%"}}>
                <TextInput style={{height:'100%',width:"100%"}} placeholder="Nhóm máu"></TextInput>
              </View>
            </View>
            <View style={{width:'100%',paddingLeft:"5%",paddingRight:'5%',gap:4,marginTop:10}}>
              <Text style={styles.text}>Tiểu sử bệnh</Text>
              <View style={{borderWidth:1,height:34,width:"100%",paddingLeft:'2%',paddingRight:"2%"}}>
                <TextInput style={{height:'100%',width:"100%"}} placeholder="Tiểu sử bệnh"></TextInput>
              </View>
            </View>
            
            <View style={{height:200,width:"100%",alignItems:"center",justifyContent:"flex-start",paddingTop:"10%"}}>
              <TouchableOpacity style={{height:"30%",width:'90%',backgroundColor:themes.green,justifyContent:"center",alignItems:"center",borderRadius:10}}>
                <Text style={{fontSize:16,fontWeight:"500",color:'white'}}>Lưu thay đổi</Text>
              </TouchableOpacity>
            </View>
            
          
          
            </KeyboardAwareScrollView>

          

        </View>)
      }
    </View>
  )
}

export default RelativeInfomation

const styles = StyleSheet.create({
  container:{
    height:"100%",
    width:"100%",
    position:'relative'
  },
  modal:{
    height:windowHeight,
    width:"100%",
    position:"absolute",
  },
  text:{
    color:themes.green,
    fontWeight:"500",
    fontSize:15,
    marginBottom:5
  }
})