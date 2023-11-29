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
import JobsReceived from "../nurses/JobsReceived";
import Header from "../../components/header/Header";
import HomeSelectButton from "../../components/selectionbar/HomeSelectButton";
import themes from "../../../themes";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CustomerSettings = ({navigation}) => {
  const openDrawer = ()=>{
    navigation.openDrawer()
  }
  const handleLeftButton = ()=>{
    setBeingSelected(6)
  }
  const [beingSelected, setBeingSelected] = useState(6)
  const [language,setLanguage] = useState('vi')
  const listSettings = [
    { key: 0, name: 'profile', label: 'Chi tiết tài khoản', icon: 'person' },
    { key: 1, name: 'changePassword', label: 'Đổi mật khẩu', icon: 'key' },
    { key: 2, name: 'language', label: 'Ngôn ngữ', icon: 'language' },
    { key: 3, name: 'rules', label: 'Điều khoản sử dụng', icon: 'document-text' },
    { key: 4, name: 'privacyPolicy', label: 'Chính sách bảo mật', icon: 'shield-checkmark' },
    { key: 5, name: 'exit', label: 'Thoát', icon: 'log-out' },
  ];
  console.log(beingSelected)

  if(beingSelected===0){
    return(
      <View style={styles.container}>
        <KeyboardAwareScrollView enableOnAndroid={true} enableAutomaticScroll={true} style={{flex:1,width:"100%"}}>
        <View style={{height:100,width:'100%',justifyContent:"center",alignItems:"center"}}>
          <View style={{height:"80%",width:'20%'}}>
            <Image style={{height:"100%",width:"100%"}} resizeMode="contain" source={require('../../assets/Icon/user.png')}/>
          </View>
        </View>
        <View style={{width:'100%', alignItems:"center",height:20}}>
          <Text style={{fontSize:18,fontWeight:"500"}}>Test user</Text>
        </View>
        <View style={{width:'100%',paddingLeft:"5%",paddingRight:'5%',gap:4,marginTop:10}}>
          <Text style={{fontSize:12,fontWeight:"500"}}>Họ & tên</Text>
          <View style={{borderWidth:1,height:34,width:"100%",paddingLeft:'2%',paddingRight:"2%"}}>
            <TextInput style={{height:'100%',width:"100%"}} placeholder="Họ và tên"></TextInput>
          </View>
        </View>
        <View style={{width:'100%',paddingLeft:"5%",paddingRight:'5%',gap:4,marginTop:10,flexDirection:"row",justifyContent:"space-between"}}>
        <View style={{width:"40%",gap:4}}>
        <Text style={{fontSize:12,fontWeight:"500"}}>Giới tính</Text>
          <View style={{borderWidth:1,height:34,width:"100%",paddingLeft:'4%',paddingRight:"4%",flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
            <Text>Nữ</Text>
            <Ionicons name='person' size={16}/>
          </View>
        </View>
        <View style={{width:"50%",gap:4}}>
        <Text style={{fontSize:12,fontWeight:"500"}}>Ngày sinh</Text>
          <View style={{borderWidth:1,height:34,width:"100%",paddingLeft:'4%',paddingRight:"4%",justifyContent:"center",alignItems:"flex-start"}}>
            <Text>21/11/2000</Text>
          </View>
        </View>
        </View>
        <View style={{width:'100%',paddingLeft:"5%",paddingRight:'5%',gap:4,marginTop:10}}>
          <Text style={{fontSize:12,fontWeight:"500"}}>Số điện thoại</Text>
          <View style={{borderWidth:1,height:34,width:"100%",paddingLeft:'2%',paddingRight:"2%"}}>
            <TextInput style={{height:'100%',width:"100%"}} placeholder="Số điện thoại"></TextInput>
          </View>
        </View>
        <View style={{width:'100%',paddingLeft:"5%",paddingRight:'5%',gap:4,marginTop:10}}>
          <Text style={{fontSize:12,fontWeight:"500"}}>Email</Text>
          <View style={{borderWidth:1,height:34,width:"100%",paddingLeft:'2%',paddingRight:"2%"}}>
            <TextInput style={{height:'100%',width:"100%"}} placeholder="Email"></TextInput>
          </View>
        </View>
        <View style={{width:'100%',paddingLeft:"5%",paddingRight:'5%',gap:4,marginTop:10}}>
          <Text style={{fontSize:12,fontWeight:"500"}}>Địa chỉ</Text>
          <View style={{borderWidth:1,height:34,width:"100%",paddingLeft:'2%',paddingRight:"2%"}}>
            <TextInput style={{height:'100%',width:"100%"}} placeholder="Địa chỉ"></TextInput>
          </View>
        </View>
        <View style={{width:'100%',paddingLeft:"5%",paddingRight:'5%',gap:4,marginTop:10}}>
          <Text style={{fontSize:12,fontWeight:"500"}}>Tải lên hồ sơ cá nhân</Text>
          <View style={{height:60,width:"100%",paddingLeft:"1%",paddingRight:"5%"}}>
            <TouchableOpacity>
              <Image style={{height:60,width:60,backgroundColor:themes.gray}} resizeMode="contain" source={require('../../assets/Icon/upload.png')}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{height:200,width:"100%",alignItems:"center",justifyContent:"flex-start",paddingTop:"10%"}}>
          <TouchableOpacity onPress={()=>[setBeingSelected(6)]} style={{height:"30%",width:'90%',backgroundColor:themes.green,justifyContent:"center",alignItems:"center",borderRadius:10}}>
            <Text style={{fontSize:16,fontWeight:"500",color:'white'}}>Lưu thay đổi</Text>
          </TouchableOpacity>
        </View>
        
        
        </KeyboardAwareScrollView>

      </View>
    )
  }
  if(beingSelected===1){
    return(
      <View style={styles.container}>
        <Header handleLeftButton={()=>handleLeftButton()} nameLeftIcon={'chevron-left'} namePage={listSettings[beingSelected].label}/>
      <View style={{height:400,width:"100%",paddingTop:"10%",paddingLeft:'5%',paddingRight:'5%'}}>
        <View style={{flexDirection:'row',width:"100%",justifyContent:"flex-start",alignItems:"center",gap:10}}>
          <FontAwesome5 name='lock' size={16} color={themes.green}/>
          <Text style={{fontSize:16,fontWeight:"500",color:themes.green}}>Mật khẩu hiện tại</Text>
        </View>
        <View style={{height:40,width:'100%',borderWidth:1,marginTop:6,justifyContent:"center",alignItems:'flex-start',paddingLeft:"2%"}}>
          <Text>••••••••••••••</Text>
        </View>
        <View style={{flexDirection:'row',width:"100%",justifyContent:"flex-start",alignItems:"center",gap:10,marginTop:20}}>
          <FontAwesome5 name='lock' size={16} color={themes.green}/>
          <Text style={{fontSize:16,fontWeight:"500",color:themes.green}}>Mật khẩu mới</Text>
        </View>
        <View style={{height:40,width:'100%',borderWidth:1,marginTop:6,justifyContent:"center",alignItems:'flex-start',paddingLeft:"2%"}}>
          <TextInput style={{fontSize:14}} placeholder="Mật khẩu mới" />
        </View>
        <View style={{flexDirection:'row',width:"100%",justifyContent:"flex-start",alignItems:"center",gap:10,marginTop:20}}>
          <FontAwesome5 name='lock' size={16} color={themes.green}/>
          <Text style={{fontSize:16,fontWeight:"500",color:themes.green}}>Xác nhận mật khẩu mới</Text>
        </View>
        <View style={{height:40,width:'100%',borderWidth:1,marginTop:6,justifyContent:"center",alignItems:'flex-start',paddingLeft:"2%"}}>
          <TextInput style={{fontSize:14}} placeholder="Xác nhận mật khẩu mới" />
        </View>
      </View>
      
       <View style={{flex:1,width:'100%',justifyContent:'flex-start',alignItems:"center"}}>
        <TouchableOpacity style={{height:'12%',width:"90%",backgroundColor:themes.green,borderRadius:10,justifyContent:'center',alignItems:"center"}}>
            <Text>Lưu thay đổi</Text>
          </TouchableOpacity>
       </View>
      </View>
    )
  }
  if(beingSelected===2){
    return(
      <View style={styles.container}>
        <Header handleLeftButton={()=>handleLeftButton()} nameLeftIcon={'chevron-left'} namePage={listSettings[beingSelected].label}/>
      <View style={{flex:1,width:"100%",paddingLeft:"5%",paddingRight:"5%",marginTop:40}}>
        <TouchableOpacity onPress={()=>setLanguage('vi')} style={{width:"100%",height:50,borderBottomWidth:1,borderBottomColor:themes.green,flexDirection:"row",justifyContent:'space-between',alignItems:"center"}}>
          <Text style={{fontSize:15,fontWeight:'500'}}>Tiếng Việt</Text>
          <Ionicons name={language==='vi'?('radio-button-on'):('radio-button-off')} size={20} color={themes.green}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setLanguage('en')} style={{width:"100%",height:50,borderBottomWidth:1,borderBottomColor:themes.green,flexDirection:"row",justifyContent:'space-between',alignItems:"center"}}>
          <Text style={{fontSize:15,fontWeight:'500'}}>English</Text>
          <Ionicons name={language==='en'?('radio-button-on'):('radio-button-off')} size={20} color={themes.green}/>
        </TouchableOpacity>
      </View>
      </View>
    )
  }
  if(beingSelected===3){
    return(
      <View style={styles.container}>
        <Header handleLeftButton={()=>handleLeftButton()} nameLeftIcon={'chevron-left'} namePage={listSettings[beingSelected].label}/>
      </View>
    )
  }
  if(beingSelected===4){
    return(
      <View style={styles.container}>
        <Header handleLeftButton={()=>handleLeftButton()} nameLeftIcon={'chevron-left'} namePage={listSettings[beingSelected].label}/>
      </View>
    )
  }
  if(beingSelected===5){
    return(
      <View style={styles.container}>
        <Text>Coming Soon</Text>
      </View>
    )
  }
  else{
    return(
      <View style={styles.container}>
        <Header namePage={'Cài đặt'} nameLeftIcon={'navicon'} handleLeftButton={openDrawer}/>
      <View style={{flex:1,width:'100%',paddingLeft:"5%",paddingRight:"5%",paddingTop:"5%"}}>
        
        <FlatList data={listSettings} renderItem={({item})=>(
          <TouchableOpacity onPress={()=>setBeingSelected(item.key)} style={{height:60,width:"100%",justifyContent:"space-between",flexDirection:"row",alignItems:'center',borderBottomWidth:1,borderBottomColor:themes.green}}>
            <View style={{width:"60%",flexDirection:"row", gap:20,alignItems:"center"}}>
              <Ionicons name={item.icon} size={20} color={themes.green}/>
              <Text style={{fontWeight:'500',fontSize:15}}>{item.label}</Text>
            </View>

            <AntDesign name={'right'} size={16} color={themes.green}/>
          </TouchableOpacity>
        )} keyExtractor={item => item.key}>
        
        </FlatList>
      </View>
      </View>
    )
  }
}

export default CustomerSettings

const styles = StyleSheet.create({
  container:{
    height:windowHeight,
    width:windowWidth,
  },
})