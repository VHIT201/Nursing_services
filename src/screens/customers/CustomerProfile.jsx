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
import { useSelector,useDispatch } from 'react-redux';
import { getListServices, getListSubServices, getListSubServicesByIDService } from "../../redux/slices/servicesSlice";
import { getInfoUser, update, updatePassword, uploadPDF } from "../../redux/slices/userSlice";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Foundation from "react-native-vector-icons/Foundation";
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeSelectButton from "../../components/selectionbar/HomeSelectButton";
import dataService from "../../seeders/dataService";
import themes from "../../../themes";
import Header from "../../components/header/Header";
import Input from "../../components/textInput/TextInput";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
const CustomerProfile = ({navigation}) => {
      //dispatch
    const dispatch = useDispatch();

    //userData
     //redux
    const data = useSelector((state) => state.user.user);
    const [userDataRedux, setUserDataRedux] = useState(data)
    const error = useSelector((state) => state.user.error)
    const [tempAvatar, setTempAvatar] = useState("");
    const [tempGender, setTempGender] = useState(userDataRedux.gender);

    const [modalPickGender, setModalPickGender] = useState(false)
    const [tokenUser, setTokenUser] = useState({});

    const [dataUpdatePassword, setDataUpdatePassword] = useState({
        token: tokenUser,
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });

      const handleGender = () =>{
        if(tempGender === 'Male'){
          setTempGender('Female')
          setModalPickGender(false)
        }
        else{
          setTempGender('Male')
          setModalPickGender(false)
        }
      }
    //NOTE - Hàm xử lý update
    const handleUpdateUser = async () => {
        if(tempGender === 'Nam'){
          setUserDataRedux((prevUserDataRedux) => ({
            ...prevUserDataRedux,
            gender: 'Male',
          }))
        }
        else{
          setUserDataRedux((prevUserDataRedux) => ({
            ...prevUserDataRedux,
            gender: 'Female',
          }))
        }
        let dataUpdateUser = {
          token: tokenUser,
          fullname: userDataRedux.fullname,
          email: userDataRedux.email,
          gender: userDataRedux.gender,
          avatar: userDataRedux.avatar,
          birthOfDate: userDataRedux.birthOfDate,
          address: userDataRedux.address,
        };
    
        console.log("Thông tin update : ", dataUpdateUser);
        dispatch(update(dataUpdateUser))
        setTempAvatar('')
        dispatch(getInfoUser(tokenUser))
      };

       //SECTION - Bắt đầu vào trang
  useEffect(() => {
    console.log("bắt đầu tìm kiếm data")
    const getToken = async () => {
      const value = await AsyncStorage.getItem("userToken"); //Lấy token từ store
      if (value !== null) {
        const data = JSON.parse(value); 
        dispatch(getInfoUser(data))  // get info user
        setTokenUser(data);
        setDataUpdatePassword((prevDataUpdatePassword) => ({
          ...prevDataUpdatePassword,
          token: data,
        }));
      }
    };

    getToken();
    dispatch(getInfoUser(tokenUser))
  }, []);
  useEffect(() => {
    
  }, []);


        //NOTE - Sửa ảnh

  const uploadImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        const name = "avatar";
        const type = "image/png";
        const source = { uri, name, type };

        handleUpdata(source);
      }
    } catch (error) {
      console.log("Lỗi khi tải ảnh lên: " + error);
    }
  };

  //NOTE - hàm upload cloud viết tạm test
  const handleUpdata = (photo) => {
    const data = new FormData();
    data.append("image", photo);
    fetch("https://nursing-app-api.vercel.app/api/v1/upload", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // setPicture(data.url)
        console.log("có ảnh : ", data.data.path);
        setTempAvatar(data.data.path);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //NOTE - hàm upload pdf viết tạm test
  const handleUpPDF = (file) => {
    const data = new FormData();
    data.append("cv", file);
    fetch("https://nursing-app-api.vercel.app/api/v1/upload/pdf", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("có cv : ", data.data.path);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // State để lưu file PDF
  const [pdfFile, setPdfFile] = useState(null);

  const pickPDFFile = async () => {
    try {
      const docRes = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      const { name, uri, type, size } = docRes;

      const file = {
        name: name.split(".")[0],
        uri: uri,
        type: type,
        size: size,
      };
      console.log(file)
      handleUpPDF(file)
    } catch (error) {
      console.log(error);
    }
  };

  //NOTE - Sinh nhật
  // Ngày sinh nhật
  const [date, setDate] = useState(new Date());
  const [datePicker, setDatePicker] = useState(new Date());
  const [openModalDatePicker, setOpenModalDatePicker] = useState(false);
  const hanldeModalDatapicker = () => {
    setOpenModalDatePicker(true);
  };


  const onChangeDatePicker = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDatePicker(currentDate);
    setOpenModalDatePicker(false);
    setUser((prevUser) => ({ ...prevUser, dateOfBirth: currentDate }));
  };
  
  //NOTE - Hàm quay trở lại
  const handleLeftButton = () =>{
    navigation.goBack()
  }
  return (
    //SECTION - Container
    <View style={styles.container}>
        <StatusBar/>
        <Header handleLeftButton={handleLeftButton} namePage={'Chi tiết tài khoản'} nameLeftIcon={'chevron-left'}/>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          enableAutomaticScroll={true}
          style={{ flex: 1, width: "100%" }}
        >
          <View style={{ width: "100%", alignItems: "center",height:30 }}>
          </View>

          <View
            style={{
              height: 100,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                height: 100,
                overflow: "hidden",
                position: "relative",
                width: 100,
                borderRadius: 50,
                borderWidth: 2,
                borderColor: themes.gray,
                justifyContent: "center",
                alignItems: "center",
              }}
            >

              {/* //NOTE - ảnh đại diện */}
              <Image style={{height: 100, width: 100,borderRadius:50}} resizeMode="contain" source={tempAvatar === '' ? {uri: userDataRedux.avatar} :  {uri : tempAvatar}} />

              <TouchableOpacity
                onPress={uploadImage}
                style={{
                  height: "26%",
                  width: "100%",
                  position: "absolute",
                  bottom: 0,
                  backgroundColor: "rgba(156, 163, 175, 0.)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesome5
                  name="camera"
                  size={14}
                  color={"rgba(156, 163, 175, 0.6)"}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              height: 20,
              marginTop: 20,
            }}
          >
            <Text
              style={[
                styles.text,
                { fontSize: 18, color: themes.green, lineHeight: 20 },
              ]}
            >
              {userDataRedux.fullname ? userDataRedux.fullname : "Unkown user"}
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              paddingLeft: "5%",
              paddingRight: "5%",
              gap: 4,
              marginTop: 10,
            }}
          >
            <Text style={styles.text}>Họ & tên</Text>
            <View
              style={{
                height: 50,
                width: "100%",
                marginTop:10
              }}
            >
              {/* <TextInput
                onChangeText={(text) =>
                  setUserDataRedux((prevUserDataRedux) => ({
                    ...prevUserDataRedux,
                    fullname: text,
                  }))
                }
                value={userDataRedux.fullname}
                style={{ height: "100%", width: "100%" }}
                placeholder="Họ và tên"
            ></TextInput> */}

            <Input placeholder={'Họ và tên'} value={userDataRedux.fullname} leftIconName={'user'} isTrue={true} height={'100%'} width={'100%'} onChangeText={(text)=> setUserDataRedux((prevUserDataRedux) => ({
                    ...prevUserDataRedux,
                    fullname: text,
                  }))}/>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              paddingLeft: "5%",
              paddingRight: "5%",
              gap: 4,
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ width: "40%", gap: 4, position:'relative' }}>
              <Text style={[styles.text,{marginBottom:6}]}>Giới tính</Text>
              <TouchableOpacity
                onPress={()=>setModalPickGender(true)}
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
                <Text style={{marginLeft:10,fontSize:14,fontWeight:'500'}}>{tempGender === 'Male' ? 'Nam' : 'Nữ'}</Text>

                
              </TouchableOpacity>
              {
                modalPickGender === true && 
                  (
                    <TouchableOpacity onPress={handleGender} style={{height:40,width:'100%',flexDirection: "row",
                      alignItems: "center",position:'absolute',backgroundColor:"white",borderRadius:10,top:'104%',zIndex:2,backgroundColor:"white",}}>
                      <FontAwesome style={{marginLeft:'10%'}} name="intersex" size={16} color={themes.gray}/>
                      <Text style={{marginLeft:10,fontSize:14,fontWeight:'500'}}>{tempGender === 'Male' ? 'Nữ' : 'Nam'}</Text>
                  </TouchableOpacity>
                  )
              }
              
            </View>
            <View style={{ width: "50%", gap: 4 }}>
              <Text style={[styles.text,{marginBottom:6}]}>Ngày sinh</Text>
              <View
                style={{
                  height: 40,
                  width: "100%",
                  paddingLeft: "4%",
                  paddingRight: "4%",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  flexDirection: "row",
                  backgroundColor:'white',
                  borderRadius:10
                }}
              >
                <TouchableOpacity onPress={hanldeModalDatapicker}>
                    <AntDesign name={"calendar"} size={20} color={themes.green} />
                </TouchableOpacity>
                <Text style={{marginLeft:10,fontSize:14,fontWeight:"500"}}>{moment(userDataRedux.dateOfBirth).format("DD/MM/YYYY")}</Text>
                
              </View>
            </View>
          </View>

          <View
            style={{
              width: "100%",
              paddingLeft: "5%",
              paddingRight: "5%",
              gap: 4,
              marginTop: 10,
            }}
          >
            <Text style={[styles.text]}>Số điện thoại</Text>
            <View
              style={{
                height: 50,
                width: "100%",
                marginTop:10

              }}
            >
              {/* <TextInput
                onChangeText={(text) => setUserDataRedux((prevUserDataRedux) => ({ ...prevUserDataRedux, phoneNumber: text }))}
                value={userDataRedux.phoneNumber}
                style={{ height: "100%", width: "100%" }}
                placeholder="Số điện thoại"
              ></TextInput> */}
              <Input placeholder={'Số điện thoại'} value={userDataRedux.phoneNumber} leftIconName={'phone'} isTrue={true} height={'100%'} width={'100%'} onChangeText={(text)=> setUserDataRedux((prevUserDataRedux) => ({
                    ...prevUserDataRedux,
                    phoneNumber: text,
                  }))}/>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              paddingLeft: "5%",
              paddingRight: "5%",
              gap: 4,
              marginTop: 10,
            }}
          >
            <Text style={styles.text}>Email</Text>
            <View
              style={{

                height: 50,
                width: "100%",
                marginTop:10

              }}
            >
              {/* <TextInput
                onChangeText={(text) => setUserDataRedux((prevUserDataRedux) => ({ ...prevUserDataRedux, email: text }))}
                value={userDataRedux.email}
                style={{ height: "100%", width: "100%" }}
                placeholder="Email"
              ></TextInput> */}
              <Input placeholder={'Email'} value={userDataRedux.email} leftIconName={'at-sign'} isTrue={true} height={'100%'} width={'100%'} onChangeText={(text)=> setUserDataRedux((prevUserDataRedux) => ({
                    ...prevUserDataRedux,
                    email: text,
                  }))}/>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              paddingLeft: "5%",
              paddingRight: "5%",
              gap: 4,
              marginTop: 10,
              maxHeight: 72,
            }}
          >
            <Text style={styles.text}>Địa chỉ</Text>
            <View
              style={{
                // height:50,
                width: "100%",
                maxHeight: 200,
                marginTop:10
              }}
            >
              {/* <TextInput
                multiline
                onChangeText={(text) => setUserDataRedux((prevUserDataRedux) => ({ ...prevUserDataRedux, address: text }))}
                value={userDataRedux.address}
                style={{ width: "100%" }}
                placeholder="Địa chỉ"
              ></TextInput> */}
              <Input placeholder={'Địa chỉ'} value={userDataRedux.address} leftIconName={'navigation'} isTrue={true} height={'100%'} width={'100%'} onChangeText={(text)=> setUserDataRedux((prevUserDataRedux) => ({
                    ...prevUserDataRedux,
                    address: text,
                  }))}/>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              paddingLeft: "5%",
              paddingRight: "5%",
              gap: 4,
              marginTop: 30,
            }}
          >
            <Text style={[styles.text,{marginBottom:10}]}>Tải lên hồ sơ cá nhân</Text>
            <View
              style={{
                height: 60,
                width: "100%",
                paddingLeft: "1%",
                paddingRight: "5%",
                borderRadius:10
              }}
            >
              <TouchableOpacity onPress={pickPDFFile}>
                <Image
                  style={{
                    height: 60,
                    width: 60,
                    backgroundColor: themes.gray,
                    borderRadius:10
                  }}
                  resizeMode="contain"
                  source={require("../../assets/Icon/upload.png")}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              height: 200,
              width: "100%",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingTop: "10%",
            }}
          >
            <TouchableOpacity
              onPress={handleUpdateUser}
              style={{
                height: "30%",
                width: "90%",
                backgroundColor: themes.green,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500", color: "white" }}>
                Lưu thay đổi
              </Text>
            </TouchableOpacity>
          </View>

          {openModalDatePicker && (
            <DateTimePicker
              value={date}
              mode={"date"}
              display="calendar"
              onChange={onChangeDatePicker}
            />
          )}

          {
        userDataRedux.loading && 
        (<View style={styles.modal}>
          <Loading/>
         </View>)
      }
        </KeyboardAwareScrollView>
    </View>
  )
}

export default CustomerProfile

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:"100%",
        
    },
    text: {
      fontSize: 14,
      fontWeight: "500",
      color: themes.green,
    },
})