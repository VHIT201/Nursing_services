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
import { useSelector,useDispatch } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createRelativeUser, } from "../../redux/slices/relativeSlice";
import { getRelativeUser,editRelativeUser,getRelativeUserData,deleteRelativeUser } from "../../redux/slices/relativeSlice";
import RelativeItem from "../../components/ListRelative/ItemRelative";
import Loading from "../../components/Progress/Loading";
import Input from "../../components/textInput/TextInput";
import Notification from "../../components/Notification/Notification";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const RelativeInfomation = ({navigation}) => {
      //redux
  const dispatch = useDispatch()
  const [modalVisible,setModalVisible] = useState(false)
  const [modalPickGender, setModalPickGender] = useState(false)

  
    //data user redux
    const userDataRedux = useSelector((state) => state.user)
   
    // console.log('data user : ',userDataRedux)
    const {dataRelativeUser,RelativeUserDetails} = useSelector((state) => state.relative) //Danh sách / Chi tiết 1 người
    // console.log(RelativeUserDetails)
    const userRelativeRedux = useSelector((state) => state.relative)
    // console.log(userRelativeRedux)

const [tokenUser, setTokenUser] = useState({})
//List người thân
const [relatives, setRelatives] = useState([])
const [tempGender, setTempGender] = useState('');
// console.log(tempGender)
//1 người thân
const [relativesData, setRelativesData] = useState({})
const [tempData, setTempData] = useState(null)
const [tempData1, setTempData1] = useState(null)
const [IdCheckData,setIdCheckData] = useState(null)


//modal
const [modalRelativesData,setModalRelativesData] = useState(false)


//Lấy data 1 người thân
useEffect(() => {
  if(RelativeUserDetails){
    setRelativesData(RelativeUserDetails)
  }
}, [RelativeUserDetails]);

useEffect(() => {
  getToken()
}, []);
const getToken = async ()=>{
  const value = await AsyncStorage.getItem('userToken')
  if(value!== null){
    const data = JSON.parse(value)
    // console.log('Thông tin token : ',data)
    dispatch(getRelativeUser({token : data}))
    setTokenUser(data)
    setDataCreateRelative(prevDataCreateRelative => ({ ...prevDataCreateRelative, token : data }));
    

  }
}
const userRelativesData = async ()=>{
  const value = await AsyncStorage.getItem('relativeUserData')
  if(value!== null){
    const data = JSON.parse(value)
    // console.log('Thông tin người thân : ',data)
    setRelativesData(data)
    setTempData(data)

  }
  else {
    // console.log('Không có data')
  }
}


//NOTE - Xóa người thân
const hanldeDeleteRelative = () =>{
  // console.log(tempData._id)
  let id = relativesData._id;
  dispatch(deleteRelativeUser({id,tokenUser}))
  // userRelativesData();
  dispatch(getRelativeUser({token : tokenUser}))
  setModalRelativesData(false)
}


const handlePress = (item) => {
  // console.log(item)
  setIdCheckData(item)
  

  // setIdCheckData(null)
}

//lấy data người thân
useEffect(() => {
  if(IdCheckData!=null){
    dispatch(getRelativeUserData(IdCheckData))
    // console.log('người thân data : ',relativesData)
  }
}, [IdCheckData]);


useEffect(() => {
  dispatch(getRelativeUser({token : tokenUser}))
}, [modalRelativesData]);


//SECTION -  hàm chọn xem thông tin 1 người thân
const handlePressItemRelative = (id) =>{
  // console.log(id)
  dispatch(getRelativeUserData(id))
  setModalRelativesData(true)
}




  //data tạo người thân
  const [dataCreateRelative, setDataCreateRelative] = 
useState({  token: '',
            fullname : '',
            phoneNumber :'', 
            gender : 'Female',
            dateOfBirth: new Date(),
            email :'',
            address :'',
            bloodGroup : '',
            medicalHistory :''
             });







  const handleRelativeGender = (text) => {
  setRelativesData(prevRelativesData => ({ ...prevRelativesData, gender : text }));
}


  // Ngày sinh nhật
  const [date, setDate] = useState(new Date())
  const [datePicker, setDatePicker] = useState(new Date());
  const [datePicker1, setDatePicker1] = useState(new Date());
  const [openModalDatePicker, setOpenModalDatePicker] = useState(false)
  const [openModalDatePicker1, setOpenModalDatePicker1] = useState(false)
  const hanldeModalDatapicker = ()=>{
    setOpenModalDatePicker(true)
  }
  const hanldeModalDatapicker1 = ()=>{
    setOpenModalDatePicker1(true)
  }
  //biến giữ giá trị sn datePicker
  // console.log(moment(datePicker).format('YYYY-MM-DD'))


  const onChangeDatePicker = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDatePicker(currentDate);
    setOpenModalDatePicker(false)
    setDataCreateRelative(prevDataCreateRelative => ({ ...prevDataCreateRelative, dateOfBirth:  moment(datePicker).format('YYYY-MM-DD')}));
    // console.log(dataCreateRelative)
}
  const onChangeDatePicker1 = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDatePicker1(currentDate);
    setOpenModalDatePicker1(false)
    setTempData(prevTempData => ({ ...prevTempData, dateOfBirth:  moment(datePicker1).format('YYYY-MM-DD')}));

}

  const handleCreateRelative = () =>{
    // console.log('Data người thân : ',dataCreateRelative)
    dispatch(createRelativeUser(dataCreateRelative))
    setModalVisible(false)
    // userRelativesData();
    dispatch(getRelativeUser({token : tokenUser}))
    setModalRelativesData(false)
  }
 
  const openDrawer = ()=>{
    navigation.openDrawer()
  }
  const handleLeftButton =()=>{
    setModalVisible(false)
    dispatch(getRelativeUser({token : tokenUser}))
  }
  //SECTION -  Hàm sửa data
  const handleChangeRelative = ()=>{
    // console.log('relativesData : ',relativesData)
    dispatch(editRelativeUser(relativesData))
    // userRelativesData();
    dispatch(getRelativeUser({token : tokenUser}))
    setModalRelativesData(false)
  }

  useEffect(() => {
    getRelativeUser({token : tokenUser})
  }, []);

  const handleGender = () =>{
    if(tempGender === 'Male'){
      setRelativesData(prevRelativesData => ({ ...prevRelativesData, gender : 'Female' }))
      setModalPickGender(false)
    }
    else{
      setRelativesData(prevRelativesData => ({ ...prevRelativesData, gender : 'Male' }))
      setModalPickGender(false)
    }
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
 {/* //SECTION - Người thân */}
              {
                dataRelativeUser.map(item => (
                  <RelativeItem
                    key={item._id}
                    item={item}
                    handlePress={()=>handlePressItemRelative(item._id)}
                    
                  />
))
              }
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
              <View style={{height:40,width:"100%"}}>
                <Input 
                  value={dataCreateRelative.fullname} 
                  onChangeText={(text)=> setDataCreateRelative(prevDataCreateRelative => ({ ...prevDataCreateRelative, fullname : text }))} 
                  placeholder="Họ và tên"  height={'100%'} width={'100%'} isTrue={true} leftIconName={'user'}/>
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
                <View style={{borderWidth:1,height:34,width:"100%",paddingLeft:'4%',paddingRight:"4%",justifyContent:"space-between",alignItems:"center",flexDirection:"row",paddingRight:'10%'}}>
                  <Text>{dataCreateRelative? '' : dataCreateRelative.dateOfBirth}</Text>
                  <TouchableOpacity onPress={hanldeModalDatapicker}>
                    <AntDesign name={'calendar'} size={20} color={themes.green}/>
                  </TouchableOpacity>
                </View>
                
              </View>
            </View>
            <View style={{width:'100%',paddingLeft:"5%",paddingRight:'5%',gap:4,marginTop:10}}>
              <Text style={styles.text}>Số điện thoại</Text>
              <View style={{height:40,width:"100%"}}>
                <Input  
                  value={dataCreateRelative.phoneNumber} 
                  onChangeText={(text) =>  setDataCreateRelative(prevDataCreateRelative => ({ ...prevDataCreateRelative, phoneNumber : text }))} 
                  placeholder="Số điện thoại"  height={'100%'} width={'100%'} isTrue={true} leftIconName={'phone'}/>
              </View>
            </View>
            <View style={{width:'100%',paddingLeft:"5%",paddingRight:'5%',gap:4,marginTop:10}}>
              <Text style={styles.text}>Email</Text>
              <View style={{height:40,width:"100%"}}>
                <Input  
                  value={dataCreateRelative.email} 
                  onChangeText={(text) =>  setDataCreateRelative(prevDataCreateRelative => ({ ...prevDataCreateRelative, email : text }))} 
                  placeholder="Email"  height={'100%'} width={'100%'} isTrue={true} leftIconName={'mail'}/>
              </View>
            </View>
            <View style={{width:'100%',paddingLeft:"5%",paddingRight:'5%',gap:4,marginTop:10}}>
              <Text style={styles.text}>Địa chỉ</Text>
              <View style={{height:40,width:"100%"}}>
                <Input  
                  value={dataCreateRelative.address} 
                  onChangeText={(text) =>  setDataCreateRelative(prevDataCreateRelative => ({ ...prevDataCreateRelative, address : text }))} 
                  placeholder="Địa chỉ"  height={'100%'} width={'100%'} isTrue={true} leftIconName={'map-pin'}/>
              </View>
            </View>
            <View style={{width:'100%',paddingLeft:"5%",paddingRight:'5%',gap:4,marginTop:10}}>
              <Text style={styles.text}>Nhóm máu</Text>
              <View style={{height:40,width:"100%"}}>
                <Input  
                  value={dataCreateRelative.bloodGroup} 
                  onChangeText={(text) =>  setDataCreateRelative(prevDataCreateRelative => ({ ...prevDataCreateRelative, bloodGroup : text }))} 
                  placeholder="Nhóm máu"  height={'100%'} width={'100%'} isTrue={true} leftIconName={'user'}/>
              </View>
            </View>
            <View style={{width:'100%',paddingLeft:"5%",paddingRight:'5%',gap:4,marginTop:10}}>
              <Text style={styles.text}>Tiểu sử bệnh</Text>
              <View style={{height:40,width:"100%"}}>
                <Input  
                  value={dataCreateRelative.medicalHistory} 
                  onChangeText={(text) =>  setDataCreateRelative(prevDataCreateRelative => ({ ...prevDataCreateRelative, medicalHistory : text }))} 
                  placeholder="Tiểu sử bệnh"  height={'100%'} width={'100%'} isTrue={true} leftIconName={'list'}/>
              </View>
            </View>
            
            <View style={{height:200,width:"100%",alignItems:"center",justifyContent:"flex-start",paddingTop:"10%"}}>
              <TouchableOpacity onPress={handleCreateRelative} style={{height:"30%",width:'90%',backgroundColor:themes.green,justifyContent:"center",alignItems:"center",borderRadius:10}}>
                <Text style={{fontSize:16,fontWeight:"500",color:'white'}}>Tạo người thân</Text>
              </TouchableOpacity>
            </View>
            
            {openModalDatePicker && (
            <DateTimePicker
              value={datePicker}
              mode={'date'}
              display="calendar"
              onChange={onChangeDatePicker}
            />
      )}
          
            </KeyboardAwareScrollView>

          

        </View>)
      }
      {/* //NOTE - show thông tin người thân và sửa */}
      {
        modalRelativesData && 
        (<View style={styles.modal}>
          <Header namePage={'Thông tin người thân'} nameLeftIcon={'chevron-left'} handleLeftButton={()=>[setModalRelativesData(false),setIdCheckData(null)]}/>
            <KeyboardAwareScrollView enableOnAndroid={true} enableAutomaticScroll={true} extraScrollHeight={200} style={{flex:1,width:"100%",backgroundColor:'white'}}>
            <View style={{height:100,width:'100%',justifyContent:"center",alignItems:"center"}}>
              <View style={{height:"80%",width:'20%'}}>
                <Image style={{height:"100%",width:"100%"}} resizeMode="contain" source={require('../../assets/Icon/user.png')}/>
              </View>
            </View>
            <View style={{width:'100%', alignItems:"center",height:20}}>
              <Text style={{fontSize:18,fontWeight:"500",lineHeight:20}}>{relativesData.fullname}</Text>
            </View>
            <View style={{width:'100%',paddingLeft:"5%",paddingRight:'5%',gap:4,marginTop:10}}>
              <Text style={styles.text}>Họ & tên</Text>
              <View style={{height:40,width:"100%"}}>
                {/* <TextInput value={relativesData.fullname} 
                  onChangeText={(text)=> setRelativesData(prevRelativesData => ({ ...prevRelativesData, fullname : text }))} style={{height:'100%',width:"100%"}} 
                  placeholder="Họ và tên"></TextInput> */}
                <Input  value={relativesData.fullname} onChangeText={(text)=> setRelativesData(prevRelativesData => ({ ...prevRelativesData, fullname : text }))} 
                placeholder="Họ và tên"  height={'100%'} width={'100%'} isTrue={true} leftIconName={'user'}/>
              </View>
            </View>
            <View style={{width:'100%',paddingLeft:"5%",paddingRight:'5%',gap:4,marginTop:10,flexDirection:"row",justifyContent:"space-between"}}>
            <View style={{ width: "40%", gap: 4, position:'relative' }}>
              <Text style={[styles.text,{marginBottom:6}]}>Giới tính</Text>
              <TouchableOpacity
                onPress={()=>setModalPickGender(!modalPickGender)}
                style={{
                  position: "relative",
                  height: 40,
                  width: "100%",
                  // paddingLeft: "10%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  borderRadius:10,
                  backgroundColor:"white",
                  position:'relative'
                }}
              >
                <FontAwesome style={{marginLeft:'10%'}} name="intersex" size={16} color={themes.green}/>
                <Text style={{marginLeft:10,fontSize:14,fontWeight:'500'}}>{relativesData.gender === 'Male' ? 'Nam' : 'Nữ'}</Text>

                
              </TouchableOpacity>
              {
                modalPickGender === true && 
                  (
                    <TouchableOpacity onPress={handleGender} style={{height:40,width:'100%',flexDirection: "row",
                      alignItems: "center",position:'absolute',backgroundColor:"white",borderRadius:10,top:'104%',zIndex:2,backgroundColor:"white",}}>
                      <FontAwesome style={{marginLeft:'10%'}} name="intersex" size={16} color={themes.gray}/>
                      <Text style={{marginLeft:10,fontSize:14,fontWeight:'500'}}>{relativesData.gender === 'Male' ? 'Nữ' : 'Nam'}</Text>
                  </TouchableOpacity>
                  )
              }
              
            </View>
            <View style={{width:"50%",gap:4}}>
              <Text style={styles.text}>Ngày sinh</Text>
                <View style={{height:40,width:"100%",justifyContent:"flex-start",alignItems:"center",flexDirection:"row",paddingRight:'10%'}}>
                  <TouchableOpacity style={{marginRight:'5%'}} onPress={hanldeModalDatapicker1}>
                    <AntDesign name={'calendar'} size={20} color={themes.green}/>
                  </TouchableOpacity>
                  <Text>{relativesData && moment(relativesData.dateOfBirth).format('DD-MM-YYYY')}</Text>
                  
                </View>
                
              </View>
            </View>
            <View style={{width:'100%',paddingLeft:"5%",paddingRight:'5%',gap:4,marginTop:10}}>
              <Text style={styles.text}>Số điện thoại</Text>
              <View style={{height:40,width:"100%"}}>
                {/* <TextInput value={relativesData.phoneNumber} onChangeText={(text)=> setRelativesData(prevRelativesData => ({ ...prevRelativesData, phoneNumber : text }))} style={{height:'100%',width:"100%"}} placeholder="Số điện thoại"></TextInput> */}
                <Input  value={relativesData.phoneNumber} onChangeText={(text)=> setRelativesData(prevRelativesData => ({ ...prevRelativesData, phoneNumber : text }))} 
                placeholder="Số điện thoại"  height={'100%'} width={'100%'} isTrue={true} leftIconName={'phone'}/>
              </View>
            </View>
            <View style={{width:'100%',paddingLeft:"5%",paddingRight:'5%',gap:4,marginTop:10}}>
              <Text style={styles.text}>Email</Text>
              <View style={{height:40,width:"100%"}}>
                {/* <TextInput value={relativesData.email} onChangeText={(text) =>  setRelativesData(prevRelativesData => ({ ...prevRelativesData, email: text }))} style={{height:'100%',width:"100%"}} placeholder="Email"></TextInput> */}
                <Input  value={relativesData.email} onChangeText={(text) =>  setRelativesData(prevRelativesData => ({ ...prevRelativesData, email: text }))} 
                placeholder="Email"  height={'100%'} width={'100%'} isTrue={true} leftIconName={'mail'}/>
              </View>
            </View>
            <View style={{width:'100%',paddingLeft:"5%",paddingRight:'5%',gap:4,marginTop:10}}>
              <Text style={styles.text}>Địa chỉ</Text>
              <View style={{height:40,width:"100%"}}>
                {/* <TextInput value={relativesData.address} onChangeText={(text)=> setRelativesData(prevRelativesData => ({ ...prevRelativesData, address : text }))} style={{height:'100%',width:"100%"}} placeholder="Địa chỉ"></TextInput> */}
                <Input  value={relativesData.address} onChangeText={(text) =>  setRelativesData(prevRelativesData => ({ ...prevRelativesData, address: text }))} 
                placeholder="Email"  height={'100%'} width={'100%'} isTrue={true} leftIconName={'mail'}/>
              </View>
            </View>
            <View style={{width:'100%',paddingLeft:"5%",paddingRight:'5%',gap:4,marginTop:10}}>
              <Text style={styles.text}>Nhóm máu</Text>
              <View style={{height:40,width:"100%"}}>
                {/* <TextInput value={relativesData.bloodGroup} onChangeText={(text)=> setRelativesData(prevRelativesData => ({ ...prevRelativesData, bloodGroup : text }))} style={{height:'100%',width:"100%"}} placeholder="Nhóm máu"></TextInput> */}
                <Input  value={relativesData.bloodGroup} onChangeText={(text) =>  setRelativesData(prevRelativesData => ({ ...prevRelativesData, bloodGroup: text }))} 
                placeholder="Email"  height={'100%'} width={'100%'} isTrue={true} leftIconName={'mail'}/>
              </View>
            </View>
            <View style={{width:'100%',paddingLeft:"5%",paddingRight:'5%',gap:4,marginTop:10}}>
              <Text style={styles.text}>Tiểu sử bệnh</Text>
              <View style={{height:40,width:"100%"}}>
                {/* <TextInput value={relativesData.medicalHistory} onChangeText={(text)=> setRelativesData(prevRelativesData => ({ ...prevRelativesData, medicalHistory : text }))} style={{height:'100%',width:"100%"}} placeholder="Tiểu sử bệnh"></TextInput> */}
                <Input  value={relativesData.medicalHistory} onChangeText={(text) =>  setRelativesData(prevRelativesData => ({ ...prevRelativesData, medicalHistory: text }))} 
                placeholder="Email"  height={'100%'} width={'100%'} isTrue={true} leftIconName={'mail'}/>
              </View>
            </View>
            
            <View style={{height:200,width:"100%",alignItems:"center",justifyContent:"flex-start",paddingTop:"10%"}}>
              <TouchableOpacity onPress={handleChangeRelative} style={{height:"30%",width:'90%',backgroundColor:themes.green,justifyContent:"center",alignItems:"center",borderRadius:10}}>
                <Text style={{fontSize:16,fontWeight:"500",color:'white'}}>Lưu thay đổi</Text>
              </TouchableOpacity>
              <View style={{height:20}}></View>
              <TouchableOpacity onPress={hanldeDeleteRelative} style={{height:"30%",width:'90%',backgroundColor:'#f4495d',justifyContent:"center",alignItems:"center",borderRadius:10}}>
                <Text style={{fontSize:16,fontWeight:"500",color:'white'}}>Xóa người thân</Text>
              </TouchableOpacity>
            </View>
            
            {openModalDatePicker1 && (
            <DateTimePicker
              value={datePicker1}
              mode={'date'}
              display="calendar"
              onChange={onChangeDatePicker1}
            />
      )}
          
            </KeyboardAwareScrollView>

          

        </View>)
      }
      {
        userRelativeRedux.loading && 
        (<View style={styles.modal}>
          <Loading/>
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