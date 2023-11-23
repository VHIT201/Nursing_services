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
import dataService from "../../seeders/dataService";
import themes from "../../../themes";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const CustomerHome = ({navigation}) => {
  const [visibleModal,setVisibleModal] = useState(false)
  const [visibleModal1,setVisibleModal1] = useState(false)
  const [visibleModal2,setVisibleModal2] = useState(false)
  const [modal1Name,setModal1Name] = useState('')
  const [id,setId] = useState('')
  const [subService, setSubService] = useState([])
  const [schedule,setSchedule] = useState(1)
  const [cashPayment,setCashPayment] = useState(true)
const services = dataService


  const openDrawer = ()=>{
    navigation.openDrawer()
  }
  const handleHomeButton = (id) =>{
    setVisibleModal(true)
    findSubServicesById(id)

  }
  const handleLeftModalButton = () =>{
    setVisibleModal(false)
  }
  const handleLeftModal1Button = () =>{
    setVisibleModal1(false)
  }
  const handleLeftModal2Button = () =>{
    setVisibleModal2(false)
  }
  const handlePressItemModal = (name) =>{
    setVisibleModal1(true)
    setModal1Name(name)
  }

  const handleButtonModal1 = ()=>{
    setVisibleModal2(true)
  }
  const findSubServicesById = (id) => {
    const service = dataService.find(service => service.id === id);
    if (service) {
      setSubService(service.subServices)
    } 
  }

  return (
    <View style={styles.container}>
      <Header nameLeftIcon={'navicon'} handleLeftButton={openDrawer} namePage={'Trang chủ'} />
      <View style={styles.body}>
      <FlatList
          data={services}
          renderItem={({ item }) => (
            <HomeSelectButton handlePress={()=>handleHomeButton(item.id)} nameLeftIcon={'chevron-left'} title={item.name} />
            
            )}
          keyExtractor={(item) => item.id} 
        />
        
      </View>

      {
        visibleModal &&(
          <View style={styles.modal}>
            <Header nameLeftIcon={'chevron-left'} handleLeftButton={handleLeftModalButton} namePage={'Chăm sóc - Điều dưỡng'} /> 
            <View style={{flex:1,width:"100%"}}>
              <FlatList
                  data={subService}
                  renderItem={({ item }) => (
                      <HomeSelectButton handlePress={()=>handlePressItemModal(item.name)}  nameLeftIcon={'chevron-left'}  title={item.name} />
                      
                      )}
                  keyExtractor={(item) => item.id} 
                  />
            </View>
          </View>
        )
      }

      {
        visibleModal1 &&(
          <View style={styles.modal1}>
            <Header nameLeftIcon={'chevron-left'} handleLeftButton={handleLeftModal1Button} namePage={modal1Name} /> 
            <View style={[styles.body,{paddingTop:'4%'}]}>
              <View style={{width:'100%',height:"5%",flexDirection:'row',justifyContent:'space-between',marginBottom:10}}>
                <TouchableOpacity style={styles.modal1Btn}>
                  <Text style={{color:themes.green,fontWeight:'600'}}>Ngày bắt đầu</Text>
                  <AntDesign name={'calendar'} size={20} color={themes.green}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modal1Btn}>
                  <Text style={{color:themes.green,fontWeight:'600'}}>Giờ bắt đầu</Text>
                  <AntDesign name={'clockcircleo'} color={themes.green} size={20}/>
                </TouchableOpacity>
              </View>
              <View style={{width:'100%',height:"5%",flexDirection:'row',justifyContent:'space-between'}}>
                <TouchableOpacity style={styles.modal1Btn}>
                  <Text style={{color:themes.green,fontWeight:'600'}}>Số ngày</Text>
                  <AntDesign name={'calendar'} size={20} color={themes.green}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modal1Btn}>
                  <Text style={{color:themes.green,fontWeight:'600'}}>Giờ kết thúc</Text>
                  <AntDesign name={'clockcircleo'} color={themes.green} size={20}/>
                </TouchableOpacity>
              </View>
              <View style={{ height: "20%", width: "100%", borderWidth: 1, borderColor: themes.gray, marginTop: 20, justifyContent: "flex-start",alignItems:'center',paddingLeft:'4%',paddingRight:'4%',paddingTop:"4%",paddingBottom:'4%' }}>
                <TextInput style={{ width: '100%' }} placeholder="Ghi chú" multiline={true} numberOfLines={6} />
              </View>

              <TouchableOpacity style={{flexDirection:'row',justifyContent:"center",alignItems:'center',height:"5%",borderColor:themes.gray,borderWidth:1,marginTop:20,borderRadius:10}}>
                <Text style={{fontWeight:'600',color:themes.green}}>Chọn người sử dụng dịch vụ</Text>
              </TouchableOpacity>

              <View style={{width:"100%",gap:10,marginTop:20}}>
                <Text style={{fontSize:14,fontWeight:"600"}}>Chọn phương thức thanh toán :</Text>
                <TouchableOpacity onPress={()=>setCashPayment(true)} style={{height:20,width:"100%",flexDirection:'row',gap:10}}>
                  <Ionicons size={20} name={cashPayment===true?'radio-button-on-outline':'radio-button-off-outline'} color={themes.green}/>
                  <Text>Thanh toán bằng tiền mặt</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setCashPayment(false)} style={{height:20,width:"100%",flexDirection:'row',gap:10}}>
                  <Ionicons size={20} name={cashPayment===false?'radio-button-on-outline':'radio-button-off-outline'} color={themes.green}/>
                  <Text>Thanh toán chuyển khoản</Text>
                </TouchableOpacity>
              </View>
              
              <View style={{marginTop:20,width:'100%',gap:10}}>
                <Text style={{fontWeight:"600",fontSize:15}}>Giá tiền: <Text style={{fontSize:15,fontWeight:'500',color:themes.green}}>500.000 đ</Text></Text>
                <Text style={{fontWeight:"600",fontSize:15}}>Giảm giá: <Text style={{fontSize:15,fontWeight:'500',color:themes.green}}>20.000 đ</Text></Text>
                <Text style={{fontWeight:"600",fontSize:15}}>Tổng tiền: <Text style={{fontSize:15,fontWeight:'500',color:themes.green}}>480.000 đ</Text></Text>
              </View>
              <TouchableOpacity onPress={()=>handleButtonModal1()} style={{flexDirection:'row',justifyContent:"center",alignItems:'center',height:"6%",backgroundColor:themes.green,marginTop:20,borderRadius:10}}>
                <Text style={{fontWeight:'600',color:'white',fontSize:16}}>Tiếp theo</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      }

      {
        visibleModal2 &&(
          <View style={styles.modal2}>
            <Header nameLeftIcon={'chevron-left'} handleLeftButton={handleLeftModal2Button} namePage={'Xác nhận dịch vụ'} />
            <View style={[styles.body,{paddingTop:"5%"}]}>
              <Text style={{fontWeight:"600",fontSize:15,color:themes.green}}>Thông tin đặt lịch</Text>
              <View style={{flexDirection:'row',width:"100%",marginTop:20}}>
                <View style={{width:"30%",gap:10}}>
                  <Text style={styles.textBoldBlack}>Mã dịch vụ</Text>
                  <Text style={styles.textBoldBlack}>Dịch vụ</Text>
                  <Text style={styles.textBoldBlack}>Nhóm dịch vụ</Text>
                  <Text style={styles.textBoldBlack}>Giờ bắt đầu</Text>
                  <Text style={styles.textBoldBlack}>Giờ kết thúc</Text>
                  <Text style={styles.textBoldBlack}>Ngày bắt đầu</Text>
                  <Text style={styles.textBoldBlack}>Số ngày</Text>
                </View>
                <View style={{width:"70%",gap:10}}>
                  <Text style={styles.text}>DV001</Text>
                  <Text style={styles.text}>Chăm sóc bệnh nhân tại nhà</Text>
                  <Text style={styles.text}>Chăm sóc - Điều dưỡng</Text>
                  <Text style={styles.text}>7:30</Text>
                  <Text style={styles.text}></Text>
                  <Text style={styles.text}>2023-11-14</Text>
                  <Text style={styles.text}>2</Text>
                </View>
              </View>
              <Text style={{fontWeight:"600",fontSize:15,marginTop:30,color:themes.green,marginBottom:10}}>Người sử dụng dịch vụ</Text>
              <Text style={{fontSize:15}}>Lê Công Vinh</Text>
              <Text style={{fontWeight:"600",fontSize:15,marginTop:20,color:themes.green,marginBottom:10}}>Địa chỉ sử dụng dịch vụ</Text>
              <Text style={{fontSize:15}}>298, hẻm 7, tổ 41, khu phố 12A, phường Tân Hiệp, BH, ĐN</Text>
              
              <View style={{height:20,width:'100%',flexDirection:'row',justifyContent:'space-between',alignItems:"center",marginTop:20,paddingRight:"30%"}}>
                <Text style={{fontSize:15,color:themes.green,fontWeight:'600'}}>Giá dịch vụ</Text>
                <Text style={{fontSize:15,fontWeight:"500",color:"red"}}>500.000 đ</Text>
              </View>
              <View style={{height:20,width:'100%',flexDirection:'row',justifyContent:'space-between',alignItems:"center",marginTop:20,paddingRight:"30%"}}>
                <Text style={{fontSize:15,color:themes.green,fontWeight:'600'}}>Phương thức thanh toán</Text>
                <Text style={{fontSize:15,fontWeight:"500",color:"red"}}>Tiền mặt</Text>
              </View>
              <View style={{flex:1,width:"100%",justifyContent:'flex-start',paddingTop:"20%"}}>
                <TouchableOpacity style={{height:"22%",width:"100%",backgroundColor:themes.green,borderRadius:10,justifyContent:"center",alignItems:"center"}}>
                  <Text style={{color:'white',fontSize:15,fontWeight:"600"}}>Xác nhận</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        )
      }
      
      
    </View>
  )
}

export default CustomerHome

const styles = StyleSheet.create({
  container:{
    height:"100%",
    width:'100%',
    position:"relative"
  },
  body:{
    flex:1,
    width:'100%',
    paddingLeft:"5%",
    paddingRight:"5%"
  },
  modal:{
    position:"absolute",
    height:"100%",
    width:"100%",
    backgroundColor:"white",
    zIndex:2
  },
  modal1:{
    position:"absolute",
    height:"100%",
    width:"100%",
    backgroundColor:"white",
    zIndex:3
  },
  modal2:{
    position:"absolute",
    height:windowHeight,
    width:"100%",
    backgroundColor:"white",
    zIndex:4
  },
  btn:{
    height:'7%',
    width:"100%",
    flexDirection:'row',
    paddingLeft:'5%',
    paddingRight:"5%",
    alignItems:"center",
    justifyContent:"space-between",
    borderBottomColor:themes.gray,
    borderBottomWidth:1
  },
  btnAct:{
    height:'7%',
    width:"100%",
    flexDirection:'row',
    paddingLeft:'5%',
    paddingRight:"5%",
    alignItems:"center",
    justifyContent:"space-between",
    borderBottomColor:themes.green,
    borderBottomWidth:1
  },
  modal1Btn:{
    flexDirection:"row",
    justifyContent:"space-between",
    borderWidth:1,
    width:"48%",
    alignItems:"center",
    paddingLeft:"4%",
    paddingRight:"4%",
    borderColor:themes.gray
  },
  text:{
    fontSize:14,
   
  },
  textBoldBlack:{
    fontWeight:'600',
    color:themes.green
  }
})