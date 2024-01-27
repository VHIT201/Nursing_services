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
import { getDataMedicalById } from "../../redux/slices/medicalCaseSlice";
import { getInfoUser } from "../../redux/slices/userSlice";
import { useSelector,useDispatch } from 'react-redux';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MedicalDetails = ({ route,navigation }) => {
  const [nurseNote,setNurseNote] = useState(medicalDetails?.noteForNurse)
  const { idSub } = route.params;
  // console.log(idSub)
  const dispatch = useDispatch()
  const {medicalDetails} = useSelector((state) => state.medicals)
  const {user} = useSelector((state) => state.user)
  // console.log('Đây là role ', user.role)
  // console.log('vãi lài : ', medicalDetails);

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
            const values = {id:idSub, token: data} 
              dispatch(getDataMedicalById(values))
              
          }
        };
        getToken();
      }, []);

  return (
    <KeyboardAwareScrollView extraScrollHeight={100} enableOnAndroid={true} enableAutomaticScroll={true} style={{height:windowHeight,width:windowWidth}}>
    <View style={styles.container}>
        <StatusBar/>
        <Header handleLeftButton={()=>navigation.goBack()} namePage={'Chi tiết ca dịch vụ'} nameLeftIcon={'chevron-left'}/>
        <ScrollView style={{ flex: 1, width: '100%' }}>
          <View style={{justifyContent:"center",alignItems:'center',paddingTop:20,paddingBottom:20}}>
            <Text style={{fontSize:20,fontWeight:'600',color:themes.green}}>CA DỊCH VỤ BH123</Text>
            <Text style={{fontSize:14,fontWeight:'600',color:themes.green}}>(Thanh toán trực tiếp)</Text>
            <Text style={{fontSize:14,fontWeight:'600',color:themes.green}}>Số: 1234567</Text>
            <Text style={{fontSize:14,fontWeight:'600'}}>(✿‿✿)</Text>
          </View>
          <View style={{width:"100%",paddingTop:10,paddingBottom:10,alignItems:"center",paddingLeft:"5%",paddingRight:'5%'}}>
            <View style={{width:'100%',marginBottom:10}}>
              <Text style={{fontSize:16,fontWeight:"600",color:themes.green}}>Thông tin điều dưỡng</Text>
            </View>
            <View style={{paddingTop:10,paddingBottom:10,width:'100%',paddingLeft:"5%",paddingRight:'5%',backgroundColor:'white',borderColor:themes.gray,borderRadius:10}}>
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
            <View style={{paddingTop:10,paddingBottom:10,width:'100%',paddingLeft:"5%",paddingRight:'5%',backgroundColor:'white',borderColor:themes.gray,borderRadius:10}}>
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

            <View style={{paddingTop:10,paddingBottom:10,marginBottom:10,width:"100%",backgroundColor:"white",borderRadius:10,flexDirection:"row",paddingLeft:"5%",paddingRight:"5%"}}>
              <View style={{width:'10%'}}>
                <Feather name={'clipboard'} size={20} color={themes.green}/>
              </View>
              <View style={{width:'80%'}}>
                <Text style={{fontSize:15,fontWeight:'600',color:themes.green}}>Loại dịch vụ</Text>
                <Text style={{fontWeight:"500",color:'gray'}}>{medicalDetails.subServiceId?.serviceId.name}</Text>
              </View>
            </View>
            <View style={{paddingTop:10,paddingBottom:10,width:"100%",marginBottom:10,backgroundColor:"white",borderRadius:10,flexDirection:"row",paddingLeft:"5%",paddingRight:"5%"}}>
              <View style={{width:'10%'}}>
                <Feather name={'clipboard'} size={20} color={themes.green}/>
              </View>
              <View style={{width:'80%'}}>
                <Text style={{fontSize:15,fontWeight:'600',color:themes.green}}>Tên dịch vụ</Text>
                <Text style={{fontWeight:"500",color:'gray'}}>{medicalDetails.subServiceId?.name}</Text>
              </View>
            </View>
            <View style={{paddingTop:10,paddingBottom:10,width:"100%",marginBottom:10,backgroundColor:"white",borderRadius:10,flexDirection:"row",paddingLeft:"5%",paddingRight:"5%"}}>
              <View style={{width:'10%'}}>
                <Feather name={'clock'} size={20} color={themes.green}/>
              </View>
              <View style={{width:'80%'}}>
                <Text style={{fontSize:15,fontWeight:'600',color:themes.green}}>Ngày và giờ</Text>
                <Text style={{fontWeight:"500",color:'gray'}}>{convertISOtoDDMMYYYY(medicalDetails?.startDate)} | {convertISOTo24hr(medicalDetails.startDate)}</Text>
              </View>
            </View>
            <View style={{paddingTop:10,paddingBottom:10,width:"100%",marginBottom:10,backgroundColor:"white",borderRadius:10,flexDirection:"row",paddingLeft:"5%",paddingRight:"5%"}}>
              <View style={{width:'10%'}}>
                <Fontisto name={'shopping-sale'} size={20} color={themes.green}/>
              </View>
              <View style={{width:'80%'}}>
                <Text style={{fontSize:15,fontWeight:'600',color:themes.green}}>Mã giảm giá</Text>
                <Text style={{fontWeight:"500",color:'gray'}}>{medicalDetails.discountCode?.code}</Text>
              </View>
            </View>
            {/* <View style={{paddingTop:10,paddingBottom:10,width:"100%",marginBottom:10,backgroundColor:"white",borderRadius:10,flexDirection:"row",paddingLeft:"5%",paddingRight:"5%"}}>
              <View style={{width:'10%'}}>
                <FontAwesome name={'money'} size={20} color={themes.green}/>
              </View>
              <View style={{width:'80%'}}>
                <Text style={{fontSize:15,fontWeight:'600',color:themes.green}}>Tổng thanh toán</Text>
                <Text style={{fontWeight:"500",color:'gray'}}>{medicalDetails.totalAfterDiscount}</Text>
              </View>
            </View> */}
            <View style={{paddingTop:15,paddingBottom:15,width:"100%",marginBottom:10,backgroundColor:"white",borderRadius:10,flexDirection:"row",paddingLeft:"5%",paddingRight:"5%"}}>
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
            <View style={{paddingTop:10,paddingBottom:10,width:"100%",borderRadius:10}}>
              <AutoGrowingTextInput
                style={styles.textInput}
                placeholder="Ghi chú"
                minHeight={80}
                maxHeight={200}
                onChangeText={(text) => setNurseNote(text)}
                value={nurseNote}
              />
            </View>
          </View>
          {/* //!SECTION */}
          
          <View style={{height:200}}></View>
        </ScrollView>

      {user.role == 'nurse' && (
        <View style={styles.bottomTab}>
          <TouchableOpacity style={{height:'70%',width:'46%',backgroundColor:themes.red,borderRadius:10,justifyContent:"center",alignItems:"center"}}>
            <Text style={{fontSize:16,fontWeight:'600',color:'white'}}>Hủy ca</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{height:'70%',width:'46%',backgroundColor:themes.green,borderRadius:10,justifyContent:"center",alignItems:"center"}}>
            <Text style={{fontSize:16,fontWeight:'600',color:'white'}}>Kết thúc ca</Text>
          </TouchableOpacity>
      </View>
      )}
      {user.role == 'user' && (
      <View style={styles.bottomTab}>
        <View style={{height:'70%',width:'46%',backgroundColor:themes.red,borderRadius:10,justifyContent:"center",alignItems:"center"}}>
          <Text style={{fontSize:16,fontWeight:'600',color:'white'}}>Hủy ca</Text>
        </View>
        <View style={{height:'70%',width:'46%',backgroundColor:themes.green,borderRadius:10,justifyContent:"center",alignItems:"center"}}>
          <Text style={{fontSize:16,fontWeight:'600',color:'white'}}>Đã thanh toán</Text>
        </View>
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
        position:"relative"
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
      width: '100%',
      borderColor: 'gray',
      paddingLeft:'5%',
      paddingRight:'5%',
      paddingTop:10,
      paddingBottom:10,
      borderRadius:10,
      backgroundColor:'white'
    },
})