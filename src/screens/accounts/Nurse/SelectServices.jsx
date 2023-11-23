import React, { useState,useMemo } from "react";
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
  Image
} from "react-native";
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Foundation from "react-native-vector-icons/Foundation";
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import themes from "../../../../themes";
import Header from "../../../components/header/Header";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const SelectServices = ({navigation}) => {

  const [services, setServices] = useState([
    { id: 1, service: 'Chăm sóc - điều dưỡng', state: false },
    { id: 2, service: 'Thủ thuật điều dưỡng', state: false },
    { id: 3, service: 'Phục hồi chức năng', state: false },
    { id: 4, service: 'Châm cứu - Bấm huyệt', state: false },
    { id: 5, service: 'Mẹ và bé', state: false },
    { id: 6, service: 'Đặt lịch xét nghiệm tại nhà', state: false },
  ]);

  const handleUpdateService = (id) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === id ? { ...service, state: !service.state } : service
      )
    );
  };
  

  return (
    <View style={styles.container}>
      <Header namePage={'Đăng ký dịch vụ'}/>
      <View style={styles.body}>
        <View style={styles.topBodyView}>
        <View style={{width:'20%',height:'100%',borderTopLeftRadius:10,borderBottomLeftRadius:10,justifyContent:"center",alignItems:"center"}}>
          <Image style={{height:'60%',width:"60%",justifyContent:"center",alignItems:"center"}}  resizeMode='contain'
          source={require('../../../assets/Icon/logo.png')}/>
        </View>
        <View style={{width:'80%',height:'100%',borderTopRightRadius:10,borderBottomRightRadius:10,justifyContent:'center'}}>
          <Text style={{fontSize:16,fontWeight:"500",color:themes.green}}>Điều dưỡng</Text>
        </View>
      </View>
      <View style={styles.bodyDescription}>
        <Text style={{fontSize:15,fontWeight:"600"}}>Yêu cầu bằng cấp kinh nghiệm</Text>
        <Text style={{fontSize:13,fontWeight:"400"}}>- Có bằng trung cấp trở lên</Text>
        <Text style={{fontSize:13,fontWeight:"400"}}>- Có kinh nghiệm 6 tháng</Text>
      </View>
      <View style={styles.chooseServicesView}>
        <Text style={{fontSize:15, fontWeight:"500"}}>Chọn dịch vụ bạn có thể thực hiện</Text>

        <View style={{flex:1,width:"100%",marginTop:15}}>
          
          {/* <TouchableOpacity style={styles.btn}>
            <View style={{height:16,width:16,borderRadius:1,borderWidth:1,justifyContent:"center",alignItems:"center",overflow:"hidden"}}>
              <Entypo name={'check'} color={themes.green}/>
            </View>
            <Text style={{color:themes.green,fontWeight:"500"}}>Chăm sóc - điều dưỡng</Text>
          </TouchableOpacity> */}
          <FlatList
          data={services}
          renderItem={({ item }) => (
            item.state ? (
            <TouchableOpacity onPress={() => handleUpdateService(item.id)} style={[styles.btn,{borderBottomColor:themes.green}]}>
              <View style={{
                height: 16,
                width: 16,
                borderRadius: 1,
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden"
              }}>
                <Entypo name={'check'} color={themes.green} />
              </View>
              <Text style={{ color: themes.green, fontWeight: "500" }}>{item.service}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => handleUpdateService(item.id)} style={[styles.btn]}>
              <View style={{ height: 16, width: 16, borderRadius: 1, borderWidth: 1 }}></View>
              <Text style={{ fontWeight: "500" }}>{item.service}</Text>
            </TouchableOpacity>
          ))}
          keyExtractor={(item) => item.id} 
        />
        </View>
      </View>
        <View style={{flex:1,width:"100%",justifyContent:"flex-end",alignItems:"center",paddingLeft:'2%',paddingRight:"2%",paddingBottom:'4%'}}>
          <TouchableOpacity onPress={()=>navigation.navigate('SelectServicesDetail')} style={{height:'16%',width:"100%",borderRadius:10,justifyContent:"center",alignItems:'center',backgroundColor:themes.green}}>
            <Text style={{fontSize:16,fontWeight:"500",color:'white'}}>Đăng ký dịch vụ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default SelectServices

const styles = StyleSheet.create({
  container:{
    height:windowHeight,
    width:windowWidth,
    backgroundColor:themes.white1
  },
  body:{
    flex:1,
    width:"100%"
  },
  topBodyView:{
    height:70,
    width:"100%",
    backgroundColor:"white",
    borderRadius:0,
    flexDirection:"row"
  },
  bodyDescription:{
    width:'100%',
    backgroundColor:"white",
    marginTop:5,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:'4%'
  },
  chooseServicesView:{
    flex:1,
    width:'100%',
    paddingLeft:'4%',
    paddingRight:"4%",
    marginTop:5,
    backgroundColor:'white',
    paddingTop:10
  },
  btn:{
    width:"100%",
    flexDirection:"row",
    paddingBottom:'4%',
    paddingTop:'4%',
    alignItems:"center",
    gap:10,
    borderBottomWidth:1,
    borderBottomColor:themes.gray
  },
})