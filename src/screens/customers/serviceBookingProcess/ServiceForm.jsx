import React, { useState,useEffect } from "react";
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
  Button,
  useWindowDimensions
} from "react-native";
import { useSelector,useDispatch } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { getListServices, getListSubServices, getListSubServicesByIDService } from "../../../redux/slices/servicesSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Foundation from "react-native-vector-icons/Foundation";
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../../../components/header/Header";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import themes from "../../../../themes";
import NumberPlease from 'react-native-number-please';
import { getRelativeUser,editRelativeUser,getRelativeUserData,deleteRelativeUser } from '../../../redux/slices/relativeSlice'
import RelativeItem from "../../../components/ListRelative/ItemRelative";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ServiceForm = ({navigation}) => {
    const dispatch = useDispatch()
    const route = useRoute();
    const { name, id } = route.params;

//SECTION - Chọn ngày bắt đầu
    const [startDate, setStartDate] = useState(new Date())
    const [showStartDate, setShowStartDate] = useState(false)
    const onChangeStartDate = (event, selectedDate ) => {
        console.log('Hello world')
        console.log(selectedDate)
        setStartDate(selectedDate)
        setShowStartDate(false)
    }
//!SECTION


//SECTION - Chọn giờ bắt đầu
    const [startTime, setStartTime] = useState(startDate)
    const [showStartTime, setShowStartTime] = useState(false)
    const onChangeStartTime = (event, selectedTime ) => {
        console.log('Thời gian bắt đầu : ', selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        setStartTime(selectedTime);
        setShowStartTime(false);
      }
//!SECTION
//SECTION - Chọn giờ kết thúc
    const [endTime, setEndTime] = useState(startDate)
    const [showEndTime, setShowEndTime] = useState(false)
    const onChangeEndTime = (event, selectedTime ) => {
        console.log('Thời gian kết thúc : ', selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        setEndTime(selectedTime);
        setShowEndTime(false);
      }
//!SECTION
//SECTION - Chọn số ngày
    const [showDays, setShowDays] = useState(false)
      const [days,setDays] = useState(0)

    const handleInputDays = () => {
        setShowDays(false)
    }
//!SECTION

//SECTION - Ghi chú
    const [note, setNote] = useState("");
    const [numberOfLines, setNumberOfLines] = useState(1);
 
//!SECTION

  //SECTION - Get data relatives
  useEffect(() => {
    console.log("bắt đầu tìm kiếm token")
    const getToken = async () => {
      const value = await AsyncStorage.getItem("userToken"); //Lấy token từ store
      if (value !== null) {
        const data = JSON.parse(value); 
        // console.log(data)
        dispatch(getRelativeUser({token : data}))
      }
    };
    getToken()
  }, []);

  const {dataRelativeUser,RelativeUserDetails} = useSelector((state) => state.relative) //Danh sách / Chi tiết 1 người
//   console.log('list : ', dataRelativeUser)

const [modalListRelatives, setModalListRelatives] = useState(false)
//!SECTION

// const [serviceUsers, setServiceUsers] = useState({"__v": 0, "_id": "658a35b63fceb4ac08a55f02", "address": "789 Forest Road, Village", "bloodGroup": "A+", "createdAt": "2023-12-26T02:08:54.116Z", "dateOfBirth": "1988-09-22T00:00:00.000Z", "fullname": "Bob Johnson 4", "gender": "Female", "healthcareAgent": "6586952d8f4a92e3054a3d6e", "medicalHistory": "Asthma, takes regular medication.", "phoneNumber": "0397184209", "updatedAt": "2023-12-26T02:08:54.116Z"})
const [serviceUsers, setServiceUsers] = useState('')
const handlePressItemRelative = (id,data) =>{
  console.log('User : ' ,data)
  setServiceUsers(data)
  setModalListRelatives(false)
}

const ageCalculator = (dateOfBirth) => {
  const currentDate = new Date();
  const birthDate = new Date(dateOfBirth);
  
  const ageInMilliseconds = currentDate - birthDate;
  
  // Chuyển đổi từ milliseconds sang tuổi
  const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));
  
  return ageInYears;
}

//SECTION - Thanh toán
  const [cashPayment,setCashPayment] = useState(false)
//!SECTION

//SECTION - Xử lý xác nhận

  const handleSercive = () =>{
    let dataService = {
      startDate : startDate,
      days : days,
      startTime : startTime,
      endTime : endTime,
      serviceUsers : serviceUsers,
      note : note,
      cashPayment : cashPayment,
      
    }
  }
//!SECTION


  return (
    <View style={styles.container}>
            <Header nameLeftIcon={'chevron-left'} handleLeftButton={()=>navigation.goBack()} namePage={name} /> 
            <ScrollView style={[styles.body]}>
            <View style={styles.cover}>
              <View style={{width:'100%',height:40,flexDirection:'row',justifyContent:'space-between',marginBottom:10}}>
                <TouchableOpacity onPress={()=>setShowStartDate(true)}  style={styles.btn}>
                  <Text style={{color:themes.green,fontWeight:'600'}}>Ngày bắt đầu</Text>
                  <AntDesign name={'calendar'} size={20} color={themes.green}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setShowStartTime(true)} style={styles.btn}>
                  <Text style={{color:themes.green,fontWeight:'600'}}>Giờ bắt đầu</Text>
                  <AntDesign name={'clockcircleo'} color={themes.green} size={20}/>
                </TouchableOpacity>
              </View>
              <View style={{width:'100%',height:40,flexDirection:'row',justifyContent:'space-between'}}>
                <TouchableOpacity onPress={()=>setShowDays(true)} style={styles.btn}>
                  <Text style={{color:themes.green,fontWeight:'600'}}>Số ngày</Text>
                  <AntDesign name={'calendar'} size={20} color={themes.green}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setShowEndTime(true)} style={styles.btn}>
                  <Text style={{color:themes.green,fontWeight:'600'}}>Giờ kết thúc</Text>
                  <AntDesign name={'clockcircleo'} color={themes.green} size={20}/>
                </TouchableOpacity>
              </View>
              </View>
              <View style={styles.cover}>
                <Text style={{fontSize:16, fontWeight:'500',color:themes.green}}>Người sử dụng dịch vụ </Text>
              {
                serviceUsers == '' && (
                  <View style={{borderRadius:10, paddingTop:20,paddingBottom:20,justifyContent:"center",alignItems:"center",width:'100%', borderColor:themes.gray}}>
                    <TouchableOpacity onPress={()=>setModalListRelatives(true)} style={{flexDirection:'row',width:"100%",justifyContent:"center",alignItems:'center',height:40,borderColor:themes.green,borderWidth:1,borderRadius:10}}>
                      <Text style={{fontWeight:'600',color:themes.green}}>Chọn người sử dụng dịch vụ</Text>
                    </TouchableOpacity>
                  </View>
                )
              }
              {
                serviceUsers !== '' && (
                  <View style={{borderRadius:10, paddingTop:10,paddingBottom:10,justifyContent:"center",alignItems:"center",width:'100%', borderColor:themes.gray}}>
                    <View style={{width:"100%",paddingTop:10,paddingBottom:10,borderRadius:10,borderWidth:1,borderColor:themes.green,flexDirection:'column',justifyContent:'center',alignItems:"center"}}>
                        <Text style={{fontSize:14,fontWeight:"500",color:themes.green}}>{`${serviceUsers.fullname}, Tuổi : ${ageCalculator(serviceUsers.dateOfBirth)} `}</Text>
                        <Text style={{fontSize:14,fontWeight:"500",color:themes.green}}>{`${serviceUsers.address}`}</Text>
                      </View>
                    <TouchableOpacity onPress={()=>setModalListRelatives(true)} style={{flexDirection:'row',marginTop:10,width:"100%",justifyContent:"center",alignItems:'center',height:40,borderColor:themes.gray,borderWidth:1,borderRadius:10}}>
                      <Text style={{fontWeight:'600',color:themes.yellow}}>Đổi người sử dụng dịch vụ</Text>
                    </TouchableOpacity>
                    
              </View>
                )
              }
              </View>
              <View style={styles.cover}>
                <Text style={{fontSize:16, fontWeight:'500',color:themes.green,marginBottom:10}}>Ghi chú :</Text>
              <View style={{ borderRadius:10, width: "100%", borderWidth: 1, borderColor: themes.gray, justifyContent: "flex-start",alignItems:'center',paddingLeft:'4%',paddingRight:'4%',paddingTop:"4%",paddingBottom:'4%' }}>
                
                <TextInput
                  style={{ width: "100%" }}
                  placeholder="Ghi chú"
                  multiline={true}
                  numberOfLines={numberOfLines}
                  value={note}
                  onChangeText={(text) => { setNote(text); const lines = text.split("\n").length;setNumberOfLines(lines > 1 ? lines : 1);}}
                  />
              </View>
              </View>

              <View style={styles.cover}>

                <Text style={{fontSize:16,fontWeight:"500",marginBottom:10,color:themes.green}}>Chọn phương thức thanh toán :</Text>
                <TouchableOpacity onPress={()=> setCashPayment(true)} style={{height:20,width:"100%",flexDirection:'row',gap:10,marginBottom:6}}>
                  <Ionicons size={20} name={cashPayment===true?'radio-button-on-outline':'radio-button-off-outline'} color={themes.green}/>
                  <Text>Thanh toán bằng tiền mặt</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> setCashPayment(false)} style={{height:20,width:"100%",flexDirection:'row',gap:10}}>
                  <Ionicons size={20} name={cashPayment===false?'radio-button-on-outline':'radio-button-off-outline'} color={themes.green}/>
                  <Text>Thanh toán chuyển khoản</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.cover}>
              <Text style={{fontSize:16, fontWeight:'500',color:themes.green}}>Chi tiết thanh toán</Text>
              <View style={{width:'100%',flexDirection:'row',marginTop:10}}>
                <View style={{width:'30%',justifyContent:"center",alignItems:'flex-start'}}>
                  <Text style={styles.paymentText}>Giá tiền : </Text>
                  <Text style={styles.paymentText}>Giảm giá : </Text>
                  <Text style={styles.paymentText}>Tổng thanh toán : </Text>
                </View>
                <View style={{width:'70%',justifyContent:"center",alignItems:'flex-end'}}>
                  <Text style={styles.paymentText}>200.000 đ </Text>
                  <Text style={styles.paymentText}>50.000 đ </Text>
                  <Text style={[styles.paymentText,{color:'red',fontSize:16}]}>150.000 đ </Text>
                </View>
              </View>
              </View>
              <View style={{flex:1,width:"100%",paddingLeft:'5%',paddingRight:"5%",justifyContent:'flex-end',paddingBottom:20}}>
                <TouchableOpacity 
                  onPress={handleSercive}
                 style={{flexDirection:'row',justifyContent:"center",alignItems:'center',height:50,backgroundColor:themes.green,marginTop:20,borderRadius:10}}>
                  <Text style={{fontWeight:'600',color:'white',fontSize:16}}>Tiếp theo</Text>
                </TouchableOpacity>
              </View>
              <View style={{height:40}}></View>
              
            </ScrollView>
            {
                showStartDate && (
                    <DateTimePicker 
                        value={startDate}
                        mode="date"
                        onChange={onChangeStartDate}
                        onTouchCancel={()=>{
                            setShowStartDate(false)
                        }}
                        
                    />
                )
            }
            {
                showStartTime && (
                    <DateTimePicker 
                        value={startTime}
                        mode="time"
                        onChange={onChangeStartTime}
                        onTouchCancel={()=>{
                            setShowStartTime(false)
                        }}
                    />
                )
            }
            {
                showEndTime && (
                    <DateTimePicker 
                        value={endTime}
                        mode="time"
                        onChange={onChangeEndTime}
                        onTouchCancel={()=>{
                            setShowEndTime(false)
                        }}
                    />
                )
            }
            {
                showDays && (
                    <View style={{height:"100%",width:'100%',position:"absolute",justifyContent:"center",alignItems:"center"}}>
                        <TouchableOpacity onPress={()=>setShowDays(false)} style={{flex:1,width:'100%',backgroundColor:"rgba(1, 1, 1, 0.5)"}}>

                        </TouchableOpacity>
                        <View style={{height:220,width:"100%",backgroundColor:'white',justifyContent:"center",alignItems:"center"}}>
                            <Text style={{fontSize:16,fontWeight:"500",color:themes.green,marginBottom:20}}>Nhập số ngày</Text>
                            <View style={{height:'30%',width:'14%',borderWidth:1,borderRadius:10,borderColor:themes.green}}>
                                <TextInput autoFocus={true} value={days} onChangeText={(text)=>setDays(text)} keyboardType="number-pad" style={{height:"100%",width:'100%',textAlign:'center',fontSize:16}}/>
                            </View>
                            <TouchableOpacity onPress={handleInputDays} style={{height:40,width:'90%',backgroundColor:themes.green,borderRadius:10,marginTop:20,justifyContent:"center",alignItems:"center"}}>
                                <Text style={{fontSize:14,fontWeight:'500',color:'white'}}>Xác nhận</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={()=>setShowDays(false)} style={{flex:1,width:'100%',backgroundColor:"rgba(1, 1, 1, 0.5)"}}>

                        </TouchableOpacity>
                    </View>
                )
            }
            {
                modalListRelatives && (
                    <View style={{height:"100%",width:'100%',justifyContent:"flex-start",alignItems:"center",position:'absolute',backgroundColor:"white"}}>
                        <Header handleLeftButton={()=>setModalListRelatives(false)} nameLeftIcon={'chevron-left'} namePage={'Chọn người thân'} />
                        {
                          dataRelativeUser.map(item => (
                            <RelativeItem
                              key={item._id}
                              item={item}
                              handlePress={()=>handlePressItemRelative(item._id,item)}
                    
                          />
))
              }
                        
                    </View>
                )
            }



          </View>
  )
}

export default ServiceForm

const styles = StyleSheet.create({
    container :{
        height:windowHeight,
        width:"100%",
    },
    body:{
        flex:1,
        width:'100%',
        paddingTop:4
      },
      btn:{
        flexDirection:"row",
        justifyContent:"space-between",
        borderWidth:1,
        width:"48%",
        alignItems:"center",
        paddingLeft:"4%",
        paddingRight:"4%",
        borderColor:themes.gray,
        backgroundColor:"white",
        borderRadius:10
      },
      cover :{
        width:'100%',
        backgroundColor:'white', 
        paddingLeft:"5%",
        paddingRight:"5%",
        paddingTop:10,
        paddingBottom:10,
        marginBottom:6
      },
      paymentText:{
        fontSize:14,
        fontWeight:"500",
        lineHeight:24
      }
})