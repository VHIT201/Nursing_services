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
import { getInfoUser } from "../../../redux/slices/userSlice";
import RelativeItem from "../../../components/ListRelative/ItemRelative";
import ItemNurse from "../../../components/ListNurse/ItemNurse";
import { getListNurseByIDSubservice } from "../../../redux/slices/medicalCaseSlice";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ServiceForm = ({navigation}) => {
    const dispatch = useDispatch()
    const route = useRoute();
    const { name, id } = route.params;
    const [tokenUser, setTokenUser] = useState('')
    const {user} = useSelector((state) => state.user)
    const userId = user._id;
    // console.log(userId);
//SECTION - Hàm lọc thời gian 
  const extractTime = (datetime) => {
    const date = new Date(datetime);

    const hours = date.getHours();
    const h = hours % 12 || 12; // Đảm bảo giờ không bao giờ lớn hơn 12
    const formattedHours = h < 10 ? `0${h}` : h; // Thêm số 0 nếu giờ là một chữ số

    const minutes = date.getMinutes();
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Thêm số 0 nếu phút là một chữ số

    const amOrPm = hours >= 12 ? "PM" : "AM";

    return `${formattedHours}:${formattedMinutes} ${amOrPm}`;
  };

//!SECTION

//SECTION - Chọn ngày bắt đầu
    const [startDate, setStartDate] = useState(new Date())
    const [showStartDate, setShowStartDate] = useState(false)
    const [eligible, setEligible] = useState()
    const onChangeStartDate = (event, selectedDate ) => {
        const formattedDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;
        console.log('Ngày được chọn : ', formattedDate)
        setStartDate(selectedDate)
        setStartTime(selectedDate)
        setEndTime(selectedDate)
        setShowStartDate(false)
    }
//!SECTION


//SECTION - Chọn giờ bắt đầu
    const [startTime, setStartTime] = useState(startDate)
    const [showStartTime, setShowStartTime] = useState(false)
    const onChangeStartTime = (event, selectedTime ) => {
      const formattedDate = `${selectedTime .getFullYear()}-${(selectedTime .getMonth() + 1).toString().padStart(2, '0')}-${selectedTime .getDate().toString().padStart(2, '0')}`;
        console.log('Thời gian bắt đầu : ', formattedDate , ' ', selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        // setStartTime(selectedTime);
        setStartTime(selectedTime);
        // console.log(startTime)
        setShowStartTime(false);
      }
//!SECTION
//SECTION - Chọn giờ kết thúc
    const [endTime, setEndTime] = useState(startDate)
    const [showEndTime, setShowEndTime] = useState(false)
    const onChangeEndTime = (event, selectedTime ) => {
      const formattedDate = `${selectedTime .getFullYear()}-${(selectedTime .getMonth() + 1).toString().padStart(2, '0')}-${selectedTime .getDate().toString().padStart(2, '0')}`;
        console.log('Thời gian kết thúc : ', formattedDate , ' ', selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        if(startTime>selectedTime){
          // console.log("Giờ bắt đầu nhỏ hơn giờ kết thúc");
          setEligible(false)
        }
        if(startTime<selectedTime){
          // console.log('Giờ bắt đầu lớn hơn giờ kết thúc');
          setEligible(true)
        }
        setEndTime(selectedTime);
        // console.log(endTime)
        
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
    // console.log("bắt đầu tìm kiếm token")
    const getToken = async () => {
      const value = await AsyncStorage.getItem("userToken"); //Lấy token từ store
      if (value !== null) {
        const data = JSON.parse(value); 
        setTokenUser(data)
        dispatch(getRelativeUser({token : data}))
        // console.log('Lấy data điều dưỡng')
        let values = {token : data, service : id}
        dispatch(getListNurseByIDSubservice(values)) 
      }
    };
    getToken()
  }, []);

  const {dataRelativeUser,RelativeUserDetails} = useSelector((state) => state.relative) //Danh sách / Chi tiết 1 người
  const data = useSelector((state) => state.user.user);
  // console.log('userdataredux : ', data)
//   console.log('list : ', dataRelativeUser)

const [modalListRelatives, setModalListRelatives] = useState(false)
const [modalListNurse, setModalListNurse] = useState(false)
//!SECTION

// const [serviceUsers, setServiceUsers] = useState({"__v": 0, "_id": "658a35b63fceb4ac08a55f02", "address": "789 Forest Road, Village", "bloodGroup": "A+", "createdAt": "2023-12-26T02:08:54.116Z", "dateOfBirth": "1988-09-22T00:00:00.000Z", "fullname": "Bob Johnson 4", "gender": "Female", "healthcareAgent": "6586952d8f4a92e3054a3d6e", "medicalHistory": "Asthma, takes regular medication.", "phoneNumber": "0397184209", "updatedAt": "2023-12-26T02:08:54.116Z"})
const [serviceUsers, setServiceUsers] = useState('')
const [serviceNurse, setServiceNurse] = useState('')


const handlePressItemRelative = (id,data) =>{
  // console.log('User : ' ,data)
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

//SECTION - XỬ lý list danh sách by subid
  const {listNurseBySubID} = useSelector((state) => state.medicals)
  // console.log(listNurseBySubID);

//!SECTION

//SECTION - Thanh toán
  const [cashPayment,setCashPayment] = useState(false)
//!SECTION

const [idNurse, setIdNurse] = useState('') 
 const handleItemListNurseById = (id,data) => {
  // console.log('data : ',data)
    setIdNurse(id)
    setModalListNurse(false)
 }


 const handleChooseNurse = (id,data) => {
    handleItemListNurseById(id,data)
    setServiceNurse(data)
 }

//SECTION - Xử lý xác nhận

  const handleService = () =>{
    let dataService = {
      token: tokenUser,
      // nurseId: "65688e8002c201f23b1a427d",
      nurseId: idNurse,
      subServiceId: id,
      userRelativeId : serviceUsers,
      // discountCode:"HOLIDAY2024",
      nameService : name,
      note : note,
      status:"happening",
      startDate : startDate.toISOString(),
      startTime : startTime.toISOString(),
      endTime : endTime.toISOString(),
      totalPrice:1000,
      noteNurse : "",
// Phần thêm
      serviceUsers : serviceUsers,
      cashPayment : cashPayment,

    }
    navigation.navigate('ServiceConfirm', dataService)
    // console.log('Data truyền đi : ',dataService);
  }
//!SECTION




  return (
    <View style={styles.container}>
            <Header nameLeftIcon={'chevron-left'} handleLeftButton={()=>navigation.goBack()} namePage={name} /> 
            {
              eligible == false && (
                <View style={{height:20,width:'100%',justifyContent:"center",alignItems:'center',backgroundColor:"white"}}>
                  <Text style={{fontSize:12,fontWeight:"500",color:"red"}}>Giờ bắt đầu phải bé hơn giờ kết thúc !</Text>
                </View>
              )
            }

            <ScrollView style={[styles.body]}>
            <View style={[styles.cover,{justifyContent:"center",alignItems:"flex-start"}]}>
              <Text style={{fontSize:16, fontWeight:'500',color:themes.green,marginBottom:12}}>Chọn thời gian </Text>
              <View style={{width:'90%',height:40,flexDirection:'row',justifyContent:'space-between',marginBottom:10,borderWidth:1,borderRadius:10,borderColor:themes.gray}}>
                <View style={{width:"30%",height:"100%",justifyContent:"center",alignItems:"center",borderRightWidth:1,borderColor:themes.gray}}>
                  <Text style={{fontSize:14,fontWeight:'600',color:themes.green}}>Ngày</Text>
                </View>
                <TouchableOpacity onPress={()=>setShowStartDate(true)} style={{width:"70%",height:"100%", justifyContent:"center",alignItems:"flex-start",paddingLeft:'10%'}}>
                  <Text style={{fontSize:14,fontWeight:'600',color:themes.green}}>{moment(startDate).format('DD/MM/YYYY')}</Text>
                </TouchableOpacity>
              </View>
              <View style={{width:'90%',height:40,flexDirection:'row',justifyContent:'space-between',marginBottom:10,borderWidth:1,borderRadius:10,borderColor:themes.gray}}>
                <View style={{width:"30%",height:"100%",justifyContent:"center",alignItems:"center",borderRightWidth:1,borderColor:themes.gray}}>
                  <Text style={{fontSize:14,fontWeight:'600',color:themes.green}}>Giờ bắt đầu</Text>
                </View>
                <TouchableOpacity onPress={()=>setShowStartTime(true)} style={{width:"70%",height:"100%", justifyContent:"center",alignItems:"flex-start",paddingLeft:'10%'}}>
                  <Text style={{fontSize:14,fontWeight:'600',color:themes.green}}>{extractTime(startTime)}</Text>
                </TouchableOpacity>
              </View>
              <View style={{width:'90%',height:40,flexDirection:'row',justifyContent:'space-between',marginBottom:10,borderWidth:1,borderRadius:10,borderColor:themes.gray}}>
                <View style={{width:"30%",height:"100%",justifyContent:"center",alignItems:"center",borderRightWidth:1,borderColor:themes.gray}}>
                  <Text style={{fontSize:14,fontWeight:'600',color:themes.green}}>Giờ kết thúc</Text>
                </View>
                <TouchableOpacity onPress={()=>setShowEndTime(true)} style={{width:"70%",height:"100%", justifyContent:"center",alignItems:"flex-start",paddingLeft:'10%'}}>
                  <Text style={{fontSize:14,fontWeight:'600',color:themes.green}}>{extractTime(endTime)}</Text>
                </TouchableOpacity>
              </View>
              </View>
              <View style={styles.cover}>
                <View style={{width:"100%",flexDirection:"row", alignItems:"center",justifyContent:'space-between'}}>
                  <Text style={{fontSize:16, fontWeight:'500',color:themes.green}}>Người sử dụng dịch vụ </Text>
                  <TouchableOpacity onPress={()=>setModalListRelatives(true)}>
                    <Text style={{fontSize:14,fontWeight:"500",color:themes.green}}>Thay đổi</Text>
                  </TouchableOpacity>
                </View>
              {
                serviceUsers == '' && (
                  <View style={{borderRadius:10, paddingTop:20,paddingBottom:20,justifyContent:"center",alignItems:"center",width:'100%', borderColor:themes.green}}>
                    {/* <RelativeItem item={data}/> */}
                    <View style={{height:80,width:"90%",borderRadius:10,borderWidth:1,flexDirection:'row',justifyContent:'center',alignItems:"center",borderColor:themes.green}}>
                      <View style={{height:'100%',width:"30%",justifyContent:"center",alignItems:"center"}}>
                        <View style={{height:60,width:60,borderRadius:30}}>
                          <Image style={{height:'100%',width:'100%',borderRadius:25}} resizeMode="contain" source={{uri: data.avatar }}/>
                        </View>
                      </View>
                      <View style={{height:'100%',width:"70%",justifyContent:"center",alignItems:"flex-start"}}>
                        <Text style={{fontSize:15,fontWeight:"500",color:themes.green}}>{data.fullname}</Text>
                        <Text style={{fontSize:14,fontWeight:'500',color:'gray'}}>Địa chỉ : {data.address}</Text>
                      </View>
                    </View>
                  </View>
                )
              }
              {
                serviceUsers !== '' && (
                  <View style={{borderRadius:10, paddingTop:20,paddingBottom:20,justifyContent:"center",alignItems:"center",width:'100%', borderColor:themes.gray}}>
                    {/* <RelativeItem item={data}/> */}
                    <View style={{height:80,width:"90%",borderRadius:10,borderWidth:1,flexDirection:'row',justifyContent:'center',alignItems:"center",borderColor:themes.gray}}>
                      <View style={{height:'100%',width:"30%",justifyContent:"center",alignItems:"center"}}>
                        <View style={{height:60,width:60,borderRadius:30}}>
                          <Image style={{height:'100%',width:'100%',borderRadius:25}} resizeMode="contain" source={{uri:'../../../assets/Icon/user.png'}}/>
                        </View>
                      </View>
                      <View style={{height:'100%',width:"70%",justifyContent:"center",alignItems:"flex-start"}}>
                        <Text style={{fontSize:15,fontWeight:"500",color:themes.green}}>{serviceUsers.fullname}</Text>
                        <Text style={{fontSize:14,fontWeight:'500',color:'gray'}}>Địa chỉ : {serviceUsers.address}</Text>
                      </View>
                    </View>
                  </View>
                )
              }
              </View>
              
              <View style={styles.cover}>
                <View style={{width:"100%",flexDirection:"row", alignItems:"center",justifyContent:'space-between'}}>
                  <Text style={{fontSize:16, fontWeight:'500',color:themes.green}}>Điều dưỡng thực hiện</Text>
                  <TouchableOpacity onPress={()=>setModalListNurse(true)}>
                    <Text style={{fontSize:14,fontWeight:"500",color:themes.green}}>Thay đổi</Text>
                  </TouchableOpacity>
                </View>
              {
                serviceNurse == '' && (
                  <View style={{borderRadius:10, paddingTop:20,paddingBottom:20,justifyContent:"center",alignItems:"center",width:'100%', borderColor:themes.gray}}>
                    <TouchableOpacity onPress={()=>setModalListNurse(true)} style={{flexDirection:'row',width:"70%",justifyContent:"center",alignItems:'center',height:40,borderColor:themes.green,borderWidth:1,borderRadius:10}}>
                      <Text style={{fontWeight:'600',color:themes.green}}>Xem danh sách điều dưỡng</Text>
                    </TouchableOpacity>
                  </View>
                )
              }
              {
                serviceNurse !== '' && (
                  <View style={{borderRadius:10, paddingTop:10,paddingBottom:10,justifyContent:"center",alignItems:"center",width:'100%', borderColor:themes.gray}}>
                    <ItemNurse fullname={serviceNurse.fullname} urlAva={serviceNurse.avatar} stars={serviceNurse.rating}/>
                  </View>
                )
              }
              </View>
              <View style={styles.cover}>
                <Text style={{fontSize:16, fontWeight:'500',color:themes.green,marginBottom:10}}>Ghi chú :</Text>
              <View style={{ borderRadius:10, width: "100%",marginBottom:10, borderWidth: 1, borderColor: themes.gray, justifyContent: "flex-start",alignItems:'center',paddingLeft:'4%',paddingRight:'4%',paddingTop:"4%",paddingBottom:'4%' }}>
                
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

              <View style={[styles.cover]}>

                <Text style={{fontSize:16,fontWeight:"500",marginBottom:10,color:themes.green}}>Chọn phương thức thanh toán :</Text>
                <TouchableOpacity onPress={()=> setCashPayment(true)} style={{height:20,width:"100%",flexDirection:'row',gap:10,marginBottom:6}}>
                  <Ionicons size={20} name={cashPayment===true?'radio-button-on-outline':'radio-button-off-outline'} color={themes.green}/>
                  <Text>Thanh toán bằng tiền mặt</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> setCashPayment(false)} style={{height:20,width:"100%",flexDirection:'row',gap:10}}>
                  <Ionicons size={20} name={cashPayment===false?'radio-button-on-outline':'radio-button-off-outline'} color={themes.green}/>
                  <Text>Thanh toán chuyển khoản</Text>
                </TouchableOpacity>
                <View style={{height:10}}></View>
              </View>
              <View style={styles.cover}>
              <Text style={{fontSize:16, fontWeight:'500',color:themes.green}}>Chi tiết thanh toán</Text>
              <View style={{width:'100%',flexDirection:'row',marginTop:10,marginBottom:10}}>
                <View style={{width:'40%',justifyContent:"center",alignItems:'flex-start'}}>
                  <Text style={styles.paymentText}>Giá tiền : </Text>
                  <Text style={styles.paymentText}>Giảm giá : </Text>
                  <Text style={[styles.paymentText,{fontSize:16}]}>Tổng thanh toán : </Text>
                </View>
                <View style={{width:'60%',justifyContent:"center",alignItems:'flex-end'}}>
                  <Text style={styles.paymentText}>200.000 đ </Text>
                  <Text style={styles.paymentText}>50.000 đ </Text>
                  <Text style={[styles.paymentText,{color:'red',fontSize:16}]}>150.000 đ </Text>
                </View>
              </View>
              </View>
              <View style={{flex:1,width:"100%",paddingLeft:'5%',paddingRight:"5%",justifyContent:'flex-end',paddingBottom:20}}>
                {
                  eligible == false ? (
                  <View style={{flexDirection:'row',justifyContent:"center",alignItems:'center',height:50,backgroundColor:'gray',marginTop:20,borderRadius:10}}>
                    <Text style={{fontWeight:'600',color:'white',fontSize:16}}>Tiếp theo</Text>
                  </View>
                  )
                  :
                  (
                    <TouchableOpacity  
                      onPress={handleService}
                      style={{flexDirection:'row',justifyContent:"center",alignItems:'center',height:50,backgroundColor:themes.green,marginTop:20,borderRadius:10}}>
                      <Text style={{fontWeight:'600',color:'white',fontSize:16}}>Tiếp theo</Text>
                    </TouchableOpacity>
                  )
                }
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
                        value={startDate}
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
            {
                modalListNurse && (
                    <View style={{height:"100%",width:'100%',justifyContent:"flex-start",alignItems:"center",position:'absolute',backgroundColor:"white"}}>
                        <Header handleLeftButton={()=>setModalListNurse(false)} nameLeftIcon={'chevron-left'} namePage={'Chọn điều dưỡng'} />
                          {/* <ItemNurse/> */}
                          <ScrollView style={{flex:1,width:'100%'}}>
                            {
                              listNurseBySubID.map((item, index)=>(
                                <ItemNurse 
                                  key={item._id || `uniqueKey${index}`} 
                                  handlePress={()=>handleChooseNurse(item._id,item)} 
                                  fullname={item.fullname} 
                                  urlAva={item.avatar} 
                                  stars={item.rating}
                                />
                              ))
                            }
                          </ScrollView>

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