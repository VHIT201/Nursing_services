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
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Foundation from "react-native-vector-icons/Foundation";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import themes from "../../../themes";
import Header from "../../components/header/Header";
import Input from "../../components/textInput/TextInput";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import { getDataMedicalById,updateDataMedicalById,updateStatusMedicalById } from "../../redux/slices/medicalCaseSlice";
import { getInfoUser } from "../../redux/slices/userSlice";
import { useSelector,useDispatch } from 'react-redux';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MedicalDetails = ({ route,navigation }) => {
  const [tokenUser, setTokenUser] = useState('')
  const { idSub } = route.params;
  // console.log(idSub)
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.user)
  const { medicalDetails } = useSelector((state) => state.medicals);
  const [tempMedicalDetails, setTempMedicalDetails] = useState(medicalDetails)  
  useEffect(() => {
    setTempMedicalDetails(medicalDetails);
  }, [medicalDetails]);
  // console.log('Thông tin ca bệnh : ', medicalDetails);
  // console.log(tempMedicalDetails);

  const handleUpdateNoteForNurse = () => {
    let values = tempMedicalDetails
    values.token = tokenUser
    dispatch(updateDataMedicalById(values))
  }
  const handleChangeStatus = (status) => {
    let values = { ...tempMedicalDetails }; 
    values.token = tokenUser;
    const updatedValues = {
      ...values,
      status: status,
    };
    let values1 = {_id : medicalDetails._id, status : status, token : tokenUser}
  
    dispatch(updateStatusMedicalById(updatedValues));
  };

  const convertISOtoDDMMYYYY = (isoDateString)=> {
    const dateObject = new Date(isoDateString);
    const day = dateObject.getDate().toString().padStart(2, '0');
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObject.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  function convertISOTo24hr(dateTimeString) {
    const dateObject = new Date(dateTimeString);
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return formattedTime;
  }

       //SECTION - Bắt đầu vào trang
       useEffect(() => {
        const getToken = async () => {
          const value = await AsyncStorage.getItem("userToken"); //Lấy token từ store
          if (value !== null) {
            const data = JSON.parse(value);
            setTokenUser(data)
            const values = {id:idSub, token: data} 
            dispatch(getDataMedicalById(values))
          }
        };
        getToken();
      }, []);


  return (
    <KeyboardAwareScrollView extraScrollHeight={100} enableOnAndroid={true} enableAutomaticScroll={true} style={{height:windowHeight,width:windowWidth,backgroundColor:"white"}}>
    <View style={styles.container}>
        <StatusBar/>
        <Header handleLeftButton={()=>navigation.goBack()} namePage={'Chi tiết ca dịch vụ'} nameLeftIcon={'chevron-left'}/>
        <ScrollView style={{ flex: 1, width: '100%' }}>
          <View style={{justifyContent:"center",alignItems:'center',paddingTop:20,paddingBottom:20}}>
            <Text style={{fontSize:20,fontWeight:'600',color:themes.green}}>CA DỊCH VỤ</Text>
            <Text style={{fontSize:14,fontWeight:'600',color:themes.green,marginBottom:4}}>(Thanh toán trực tiếp)</Text>
            <Text style={{fontSize:14,fontWeight:'600',color:themes.green}}>{convertISOtoDDMMYYYY(medicalDetails.startDate)}</Text>
            <Text style={{fontSize:14,fontWeight:'600'}}>(✿‿✿)</Text>
          </View>
          <View style={{width:"100%",paddingTop:10,paddingBottom:10,alignItems:"center",paddingLeft:"5%",paddingRight:'5%'}}>
            <View style={{width:'100%',marginBottom:10}}>
              <Text style={{fontSize:16,fontWeight:"600",color:themes.green}}>Thông tin điều dưỡng</Text>
            </View>
            <View style={{paddingTop:10,
                          paddingBottom:10,
                          width:'100%',
                          paddingLeft:"5%",
                          paddingRight:'5%',
                          backgroundColor:'white',
                          borderColor:themes.gray,
                          borderRadius:10,
                          shadowColor: '#000', 
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.25,
                          shadowRadius: 3,
                          elevation: 5, 
                                  }}>
              <View style={styles.item}>
                <View style={{width:"30%"}}>
                  <Text style={styles.innerLeftText}>Tên</Text>
                </View>
                <View style={{width:"70%"}}>
                  <Text style={styles.innerRightText}>{medicalDetails.nurseId?.fullname}</Text>
                </View>
              </View>
              <View style={styles.item}>
                <View style={{width:"30%"}}>
                  <Text style={styles.innerLeftText}>Tuổi</Text>
                </View>
                <View style={{width:"70%"}}>
                  <Text style={styles.innerRightText}>22</Text>
                </View>
              </View>
              <View style={styles.item}>
                <View style={{width:"30%"}}>
                  <Text style={styles.innerLeftText}>Giới tính</Text>
                </View>
                <View style={{width:"70%"}}>
                  <Text style={styles.innerRightText}>Nam</Text>
                </View>
              </View>
              <View style={styles.item}>
                <View style={{width:"30%"}}>
                  <Text style={styles.innerLeftText}>SDT</Text>
                </View>
                <View style={{width:"70%"}}>
                  <Text style={styles.innerRightText}>0382823788</Text>
                </View>
              </View>
            </View>
              
          </View>

          {/* //SECTION - Patient */}
          <View style={{width:"100%",paddingTop:10,paddingBottom:10,alignItems:"center",paddingLeft:"5%",paddingRight:'5%'}}>
            <View style={{width:'100%',marginBottom:10}}>
              <Text style={{fontSize:16,fontWeight:"600",color:themes.green}}>Thông tin khách hàng</Text>
            </View>
            <View style={{paddingTop:10,
                          paddingBottom:10,
                          width:'100%',
                          paddingLeft:"5%",
                          paddingRight:'5%',
                          backgroundColor:'white',
                          borderColor:themes.gray,
                          borderRadius:10,    shadowColor: '#000', 
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.25,
                          shadowRadius: 3,
                          elevation: 5, }}>
              <View style={styles.item}>
                <View style={{width:"30%"}}>
                  <Text style={styles.innerLeftText}>Tên</Text>
                </View>
                <View style={{width:"70%"}}>
                  <Text style={styles.innerRightText}>{medicalDetails.userId?.fullname}</Text>
                </View>
              </View>
              <View style={styles.item}>
                <View style={{width:"30%"}}>
                  <Text style={styles.innerLeftText}>Tuổi</Text>
                </View>
                <View style={{width:"70%"}}>
                  <Text style={styles.innerRightText}>22</Text>
                </View>
              </View>
              <View style={styles.item}>
                <View style={{width:"30%"}}>
                  <Text style={styles.innerLeftText}>Giới tính</Text>
                </View>
                <View style={{width:"70%"}}>
                  <Text style={styles.innerRightText}>Nam</Text>
                </View>
              </View>
              <View style={styles.item}>
                <View style={{width:"30%"}}>
                  <Text style={styles.innerLeftText}>SDT</Text>
                </View>
                <View style={{width:"70%"}}>
                  <Text style={styles.innerRightText}>0382823788</Text>
                </View>
              </View>
              <View style={styles.item}>
                <View style={{width:"30%"}}>
                  <Text style={styles.innerLeftText}>Ghi chú</Text>
                </View>
                <View style={{width:"70%"}}>
                  <Text style={styles.innerRightText}>{medicalDetails?.note}</Text>
                </View>
              </View>
            </View>
              
          </View>
          {/* //!SECTION */}

          {/* //SECTION - Booking information */}
          <View style={{width:"100%",paddingTop:10,paddingBottom:10,alignItems:"center",paddingLeft:"5%",paddingRight:'5%'}}>
            <View style={{width:'100%',marginBottom:10}}>
              <Text style={{fontSize:16,fontWeight:"600",color:themes.green}}>Thông tin dịch vụ</Text>
            </View>

            <View style={styles.containerItem}>
              <View style={{width:'10%'}}>
                <Feather name={'clipboard'} size={20} color={themes.green}/>
              </View>
              <View style={{width:'80%'}}>
                <Text style={{fontSize:15,fontWeight:'600',color:themes.green}}>Loại dịch vụ</Text>
                <Text style={{fontWeight:"500",color:'gray'}}>{medicalDetails.subServiceId?.serviceId.name}</Text>
              </View>
            </View>
            <View style={styles.containerItem}>
              <View style={{width:'10%'}}>
                <Feather name={'clipboard'} size={20} color={themes.green}/>
              </View>
              <View style={{width:'80%'}}>
                <Text style={{fontSize:15,fontWeight:'600',color:themes.green}}>Tên dịch vụ</Text>
                <Text style={{fontWeight:"500",color:'gray'}}>{medicalDetails.subServiceId?.name}</Text>
              </View>
            </View>
            <View style={styles.containerItem}>
              <View style={{width:'10%'}}>
                <Feather name={'clock'} size={20} color={themes.green}/>
              </View>
              <View style={{width:'80%'}}>
                <Text style={{fontSize:15,fontWeight:'600',color:themes.green}}>Ngày và giờ</Text>
                <Text style={{fontWeight:"500",color:'gray'}}>{convertISOtoDDMMYYYY(medicalDetails?.startDate)} | {convertISOTo24hr(medicalDetails.startDate)}</Text>
              </View>
            </View>
            <View style={styles.containerItem}>
              <View style={{width:'10%'}}>
                <Fontisto name={'shopping-sale'} size={20} color={themes.green}/>
              </View>
              <View style={{width:'80%'}}>
                <Text style={{fontSize:15,fontWeight:'600',color:themes.green}}>Mã giảm giá</Text>
                <Text style={{fontWeight:"500",color:'gray'}}>{medicalDetails.discountCode?.code}</Text>
              </View>
            </View>
            
            {/* <View style={{styles.containerItem}}>
              <View style={{width:'10%'}}>
                <FontAwesome name={'money'} size={20} color={themes.green}/>
              </View>
              <View style={{width:'80%'}}>
                <Text style={{fontSize:15,fontWeight:'600',color:themes.green}}>Tổng thanh toán</Text>
                <Text style={{fontWeight:"500",color:'gray'}}>{medicalDetails.totalAfterDiscount}</Text>
              </View>
            </View> */}

            <View style={styles.containerItem}>
              <View style={{width:'10%'}}>
                <FontAwesome name={'money'} size={20} color={themes.green}/>
              </View>
              <View style={{width:'80%'}}>
                <Text style={{fontSize:15,fontWeight:'600',color:themes.green}}>Thông tin thanh toán</Text>
                <Text style={{fontSize:13,fontWeight:'500',color:'gray',marginTop:6}}>{`Chi phí dịch vụ : ${medicalDetails?.totalPrice} đ`}</Text>
                <Text style={{fontSize:13,fontWeight:'500',color:'gray',marginTop:6}}>{`Giảm giá : ${medicalDetails?.totalPrice - medicalDetails?.totalAfterDiscount} đ`}</Text>
                <Text style={{fontSize:14,fontWeight:'600',color:themes.green,marginTop:6}}>{`Tổng thanh toán : ${medicalDetails?.totalAfterDiscount} đ`}</Text>
              </View>
            </View>
          </View>
          {/* //!SECTION */}


          {/* //SECTION - Nurse note */}
          <View style={{width:"100%",paddingTop:0,paddingBottom:10,alignItems:"center",paddingLeft:"5%",paddingRight:'5%'}}>
            <View style={{width:'100%'}}>
              <Text style={{fontSize:16,fontWeight:"600",color:themes.green}}>Điều dưỡng ghi chú thêm</Text>
            </View>
            <View style={{paddingTop:10,paddingBottom:10,width:"100%",borderRadius:10,}}>
              <View style={{width:"100%",flexDirection:"row",borderRadius:10,backgroundColor:"white",shadowColor: '#000', 
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 3,
                            elevation: 5, }}>
                <AutoGrowingTextInput
                  style={styles.textInput}
                  placeholder="Ghi chú"
                  minHeight={80}
                  maxHeight={200}
                  onChangeText={(text) =>   setTempMedicalDetails({
                                              ...tempMedicalDetails,
                                              noteForNurse: text
                                            })}
                  // color={'gray'}
                  fontWeight={'400'}
                  value={tempMedicalDetails.noteForNurse}
                />
                <View style={{width:"20%",borderTopRightRadius:10,borderBottomRightRadius:10,justifyContent:"center",alignItems:'center'}}>
                  {
                    tempMedicalDetails.noteForNurse !== medicalDetails.noteForNurse ? 
                    (
                      <TouchableOpacity onPress={handleUpdateNoteForNurse}>
                        <Text style={{fontWeight:"500",color:themes.green}}>Lưu</Text>
                      </TouchableOpacity>
                    )
                    :
                    (
                      <View>
                        <Text style={{fontWeight:"500",color:themes.gray}}>Lưu</Text>
                      </View>
                    )
                  }

                  
                </View>
              </View>

            </View>
          </View>
          {/* //!SECTION */}
          
          <View style={{height:200}}></View>
        </ScrollView>

      {user.role == 'nurse' && (
        medicalDetails.status == 'waiting' ? (
          <View style={styles.bottomTab}>
          <TouchableOpacity onPress={()=>handleChangeStatus('cancelled')} style={{height:'70%',width:'46%',backgroundColor:themes.red,borderRadius:10,justifyContent:"center",alignItems:"center"}}>
            <Text style={{fontSize:16,fontWeight:'600',color:'white'}}>Từ chối</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>handleChangeStatus('happening')} style={{height:'70%',width:'46%',backgroundColor:themes.green,borderRadius:10,justifyContent:"center",alignItems:"center"}}>
            <Text style={{fontSize:16,fontWeight:'600',color:'white'}}>Xác nhận</Text>
          </TouchableOpacity>
      </View>
        )
        :(
        <View style={styles.bottomTab}>
          <TouchableOpacity onPress={()=>handleChangeStatus('cancelled')} style={{height:'70%',width:'46%',backgroundColor:themes.red,borderRadius:10,justifyContent:"center",alignItems:"center"}}>
            <Text style={{fontSize:16,fontWeight:'600',color:'white'}}>Hủy ca</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>handleChangeStatus('completed')} style={{height:'70%',width:'46%',backgroundColor:themes.green,borderRadius:10,justifyContent:"center",alignItems:"center"}}>
            <Text style={{fontSize:16,fontWeight:'600',color:'white'}}>Kết thúc ca</Text>
          </TouchableOpacity>
      </View>
        )
      )}
      {user.role == 'user' && (
      <View style={styles.bottomTab}>
        <TouchableOpacity onPress={()=>handleChangeStatus('cancelled')} style={{height:'70%',width:'46%',backgroundColor:themes.red,borderRadius:10,justifyContent:"center",alignItems:"center"}}>
          <Text style={{fontSize:16,fontWeight:'600',color:'white'}}>Hủy ca</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleChangeStatus('completed')} style={{height:'70%',width:'46%',backgroundColor:themes.green,borderRadius:10,justifyContent:"center",alignItems:"center"}}>
          <Text style={{fontSize:16,fontWeight:'600',color:'white'}}>Đã thanh toán</Text>
        </TouchableOpacity>
      </View>
      )}
    </View>
    </KeyboardAwareScrollView>
  )
}

export default MedicalDetails

const styles = StyleSheet.create({
    container:{
        height:windowHeight,
        width:windowWidth,
        position:"relative",
    },
    innerRightText:{
      color:'gray',
      fontWeight:"500",
      lineHeight:30
    },
    innerLeftText:{
      fontWeight:'600',
      color:themes.green,
      lineHeight:30
    },
    item:{
      flexDirection:"row",
      marginBottom:6,
      
    },
    bottomTab:{
      position:"absolute",
      bottom:0,
      height:'8%',
      width:"100%",
      backgroundColor:"white",
      flexDirection:'row',
      justifyContent:"space-evenly",
      alignItems:"center"
    },
    textInput: {
      width: '80%',
      paddingLeft:'5%',
      paddingRight:'5%',
      paddingTop:10,
      paddingBottom:10,
      borderRadius:10,
      
    },
    containerItem:{
      paddingTop:10,
      paddingBottom:10,
      width:"100%",
      marginBottom:10,
      backgroundColor:"white",
      borderRadius:10,
      flexDirection:"row",
      paddingLeft:"5%",
      paddingRight:"5%",
      shadowColor: '#000', 
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3,
      elevation: 5, 
    }
})